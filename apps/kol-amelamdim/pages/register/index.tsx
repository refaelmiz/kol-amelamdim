import { useState } from 'react';
import NextLink from 'next/link';
import { FormControlLabel, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import validator from 'validator';
import {
  FormError,
  StyledButtonXL,
  StyledCheckbox,
  StyledMUILink,
  StyledPageContainer,
} from '@kol-amelamdim/styled';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import axios from '../../api';
import { Alert } from '../../components';
import { i18n, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';
import TermsDialog from '../../components/terms-dialog/TermsDialog';
import StyledTextField from '../../components/text-field/StyledTextField';

const phoneNumberPattern =
  /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/;

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [termsDialogOpen, setTermsDialogOpen] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const { t } = useTranslation('register');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validator.isEmail(email)) {
      if (phoneNumberPattern.test(phoneNumber)) {
        try {
          setLoading(true);
          const { data } = await axios.post('/api/register', {
            fullName,
            email,
            password,
            phoneNumber,
            acceptedTerms,
          });
          if (data.success) {
            setIsRegistered(true);
            setTimeout(() => {
              router.push('/');
              setLoading(false);
            }, 1500);
            await axios.post(
              'https://courses.kol-amelamdim.co.il/wp-json/uap/v2/uap-30216-30221',
              {
                fullName,
                email,
                phoneNumber,
              }
            );
          }
        } catch (error) {
          setLoading(false);
          setError(error.response.data.message[i18n.language]);
        }
      } else {
        setLoading(false);
        setError(API_ERRORS.invalidPhoneError.message[i18n.language]);
      }
    } else {
      setLoading(false);
      setError(API_ERRORS.invalidEmailError.message[i18n.language]);
    }
  };

  return (
    <StyledPageContainer
      sx={{
        backgroundImage: 'url("/images/full-page-bg.jpg")',
        backgroundSize: 'cover',
        repeat: 'none',
        color: 'white',
      }}
    >
      <Grid
        container
        item
        direction={'column'}
        justifyContent={'center'}
        xs={10}
        md={6}
        lg={4}
        pb={8}
      >
        <Grid item>
          <form onSubmit={handleSubmit}>
            <Grid container direction={'column'}>
              <Typography
                variant="h3"
                component="h2"
                sx={{ mt: 2 }}
                textAlign={'center'}
              >
                {t('h1')}
              </Typography>

              <Typography variant={'body1'} textAlign={'center'} sx={{ mb: 8 }}>
                {t('description')}
              </Typography>

              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <StyledTextField
                    sx={{ mt: 2 }}
                    required
                    id="outlined-required"
                    placeholder={t('fullName')}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    error={!!error}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    sx={{ mt: 2 }}
                    required
                    id="outlined-required"
                    placeholder={t('phone-number')}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    error={!!error}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    sx={{ mt: 2 }}
                    required
                    id="outlined-required"
                    placeholder={t('email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!error}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    sx={{ mt: 2 }}
                    value={password}
                    placeholder={t('password')}
                    type="password"
                    required
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!error}
                  />
                </Grid>
                <Grid
                  container
                  item
                  alignItems="center"
                  justifyContent="center"
                >
                  <FormControlLabel
                    control={
                      <StyledCheckbox
                        required
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        name="acceptTerms"
                      />
                    }
                    label={t('approve-terms')}
                  />
                  <StyledMUILink
                    sx={{ cursor: 'pointer' }}
                    role={'button'}
                    tabIndex={0}
                    onClick={() => setTermsDialogOpen(true)}
                  >
                    {t('approve-terms-link')}
                  </StyledMUILink>
                </Grid>
              </Grid>
              <StyledButtonXL
                sx={{ mt: 4 }}
                variant="contained"
                color={'secondary'}
                type="submit"
                disabled={!email || !password || loading || !acceptedTerms}
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
          <Typography>{t('login-txt')}&nbsp;</Typography>
          <NextLink href="/login" passHref>
            <StyledMUILink>{t('login-btn')}</StyledMUILink>
          </NextLink>
        </Grid>
        {error && <FormError>{error}</FormError>}
      </Grid>
      <TermsDialog
        isOpen={termsDialogOpen}
        onClose={() => setTermsDialogOpen(false)}
      />

      <Alert
        open={isRegistered}
        severity="success"
        onClose={() => setIsRegistered(false)}
      >
        נרשמת בהצלחה
      </Alert>
    </StyledPageContainer>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['register', 'home'],
        i18nConfig
      )),
    },
  };
}

export default Register;
