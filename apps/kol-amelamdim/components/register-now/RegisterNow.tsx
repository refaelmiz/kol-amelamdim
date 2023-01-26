import { Button, styled, Typography } from '@mui/material';
import { Dialog } from '@kol-amelamdim/styled';
import { useRouter } from 'next/router';

export function RegisterNow({ open, onClose }) {
  const router = useRouter();

  return (
    <Dialog open={open} onClose={onClose}>
      <Typography
        variant="h2"
        component="h2"
        sx={{ mb: 3, textAlign: 'center' }}
      >
        אתר כל המלמדים מזמין אתכם להרשם
      </Typography>
      <Paragraph>באתר זה תוכלו למצוא מגוון תכנים לשימושכם האישי.</Paragraph>
      <Paragraph>
        על מנת שתוכלו להינות מהתוכן שבאתר אתם נדרשים להרשם או להתחבר.
      </Paragraph>
      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => {
          router.push('/register');
          onClose();
        }}
      >
        להרשמה
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          router.push('/login');
          onClose();
        }}
      >
        להתחברות
      </Button>
    </Dialog>
  );
}

const Paragraph = styled('p')`
  margin: 0;
  text-align: center;
`;
