import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useContext, useState } from 'react';
import { Grid, Link as MUILink, Typography } from '@mui/material';
import validator from 'validator';
import {
  FormError,
  StyledButtonXL,
  StyledPageContainer,
} from '@kol-amelamdim/styled';
import { i18n, useTranslation } from 'next-i18next';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import { AuthContext } from '../../context/auth-context-provider';
import axios from '../../api';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';

import StyledTextField from '../../components/text-field/StyledTextField';

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
      <Grid
        container
        direction={'column'}
        justifyContent={'center'}
        xs={10}
        md={6}
      >
        <Grid item>
          <form onSubmit={handleSubmit}>
            <Grid container direction={'column'}>
              <Typography
                variant="h3"
                component="h1"
                sx={{ mt: 2, mb: 8 }}
                textAlign={'center'}
              >
                {t('h1')}
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <StyledTextField
                    required
                    id="outlined-required"
                    label={t('email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!error}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    value={password}
                    label={t('password')}
                    type="password"
                    required
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!error}
                  />
                </Grid>
              </Grid>
              <StyledButtonXL
                sx={{ mt: 2 }}
                variant="contained"
                color={'secondary'}
                type="submit"
                disabled={!email || !password || loading}
              >
                {loading ? <>רק רגע..</> : t('submit')}
              </StyledButtonXL>
            </Grid>
          </form>
        </Grid>
        <Grid
          item
          container
          direction={'row'}
          justifyContent={'center'}
          sx={{ mt: 8 }}
        >
          <Typography>
            {t('register-txt')}
            &nbsp;
          </Typography>
          <NextLink href="/register" passHref>
            <MUILink>{t('register-btn')}</MUILink>
          </NextLink>
        </Grid>
        {error && <FormError>{error}</FormError>}
      </Grid>
    </StyledPageContainer>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['login', 'home'], i18nConfig)),
    },
  };
}

export default Login;
