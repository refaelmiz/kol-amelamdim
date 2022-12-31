import { ReactElement, useContext, useState, useEffect } from 'react';
import axios from '../../../../api';
import { useRouter } from 'next/router';
import {
  Button,
  Divider,
  Grid,
  Typography,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { StyledPageContainer } from '@kol-amelamdim/styled';
import { AlertContext } from '../../../../context/alert-context-provider';
import { AlertLayout } from '../../../../layouts';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../../../next-i18next.config';
import { i18n, useTranslation } from 'next-i18next';

const getAllWeeklyArticles = async () => {
  return await axios.get('/api/admin/get-weekly-articles');
};

const ListOfWeeklyArticles = () => {
  const [articles, setArticles] = useState([]);
  const { setAlertMessage, setAlertType } = useContext(AlertContext);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const router = useRouter();
  const { t } = useTranslation('list-of-weekly-article');

  useEffect(() => {
    (async () => {
      const weeklyArticles = await getAllWeeklyArticles();
      setArticles(weeklyArticles.data);
    })();
  }, []);

  const toggleActiveWeeklyArticle = async (id: string) => {
    try {
      await axios.post('/api/admin/toggle-active-weekly-article', { id });
      const { data } = await getAllWeeklyArticles();
      if (data.length) {
        setArticles(data);
      }
    } catch (e) {
      setAlertType('warning');
      setAlertMessage(e.response.data.message[i18n.language]);
    }
  };

  const deleteWeeklyArticle = async (id: string) => {
    try {
      await axios.post('/api/admin/delete-weekly-article', { id });
      const { data } = await getAllWeeklyArticles();
      setArticles(data);
    } catch (e) {
      if (e.response) {
        setAlertType('warning');
        setAlertMessage(e.response.data.message[i18n.language]);
      }
    }
  };

  if (!articles?.length)
    return (
      <StyledPageContainer>
        <Typography variant="h1">{t('no-results')}</Typography>
      </StyledPageContainer>
    );

  return (
    <StyledPageContainer>
      <Button onClick={() => router.push('/admin/dashboard')} sx={{ mb: 2 }}>
        {t('back')}
      </Button>
      {articles.map(({ _id, title, isActiveArticle }) => {
        return (
          <div key={_id}>
            <Grid
              container
              alignItems="center"
              spacing={isMobile ? 0 : 1}
              sx={{ m: 2 }}
            >
              <Grid item xs={3}>
                <Typography>{title}</Typography>
              </Grid>

              <Grid item xs={9} container justifyContent="flex-end">
                <Button
                  variant="contained"
                  disabled={isActiveArticle}
                  onClick={() => toggleActiveWeeklyArticle(_id)}
                >
                  {t('activate')}
                </Button>
                <Button
                  variant="outlined"
                  sx={{ ml: 2 }}
                  onClick={() =>
                    router.push(`/admin/dashboard/add-weekly-article?id=${_id}`)
                  }
                >
                  {t('edit')}
                </Button>
                <IconButton
                  sx={{ ml: 2, pr: 4 }}
                  onClick={() => deleteWeeklyArticle(_id)}
                >
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>

            <Divider />
          </div>
        );
      })}
    </StyledPageContainer>
  );
};

export async function getStaticProps({ locale }) {
  try {
    return {
      props: {
        ...(await serverSideTranslations(
          locale,
          ['list-of-weekly-article', 'home'],
          i18nConfig
        )),
      },
    };
  } catch (e) {
    return {
      props: {
        ...(await serverSideTranslations(
          locale,
          ['list-of-weekly-article'],
          i18nConfig
        )),
      },
    };
  }
}

ListOfWeeklyArticles.getLayout = function getLayout(page: ReactElement) {
  return <AlertLayout>{page}</AlertLayout>;
};

export default ListOfWeeklyArticles;
