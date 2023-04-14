import React from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import IconWhatsapp from '../../assets/icons/whatsapp';
import IconEmail from '../../assets/icons/email';
import { useTranslation } from 'next-i18next';

function ContactUsButtons({ className }: { className? }) {
  const { t } = useTranslation('home');
  return (
    <Grid container item xs={'auto'} alignItems="center">
      <Box
        className={className}
        sx={{ display: { xs: 'none', lg: 'block' }, color: 'black' }}
      >
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
  );
}

export default ContactUsButtons;
