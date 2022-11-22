import { styled, Typography, Grid } from '@mui/material';
import { EmailIcon, WhatsappIcon } from 'react-share';
import { useTranslation } from 'next-i18next';

const StyledFooter = styled('footer')`
  min-height: 150px;
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
      <Rights align="center">{t('rights')}</Rights>
      <Typography align="center" sx={{ mt: 2, mb: 2 }}>
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
      </Grid>
    </StyledFooter>
  );
};
