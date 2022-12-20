import { Grid, Button } from '@mui/material';
import { StyledPageContainer } from '@kol-amelamdim/styled';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../../next-i18next.config';
import { useTranslation } from 'next-i18next';

const AdminDashboard = () => {
  const router = useRouter();
  const { t } = useTranslation('dashboard');

  return (
    <StyledPageContainer>
      <Grid container direction="column">
        <Grid item>
          <Button
            variant="text"
            onClick={() => router.push('/admin/dashboard/add-weekly-article')}
          >
            {t('add-article')}
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="text"
            onClick={() =>
              router.push('/admin/dashboard/list-of-weekly-articles')
            }
          >
            {t('all-weekly-articles')}
          </Button>
        </Grid>
      </Grid>
    </StyledPageContainer>
  );
};
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['dashboard', 'home'],
        i18nConfig
      )),
    },
  };
}

export default AdminDashboard;
