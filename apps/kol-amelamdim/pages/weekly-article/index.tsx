import { useEffect, useState } from 'react';
import { StyledPageContainer } from '@kol-amelamdim/styled';
import { Typography, styled } from '@mui/material';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';
import { useTranslation } from 'next-i18next';
import { WeeklyArticle } from '@kol-amelamdim/models';
import connect from '../../db/connectMongo';
import axios from 'axios';

const WeeklyArticleContainer = styled(StyledPageContainer)`
  padding: 125px 0 70px;
  h1,
  p {
    margin: 0;
  }

  @media ${MOBILE_QUERY} {
    padding: 125px 10px 70px;
  }
`;

const getActiveWeeklyArticle = async () => {
  return await axios.get('/api/get-active-weekly-article');
};

const Index = () => {
  const [activeArticle, setActiveArticle] = useState<any>({});
  const [isLoading, setLoading] = useState(true);
  const { t } = useTranslation('weekly-article');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const activeArticle = await getActiveWeeklyArticle();
      setActiveArticle(activeArticle.data);
      setLoading(false);
    })();
  }, []);

  if (isLoading && !activeArticle?.title) {
    return (
      <WeeklyArticleContainer>
        <Typography variant="h2" align="center">
          מאמר בטעינה
        </Typography>
      </WeeklyArticleContainer>
    );
  } else if (activeArticle?.content && activeArticle?.title && !isLoading) {
    return (
      <WeeklyArticleContainer>
        <Typography variant="h1" component="h1">
          {activeArticle.title}
        </Typography>
        <Typography variant="h2" component="h2" sx={{ mb: 3 }}>
          {activeArticle.description}
        </Typography>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: activeArticle.content }}
        ></div>
      </WeeklyArticleContainer>
    );
  } else if (!isLoading && !activeArticle?.title) {
    return (
      <WeeklyArticleContainer>
        <Typography variant="h2" align="center">
          {t('no-article-h2')}
        </Typography>
        <Typography variant="h3" align="center">
          {t('no-article-h3')}
        </Typography>
      </WeeklyArticleContainer>
    );
  }
};

export async function getStaticProps({ locale }) {
  try {
    return {
      props: {
        ...(await serverSideTranslations(
          locale,
          ['weekly-article', 'home'],
          i18nConfig
        )),
      },
    };
  } catch (e) {
    return {
      props: {
        ...(await serverSideTranslations(
          locale,
          ['weekly-article', 'home'],
          i18nConfig
        )),
      },
    };
  }
}

export default Index;
