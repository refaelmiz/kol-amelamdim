import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useState, useContext } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Link as MUILink,
} from '@mui/material';
import validator from 'validator';
import { StyledPageContainer, FormError } from '@kol-amelamdim/styled';
import { i18n, useTranslation } from 'next-i18next';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import { AuthContext } from '../../context/auth-context-provider';
import axios from '../../api';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { setAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const { t } = useTranslation('login');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validator.isEmail(email)) {
      setLoading(true);
      try {
        const { data } = await axios.post('/api/login', { email, password });

        if (data.success) {
          setAuthenticated(true);
          await router.push('/');
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(error.response.data.message[i18n.language]);
      }
    } else {
      setLoading(false);
      setError(API_ERRORS.invalidEmailError.message[i18n.language]);
    }
  };
  //Todo: handle loading and errors
  return (
    <StyledPageContainer>
      <>
        <form onSubmit={handleSubmit}>
          <Grid container direction={'column'}>
            <Typography variant="h3" component="h2" sx={{ mt: 2 }}>
              {t('h1')}
            </Typography>
            <TextField
              sx={{ mt: 2 }}
              required
              id="outlined-required"
              label={t('email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
            />
            <TextField
              sx={{ mt: 2 }}
              value={password}
              label={t('password')}
              type="password"
              required
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              error={!!error}
            />
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              type="submit"
              disabled={!email || !password || loading}
            >
              {loading ? <>רק רגע..</> : t('submit')}
            </Button>
          </Grid>
        </form>
        <Grid container sx={{ mt: 2 }}>
          <Typography component="h4">
            {t('register-txt')}
            &nbsp;
          </Typography>
          <NextLink href="/register" passHref>
            <MUILink>{t('register-btn')}</MUILink>
          </NextLink>
        </Grid>
        {error && <FormError>{error}</FormError>}
      </>
    </StyledPageContainer>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['login', 'home'], i18nConfig)),
    },
    revalidate: 10
  };
}

export default Login;
