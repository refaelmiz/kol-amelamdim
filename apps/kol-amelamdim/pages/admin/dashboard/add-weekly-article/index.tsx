import { useState, useEffect, ReactElement, useContext } from 'react';
import ReactDOM from 'react-dom';
import { styled, Button, Grid, TextField, Typography } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
});
import { FormError, StyledPageContainer } from '@kol-amelamdim/styled';
import { useRouter } from 'next/router';
import axios from '../../../../api';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import { AlertLayout } from '../../../../layouts';
import { AlertContext } from '../../../../context/alert-context-provider';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../../../next-i18next.config';
import { i18n, useTranslation } from 'next-i18next';

const ContentEditor = styled(QuillNoSSRWrapper)`
  & .ql-editor {
    font-family: ${(props) => props.theme.fonts.regular};
    h1 {
      font-size: 50px;
    }

    h2 {
      font-size: 45px;
    }

    ul,
    li,
    p {
      text-align: left;
      font-size: 25px;
    }
  }

  & .ql-container {
    height: 445px;
  }
`;

export const StyledGrid = styled(Grid)`
  & .MuiTextField-root {
    width: 100%;
  }
`;

const getWeeklyArticleById = async (id: string) => {
  const article = await axios.get(`/api/admin/get-article-by-id?id=${id}`);
  if (article.data) {
    return article.data;
  }
};

const AddWeeklyArticle = ({ id }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [weeklyArticleContent, setWeeklyArticleContent] = useState('');
  const [error, setError] = useState('');
  const { setAlertMessage, setAlertType } = useContext(AlertContext);

  const router = useRouter();
  const { t } = useTranslation('add-weekly-article');

  const addWeeklyArticle = async () => {
    try {
      await axios.post('/api/admin/add-weekly-article', {
        title,
        description,
        content: weeklyArticleContent,
      });

      setError('');
      await router.push('/admin/dashboard/list-of-weekly-articles');
    } catch (e) {
      setError(API_ERRORS.addWeeklyArticleError.message[i18n.language]);
    }
  };

  const updateWeeklyArticle = async (id: string) => {
    try {
      await axios.post('/api/admin/update-weekly-article', {
        id,
        title,
        description,
        content: weeklyArticleContent,
      });

      setError('');
      await router.push('/admin/dashboard/list-of-weekly-articles');
    } catch (e) {
      setError(API_ERRORS.addWeeklyArticleError.message[i18n.language]);
    }
  };

  const submitHandler = async () => {
    if (id) {
      await updateWeeklyArticle(id as string);
    } else {
      await addWeeklyArticle();
    }
  };

  useEffect(() => {
    if (id) {
      getWeeklyArticleById(id as string)
        .then((response) => {
          ReactDOM.unstable_batchedUpdates(() => {
            setTitle(response.title);
            setDescription(response.description);
            setWeeklyArticleContent(response.content);
          });
        })
        .catch((e) => {
          setAlertType('warning');
          setAlertMessage(e.response.data.message[i18n.language]);
        });
    }
  }, [id, setAlertMessage, setAlertType]);

  return (
    <StyledPageContainer>
      <Button onClick={() => router.push('/admin/dashboard')} sx={{ mb: 2 }}>
        {t('back')}
      </Button>

      <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
        {!id ? t('add-text') : t('edit-text')}
      </Typography>
      <StyledGrid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <TextField
            label={t('article-header')}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t('article-description')}
            value={description}
            multiline
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
      </StyledGrid>

      <ContentEditor
        value={weeklyArticleContent}
        onChange={setWeeklyArticleContent}
        modules={editorModules}
      />
      <Grid
        container
        justifyContent="flex-end"
        direction="column"
        sx={{ pb: '100px' }}
      >
        <Grid item>
          <Button variant="contained" sx={{ mt: 2 }} onClick={submitHandler}>
            {id ? t('edit-text') : t('add-text')}
          </Button>
        </Grid>
        <Grid item>{error && <FormError>{error}</FormError>}</Grid>
      </Grid>
    </StyledPageContainer>
  );
};

const editorModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    [{ direction: 'rtl' }],
  ],
};

AddWeeklyArticle.getLayout = function getLayout(page: ReactElement) {
  return <AlertLayout>{page}</AlertLayout>;
};

export async function getServerSideProps(context) {
  const id = context.query.id;
  if (id) {
    return {
      props: {
        id,
        ...(await serverSideTranslations(
          context.locale,
          ['add-weekly-article'],
          i18nConfig
        )),
      },
    };
  }

  return {
    props: {
      id: null,
      ...(await serverSideTranslations(
        context.locale,
        ['add-weekly-article', 'home'],
        i18nConfig
      )),
    },
  };
}

export default AddWeeklyArticle;
