import { useContext, useEffect, useState } from 'react';
import { AppBar, Grid, styled, useMediaQuery } from '@mui/material';
import { i18n, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { MOBILE_QUERY, TABLET_QUERY } from '@kol-amelamdim/constants';
import axios from '../../api';
import { AuthContext } from '../../context/auth-context-provider';
import { AlertContext } from '../../context/alert-context-provider';
import { AlertLayout } from '../../layouts';
import { RegisterNow } from '../../components';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import { StyledButton, StyledLangButton } from '@kol-amelamdim/styled';
import MobileMenu from '../mobile-menu/MobileMenu';
import ContactUsButtons from '../contact-us-buttons/ContactUsButtons';

const StyledNavbar = styled(AppBar)`
  background: ${(props) => props.theme.palette.primary.light};
  height: 90px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 0 60px;

  @media ${TABLET_QUERY} {
    padding: 0 10px;
  }

  color: ${(props) => props.theme.palette.primary.main};
  font-weight: ${(props) => props.theme.fonts.bold};
`;

export const Actions = styled(Grid)`
  @media ${MOBILE_QUERY} {
    flex-wrap: wrap-reverse;
  }
`;

let isOpenedOnce = false;

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const { t } = useTranslation('home');
  const isTablet = useMediaQuery(TABLET_QUERY);

  const { isAuthenticated, setAuthenticated, checkAuthentication } =
    useContext(AuthContext);
  const { setAlertMessage, setAlertType } = useContext(AlertContext);

  const toggleLanguage = async (e) => {
    console.log(e.target);
    const currentLanguage = i18n?.language || 'he';
    const newLanguage = currentLanguage === 'he' ? 'en' : 'he';
    await router.push({ pathname, query }, asPath, {
      locale: newLanguage,
    });
    router.reload();
  };

  useEffect(() => {
    checkAuthentication()
      .then((data) => {
        if (data.success) {
          setAuthenticated(true);
        } else {
          if (
            !isOpenedOnce &&
            !pathname.includes('register') &&
            !pathname.includes('login')
          ) {
            isOpenedOnce = true;
            setTimeout(() => {
              setOpen(true);
            }, 5000);
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          setAlertMessage(error.response.data.message[i18n.language]);
        }
        setAlertType('warning');
      });
  }, []);

  const logOut = async () => {
    try {
      await axios.post('/api/logout');
      setAuthenticated(false);
      router.push('/');
    } catch (error) {
      setAlertType('warning');
      setAlertMessage(error.response.data.message[i18n.language]);
    }
  };

  return (
    <StyledNavbar>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {/*desktop*/}
        <Grid
          container
          item
          xs={'auto'}
          spacing={2}
          sx={{ display: { xs: 'none', lg: 'flex' } }}
        >
          <Actions item xs={'auto'}>
            {isAuthenticated ? (
              <Grid item>
                <StyledLangButton variant="outlined" onClick={logOut}>
                  {t('logout-btn')}
                </StyledLangButton>
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <Grid item>
                  <StyledButton
                    variant="contained"
                    color="primary"
                    startIcon={<PersonIcon />}
                    onClick={() => router.push('/login')}
                  >
                    {t('login-btn')}
                  </StyledButton>
                </Grid>
                <Grid item>
                  <StyledButton
                    variant="contained"
                    color="secondary"
                    startIcon={<EditIcon />}
                    onClick={() => router.push('/register')}
                  >
                    {t('register-btn')}
                  </StyledButton>
                </Grid>
              </Grid>
            )}
          </Actions>
          <Grid item>
            <StyledLangButton
              variant="outlined"
              data-language={i18n?.language || 'he'}
              onClick={toggleLanguage}
            >
              {i18n?.language === 'he' ? 'English' : 'עברית'}
              {i18n?.language === 'he' ? (
                <img src="/images/flags/GB.svg" width="20" alt="English flag" />
              ) : (
                <img src="/images/flags/IL.svg" width="20" alt="Hebrew flag" />
              )}
            </StyledLangButton>
          </Grid>
        </Grid>

        {/*mobile*/}
        <Grid item xs={'auto'} sx={{ display: { lg: 'none', xs: 'flex' } }}>
          <MobileMenu
            isAuthenticated={isAuthenticated}
            logOut={logOut}
            router={router}
            toggleLanguage={toggleLanguage}
          />
        </Grid>

        <Grid
          onClick={() => router.push('/')}
          role={'button'}
          tabIndex={0}
          sx={{
            position: 'absolute',
            right: '50%',
            transform: 'translateX(50%)',
            cursor: 'pointer',
          }}
        >
          <img
            src="/images/logo-v3.svg"
            alt="logo"
            style={{ width: isTablet ? '100px' : '140px' }}
          />
        </Grid>
        <ContactUsButtons />
      </Grid>
      <RegisterNow open={open} onClose={() => setOpen(false)} />
    </StyledNavbar>
  );
};
Navbar.getLayout = function getLayout(page: React.ReactElement) {
  return <AlertLayout>{page}</AlertLayout>;
};
