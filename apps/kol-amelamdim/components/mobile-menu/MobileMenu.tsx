import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledButton, StyledLangButton } from '@kol-amelamdim/styled';
import { Grid, IconButton, styled } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import { Actions } from '../navbar/Navbar';
import { i18n, useTranslation } from 'next-i18next';

const StyledSwipeableDrawer = styled(SwipeableDrawer)`
  & .MuiPaper-root {
    width: 100%;
    max-width: 500px;
    display: flex;
    justify-content: center;

    .MuiGrid-container {
      & > div {
        width: 100%;
        text-align: center;

        button {
          width: 100%;
          max-width: 300px;
        }
      }
    }
  }
`;

type Anchor = 'right';

export default function MobileMenu({
  isAuthenticated,
  logOut,
  router,
  toggleLanguage,
}) {
  const { t } = useTranslation('home');
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Grid
      container
      p={4}
      direction="column"
      justifyContent="center"
      alignItems="center"
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <IconButton
        aria-label="close"
        onClick={toggleDrawer(anchor, false)}
        sx={{
          position: 'absolute',
          left: 20,
          top: 20,
          color: (theme) => theme.palette.grey[900],
        }}
      >
        <CloseIcon />
      </IconButton>

      <Actions>
        {isAuthenticated ? (
          <StyledButton variant="text" onClick={logOut}>
            {t('logout-btn')}
          </StyledButton>
        ) : (
          <Grid container spacing={3} direction="column" alignItems="center">
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

      <Grid item mt={3}>
        <StyledLangButton
          variant="outlined"
          data-language={i18n?.language || 'he'}
          onClick={toggleLanguage}
        >
          {i18n?.language === 'he' ? (
            <img src="/images/flags/GB.svg" width="20" alt="English flag" />
          ) : (
            <img src="/images/flags/IL.svg" width="20" alt="Hebrew flag" />
          )}
          {i18n?.language === 'he' ? 'English' : 'עברית'}
        </StyledLangButton>
      </Grid>
    </Grid>
  );

  return (
    <div>
      <React.Fragment key={'right'}>
        <Button onClick={toggleDrawer('right', true)}>
          <MenuIcon />
        </Button>
        <StyledSwipeableDrawer
          anchor={'left'}
          open={state['right']}
          onClose={toggleDrawer('right', false)}
          onOpen={toggleDrawer('right', true)}
        >
          {list('right')}
        </StyledSwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
