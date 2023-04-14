import {
  Button,
  Card,
  CardActionArea,
  Divider,
  Grid,
  styled,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';
import { Categories } from '@kol-amelamdim/types';
import {
  FormError,
  SectionTitle,
  StyledButtonXL,
  StyledPageContainer,
} from '@kol-amelamdim/styled';
import { UploadFileDialog } from '../components';
import { AlertLayout } from '../layouts';
import validator from 'validator';
import axios from '../api';
import { AlertContext } from '../context/alert-context-provider';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import i18nConfig from '../next-i18next.config';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import CourseRegisterDialog from '../components/course-register-dialog/CourseRegisterDialog';
import StyledTextField from '../components/text-field/StyledTextField';

const CategoryCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  align-items: center;
  cursor: pointer;
  color: black;
  font-family: ${(props) => props.theme.fonts.bold};
  min-width: 340px;
  text-align: center;
  background: white;
  padding: 2em;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  transition: transform 0.6s;
  border-radius: 20px;

  // @media ${MOBILE_QUERY} {
  //   min-width: auto;
  // }

  //
  //&:hover {
  //  transform: scale(1.03);
  //}
`;

const SyledCardActionArea = styled(CardActionArea)`
  border-radius: 20px;
`;

const Hero = styled('div')`
  height: 482px;
  width: 100%;
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('/images/bg-1.jpg');
  background-size: cover;
  color: white;
  position: relative;
  padding: 2em;
  text-align: center;
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

  const submitButtonStyles = { width: '100%' };

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
    <>
      {/* hero */}
      <Hero>
        <Typography variant="h1" component="h1">
          {t('h1')}
        </Typography>
        <Typography variant="h3" component="h2" sx={{ mt: 2 }}>
          {t('h2')}
        </Typography>
        <Grid
          container
          justifyContent={'center'}
          gap={3}
          mt={8}
          sx={{ position: 'absolute', bottom: '-20px' }}
        >
          <Grid item>
            <StyledButtonXL
              size="large"
              variant="contained"
              color="secondary"
              onClick={() => setIsUploadFileDialogOpen(true)}
            >
              {t('share-btn')}
            </StyledButtonXL>
          </Grid>
          <Grid item>
            <StyledButtonXL
              size="large"
              variant="contained"
              onClick={() => router.push('/#learn-categories')}
            >
              {t('download-btn')}
            </StyledButtonXL>
          </Grid>
        </Grid>
      </Hero>

      <StyledPageContainer>
        {/* הצעה להיות מלמד */}
        {/*<Grid item container xs={isMobile ? 12 : 6} sx={{mt: isMobile ? 8 : 0}}>*/}
        <Grid
          item
          container
          sx={{ maxWidth: '1600px', padding: isMobile ? '1em' : '3em' }}
        >
          <Grid container spacing={6} direction={'row-reverse'}>
            {/*תמונה*/}
            <Grid
              item
              xs={12}
              lg={6}
              style={{
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
              }}
              onClick={() => setCourseDialogOpen(true)}
            >
              <Image
                src="/images/course.webp"
                alt="course"
                width={777}
                height={398}
                objectFit={'contain'}
              />
            </Grid>
            {/*טקסטים*/}
            <Grid item xs={12} lg={6} sx={{ textAlign: 'center' }}>
              <Typography variant="h2">קיבלת הצעה להיות מלמד?</Typography>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <Typography variant="body2">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                חושב שבקו"ח שלך אינך מצליח לתת דגשים על ההישגים שלך?
              </Typography>
              <Typography variant="body1" sx={{ mt: 4 }}>
                קבל עכשיו במתנה את המדריך:
              </Typography>
              <Typography variant="h3">בידול עוצמתי בעולם ההוראה</Typography>

              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <Typography variant="body1">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                מדריך עם שיטה מוכחת לכתיבת קו"ח שמושכת את העין ומבליטה את
                הכישורים שלך במיוחד בעולם ההוראה והחינוך...
              </Typography>
              <StyledButtonXL
                variant="contained"
                color="secondary"
                onClick={() => setCourseDialogOpen(true)}
                sx={{ mt: 5 }}
              >
                לקבלת המדריך במייל לחץ כאן
              </StyledButtonXL>
            </Grid>
          </Grid>
        </Grid>

        {/* באנר הנאה לפעולה */}
        {activeArticle?.title && activeArticle?.description && (
          <>
            <Grid
              container
              direction="row"
              alignItems={'center'}
              justifyContent={'center'}
              sx={{
                background: 'url(/images/bg-wall.webp)',
                height: { md: '300px' },
                gap: { md: '3em', xs: '1em' },
                color: 'white',
                paddingTop: { xs: '3em' },
                paddingBottom: { xs: '3em' },
              }}
            >
              <Grid item>
                <Typography variant="h3" component="h3" align="center">
                  מלמדים ואנשי חינוך יקרים
                  {activeArticle.title}
                </Typography>
                <Typography align="center">
                  הסבר קצרצר על דרכי השימוש במערכת
                  {activeArticle.description}
                </Typography>
              </Grid>
              <StyledButtonXL
                variant="contained"
                color="secondary"
                onClick={() => router.push('/weekly-article')}
              >
                {t('continue-reading-button')}
              </StyledButtonXL>
            </Grid>
          </>
        )}

        {/* חומרים להורדה */}
        <Grid
          item
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '1200px',
          }}
        >
          <SectionTitle variant="h2">חומרים להורדה</SectionTitle>
          <Grid
            container
            item
            alignItems="center"
            justifyContent="center"
            sx={{ gap: '40px' }}
          >
            {Categories.map((category) => (
              <Grid container key={category.URL} xs={'auto'}>
                <SyledCardActionArea
                  onClick={() => router.push(`/category/${category.URL}`)}
                >
                  <CategoryCard>
                    <Image
                      src={category.icon}
                      alt="logo"
                      width={190}
                      height={80}
                    />
                    <Typography variant={'h3'} sx={{ fontSize: '2em' }}>
                      {category[i18n.language]}
                    </Typography>
                  </CategoryCard>
                </SyledCardActionArea>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* רכיב יצירת קשר */}
        <Grid
          container
          style={{
            backgroundImage: 'url("/images/form-bg.webp")',
            backgroundSize: 'cover',
            color: 'white',
            textAlign: 'center',
            padding: isMobile ? '4em 2em' : '6em 4em',
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h3" component="h3">
                {t('keep-in-touch-heading')}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>{t('send-us-a-message')}</Typography>
            </Grid>

            <form
              onSubmit={handleSendCustomerQuestion}
              style={{ maxWidth: '500px', width: '100%' }}
            >
              <Grid
                item
                container
                sx={{ mt: 2 }}
                spacing={2}
                direction="column"
              >
                <Grid item xs={12}>
                  <StyledTextField
                    placeholder={t('email-input-label')}
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
                  <StyledTextField
                    placeholder={t('what-do-you-want-to-ask')}
                    rows="4"
                    multiline
                    error={!!formError}
                    value={customerQuestion}
                    onChange={(e) => setCustomerQuestion(e.target.value)}
                    InputProps={{
                      style: {
                        borderRadius: '10px',
                        background: 'white',
                      },
                    }}
                  />
                </Grid>
                <Grid item>
                  <StyledButtonXL
                    variant="contained"
                    color="secondary"
                    sx={submitButtonStyles}
                    type="submit"
                  >
                    {t('send-form-button-text')}
                  </StyledButtonXL>
                </Grid>
              </Grid>
              {formError && <FormError>{formError}</FormError>}
            </form>
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
    </>
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
