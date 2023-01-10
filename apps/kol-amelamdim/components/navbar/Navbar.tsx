import { useEffect, useContext } from 'react';
import {
  AppBar,
  Button,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from '@mui/material';
import Image from 'next/image';
import { i18n, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';
import axios from '../../api';
import { AuthContext } from '../../context/auth-context-provider';
import { AlertContext } from '../../context/alert-context-provider';
import { AlertLayout } from '../../layouts';

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

const StyledCountryDropDown = styled(Select)`
  & .MuiSelect-select.MuiSelect-outlined {
    padding: 10px;
    color: #356559;
  }
`;

const Actions = styled(Grid)`
  @media ${MOBILE_QUERY} {
    flex-wrap: wrap-reverse;
  }
`;

export const Navbar = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const { t } = useTranslation('home');

  const { isAuthenticated, setAuthenticated, checkAuthentication } =
    useContext(AuthContext);
  const { setAlertMessage, setAlertType } = useContext(AlertContext);

  const handleLanguageChange = async (event: SelectChangeEvent) => {
    await router.push({ pathname, query }, asPath, {
      locale: event.target.value,
    });
    router.reload();
  };

  useEffect(() => {
    checkAuthentication()
      .then((data) => {
        if (data.success) {
          setAuthenticated(true);
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
      <Grid container>
        <Grid
          item
          container
          xs={5}
          alignItems="center"
          sx={{ position: 'relative', cursor: 'pointer' }}
        >
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={190}
            height={80}
            onClick={() => router.push('/')}
          />
        </Grid>
        <Actions
          item
          container
          xs={7}
          alignItems="center"
          justifyContent="flex-end"
        >
          {isAuthenticated ? (
            <Button variant="text" onClick={logOut}>
              {t('logout-btn')}
            </Button>
          ) : (
            <div>
              <Button variant="text" onClick={() => router.push('/login')}>
                {t('login-btn')}
              </Button>
              <Button variant="text" onClick={() => router.push('/register')}>
                {t('register-btn')}
              </Button>
            </div>
          )}
          <StyledCountryDropDown
            value={i18n?.language || 'he'}
            onChange={handleLanguageChange}
          >
            <MenuItem value={'he'}>עברית</MenuItem>
            <MenuItem value={'en'}>English</MenuItem>
          </StyledCountryDropDown>
        </Actions>
      </Grid>
    </StyledNavbar>
  );
};
Navbar.getLayout = function getLayout(page: React.ReactElement) {
  return <AlertLayout>{page}</AlertLayout>;
};
