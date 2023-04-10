import { useContext, useEffect, useState } from 'react';
import { AppBar, Box, Button, Grid, IconButton, styled } from '@mui/material';
import Image from 'next/image';
import { i18n, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';
import axios from '../../api';
import { AuthContext } from '../../context/auth-context-provider';
import { AlertContext } from '../../context/alert-context-provider';
import { AlertLayout } from '../../layouts';
import { RegisterNow } from '../../components';
import IconEmail from '../../assets/icons/email';
import IconWhatsapp from '../../assets/icons/whatsapp';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import { StyledButton } from '@kol-amelamdim/styled';
const StyledNavbar = styled(AppBar)`
  background: ${(props) => props.theme.palette.primary.light};
  height: 90px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 0 60px;

  @media ${MOBILE_QUERY} {
    padding: 0 10px;
  }

  color: ${(props) => props.theme.palette.primary.main};
  font-weight: ${(props) => props.theme.fonts.bold};
`;

// const StyledCountryDropDown = styled(Select)`
//   & .MuiSelect-select.MuiSelect-outlined {
//     padding: 4px 50px 4px 20px;
//     color: #356559;
//     border-radius: 30px;
//     border: 2px solid green;
//     display: flex;
//   },
//
//   &.MuiInputBase-root{
//      border-radius: 30px !important;
//   }
//
//   &input{
//     display: none;
//   }
// `;

const Actions = styled(Grid)`
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

  // const handleLanguageChange = async (event: SelectChangeEvent) => {
  //   await router.push({pathname, query}, asPath, {
  //     locale: event.target.value,
  //   });
  //   router.reload();
  // };

  /* const handleLanguageChange = async (event: SelectChangeEvent) => {
     const currentLanguage = event.currentTarget.dataset.language || 'he'; // Получаем текущий язык приложения
     const newLanguage = currentLanguage === 'he' ? 'en' : 'he'; // Определяем язык, на который нужно переключиться
     i18n?.changeLanguage(newLanguage); // Меняем язык приложения
     router.reload(); // Перезагружаем страницу
   }*/

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
            }, 30000);
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
        <Grid container item xs={'auto'} spacing={2}>
          <Actions item xs={'auto'}>
            {isAuthenticated ? (
              <StyledButton variant="text" onClick={logOut}>
                {t('logout-btn')}
              </StyledButton>
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
            <Button
              variant="text"
              data-language={i18n?.language || 'he'}
              onClick={toggleLanguage}
            >
              {i18n?.language === 'he' ? 'English' : 'עברית'}
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={'auto'}>
          <Image
            src="/images/logo-v3.svg"
            alt="logo"
            width={190}
            height={80}
            onClick={() => router.push('/')}
          />
        </Grid>

        <Grid container item xs={'auto'} alignItems="center">
          <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
            {t('stay-in-touch')}
          </Box>

          <Grid item ml={2}>
            <IconButton
              aria-label="whatsapp"
              onClick={() => window.open('https://wa.me/+972583687427')}
            >
              <IconWhatsapp />
            </IconButton>
            <IconButton
              aria-label="email"
              onClick={() => {
                window.location.href = 'mailto:kol.amelamdim@gmail.com';
              }}
            >
              <IconEmail />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <RegisterNow open={open} onClose={() => setOpen(false)} />
    </StyledNavbar>
  );
};
Navbar.getLayout = function getLayout(page: React.ReactElement) {
  return <AlertLayout>{page}</AlertLayout>;
};
