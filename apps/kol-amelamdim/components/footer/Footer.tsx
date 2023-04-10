import { Box, Grid, IconButton, styled, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import IconWhatsapp from '../../assets/icons/whatsapp';
import IconEmail from '../../assets/icons/email';

const StyledFooter = styled('footer')`
  background: #e4e3e3;
  padding: 24px;
  position: relative;
`;

const Rights = styled(Typography)`
  font-weight: bold;
`;

export const Footer = () => {
  const translation = useTranslation('home');
  const { t } = translation;
  return (
    <StyledFooter>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={10}
        pr={'1em'}
        pl={'1em'}
      >
        <Grid item xs={'auto'}>
          <Rights align="center">{t('rights')}</Rights>
        </Grid>
        {/*  <Typography align="center" sx={{ mt: 2, mb: 2 }}>
        {t('contact')}
      </Typography>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item>
          <WhatsappIcon
            round
            onClick={() => window.open('https://wa.me/+972583687427')}
          />
        </Grid>
        <Grid item>
          <EmailIcon
            round
            onClick={() => {
              window.location.href = 'mailto:kol.amelamdim@gmail.com';
            }}
          />
        </Grid>
      </Grid> */}
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
    </StyledFooter>
  );
};
