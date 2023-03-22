import {
  styled,
  Typography,
  Button,
  Grid,
  Divider,
  Card,
  TextField,
  useMediaQuery, Box,
} from '@mui/material';
import { useState, ReactElement, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';
import { Categories } from '@kol-amelamdim/types';
import { StyledPageContainer, FormError } from '@kol-amelamdim/styled';
import { UploadFileDialog } from '../components';
import { AlertLayout } from '../layouts';
import validator from 'validator';
import axios from '../api';
import { AlertContext } from '../context/alert-context-provider';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import i18nConfig from '../next-i18next.config';
import { useTranslation } from 'next-i18next';
import Image from "next/image";
import CourseRegisterDialog from "../components/course-register-dialog/CourseRegisterDialog";

const CategoryCard = styled(Card)`
  height: 90px;
  text-align: center;
  min-width: 200px;

  @media ${MOBILE_QUERY} {
    min-width: auto;
  }

  padding: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: ${(props) => props.theme.fonts.bold};
  color: ${(props) => props.theme.palette.primary.light};
  background: ${(props) => props.theme.palette.primary.main};
  background: -webkit-linear-gradient(
    to right,
    ${(props) => props.theme.palette.secondary.main},
    ${(props) => props.theme.palette.primary.main}
  );
  background: linear-gradient(
    to right,
    ${(props) => props.theme.palette.secondary.main},
    ${(props) => props.theme.palette.primary.main}
  );
  transition: transform 0.6s;
  &:hover {
    transform: scale(1.03);
  }
`;

const getActiveWeeklyArticle = async () => {
  return await axios.get('/api/get-active-weekly-article');
};

export function Home() {
  const [customerEmail, setCustomerEmail] = useState('');
  const [activeArticle, setActiveArticle] = useState<any>({});
  const [customerQuestion, setCustomerQuestion] = useState('');
  const [isCourseDialogOpen, setCourseDialogOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [isUploadFileDialogOpen, setIsUploadFileDialogOpen] = useState(false);
  const { setAlertMessage, setAlertType } = useContext(AlertContext);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const router = useRouter();
  const translation = useTranslation('home');
  const { t, i18n } = translation;


  const submitButtonStyles = { ml: isMobile ? 0 : 2, mt: isMobile ? 2 : 0 };

  useEffect(() => {
    (async () => {
      const activeArticle = await getActiveWeeklyArticle();
      setActiveArticle(activeArticle.data);
    })();
  }, []);

  const handleSendCustomerQuestion = async (e) => {
    e.preventDefault();
    if (!customerQuestion || !customerEmail) {
      return setFormError('נא לוודא שכל השדות מלאים');
    } else if (!validator.isEmail(customerEmail)) {
      return setFormError('כתובת אימייל לא חוקית');
    }

    try {
      await axios.post('/api/contact-us', {
        customerEmail,
        customerQuestion,
        from: 'kol-amelamdim-website',
      });
      setFormError('');
      setCustomerEmail('');
      setCustomerQuestion('');
      setAlertType('success');
      setAlertMessage('הטופס נקלט בהצלחה.');
    } catch (error) {
      if (error.response.data) {
        setFormError(error.response.data.message[i18n.language]);
      }
    }
  };

  return (
    <StyledPageContainer>
      <Typography variant="h1" component="h1">
        {t('h1')}
      </Typography>
      <Typography variant="h3" component="h2" sx={{ mt: 2 }}>
        {t('h2')}
      </Typography>
      <Grid container sx={{ mt: 3 }}>
        <Grid item sx={{ mr: '10px' }}>
          <Button
            size="large"
            variant="contained"
            onClick={() => setIsUploadFileDialogOpen(true)}
          >
            {t('share-btn')}
          </Button>
        </Grid>
        <Grid item>
          <Button
            size="large"
            variant="outlined"
            onClick={() => router.push('/#learn-categories')}
          >
            {t('download-btn')}
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ pt: 7, mb: 7 }} id="learn-categories" />

      <Grid>
        <Grid container sx={{ mt: 2 }}>
          {Categories.map((category) => (
            <Grid key={category.URL} item xs={6}>
              <CategoryCard
                onClick={() => router.push(`/category/${category.URL}`)}
              >
                {category[i18n.language]}
              </CategoryCard>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Divider sx={{ pt: 7, mb: 7 }} />

      {activeArticle?.title && activeArticle?.description && (
        <>
          <Grid container direction="column">
            <Typography variant="h3" component="h3">
              {activeArticle.title}
            </Typography>
            <Typography>{activeArticle.description}</Typography>
            <Button
              variant="text"
              sx={{
                padding: 0,
                justifyContent: 'flex-start',
                mt: 0,
              }}
              onClick={() => router.push('/weekly-article')}
            >
              {t('continue-reading-button')}
            </Button>
          </Grid>
          <Divider sx={{ pt: 7, mb: 7 }} />
        </>
      )}

      <Grid container sx={{ mb: 10 }}>
        <Grid item container direction="column" xs={isMobile ? 12 : 6}>
          <Grid item>
            <Typography variant="h3" component="h3">
              {t('keep-in-touch-heading')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>{t('send-us-a-message')}</Typography>
          </Grid>

          <form onSubmit={handleSendCustomerQuestion}>
            <Grid item container sx={{ mt: 2 }} spacing={2} direction="column">
              <Grid item xs={12}>
                <TextField
                  sx={{ width: isMobile ? '100%' : '450px' }}
                  label={t('email-input-label')}
                  value={customerEmail}
                  error={!!formError}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                container
                direction={isMobile ? 'column' : 'row'}
                alignItems={isMobile ? 'flex-start' : 'flex-end'}
              >
                <TextField
                  sx={{ width: isMobile ? '100%' : '450px' }}
                  label={t('what-do-you-want-to-ask')}
                  rows="4"
                  multiline
                  error={!!formError}
                  value={customerQuestion}
                  onChange={(e) => setCustomerQuestion(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={submitButtonStyles}
                  size="large"
                  type="submit"
                >
                  {t('send-form-button-text')}
                </Button>
              </Grid>
            </Grid>
            {formError && <FormError>{formError}</FormError>}
          </form>
        </Grid>

        <Grid item container xs={isMobile ? 12 : 6} sx={{mt: isMobile ? 8 : 0}}>
          <Grid item>
            <Box style={{cursor: "pointer"}} onClick={() => setCourseDialogOpen(true)}>
              <Image
                src="/images/course.jpeg"
                alt="course"
                width={1000}
                height={500}
              />
            </Box>
            <Typography variant="h2">קיבלת הצעה להיות מלמד?</Typography>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <Typography variant="subtitle1">חושב שבקו"ח שלך אינך מצליח לתת דגשים על ההישגים שלך?</Typography>
            <Typography variant="body1" sx={{mt: 4}}>קבל עכשיו במתנה את המדריך:</Typography>
            <Typography variant="subtitle1">בידול עוצמתי בעולם ההוראה</Typography>

            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <Typography variant="body1">מדריך עם שיטה מוכחת לכתיבת קו"ח שמושכת את העין ומבליטה את הכישורים שלך במיוחד בעולם ההוראה והחינוך...</Typography>
            <Button variant="text" sx={{p: 0, mt: 2}} onClick={() => setCourseDialogOpen(true)}>לקבלת המדריך במייל לחץ כאן</Button>
          </Grid>
        </Grid>
      </Grid>


      <CourseRegisterDialog
        open={isCourseDialogOpen}
        onClose={() => setCourseDialogOpen(false)}
      />

      <UploadFileDialog
        isOpen={isUploadFileDialogOpen}
        onClose={() => setIsUploadFileDialogOpen(false)}
      />
    </StyledPageContainer>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  try {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['home'], i18nConfig)),
      },
    };
  } catch (e) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['home'], i18nConfig)),
      },
    };
  }
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <AlertLayout>{page}</AlertLayout>;
};

export default Home;
