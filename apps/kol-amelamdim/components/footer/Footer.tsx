import { Grid, styled, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import ContactUsButtons from '../contact-us-buttons/ContactUsButtons';

const StyledFooter = styled('footer')`
  background: white;
  padding: 24px;
  position: relative;

  .title {
    display: block;
  }
`;

export const Footer = () => {
  const translation = useTranslation('home');
  const { t } = translation;
  return (
    <StyledFooter>
      <Grid
        container
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        pr={'1em'}
        pl={'1em'}
      >
        <Grid item xs={'auto'}>
          <Typography align="center">{t('rights')}</Typography>
        </Grid>
        <Grid item sx={{ display: { xs: 'none', md: 'block' } }}>
          <ContactUsButtons className="title" />
        </Grid>
      </Grid>
    </StyledFooter>
  );
};
