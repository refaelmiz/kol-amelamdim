import {
  Box,
  Grid,
  IconButton,
  styled,
  Typography,
  useMediaQuery,
} from '@mui/material';
import StyledDialog from '../dialog/StyledDialog';
import { useRouter } from 'next/router';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';
import { StyledButtonXL } from '@kol-amelamdim/styled';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';

const Paragraph = styled('p')`
  margin: 0;
  text-align: center;
`;

export function RegisterNow({ open, onClose }) {
  const router = useRouter();
  const isMobile = useMediaQuery(MOBILE_QUERY);

  return (
    <StyledDialog open={open} onClose={onClose}>
      <Box sx={{ p: isMobile ? '2em 1em' : '2em 2em 3em' }}>
        <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
          <IconButton
            onClick={onClose}
            aria-label="close"
            sx={{
              color: (theme) => theme.palette.grey[900],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Grid
          container
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Grid item>
            <Typography
              variant="h2"
              component="h2"
              sx={{ mb: 3, textAlign: 'center' }}
            >
              אתר כל המלמדים מזמין אתכם להרשם
            </Typography>
            <Paragraph>
              באתר זה תוכלו למצוא מגוון תכנים לשימושכם האישי.
            </Paragraph>
            <Paragraph>
              על מנת שתוכלו להינות מהתוכן שבאתר אתם נדרשים להרשם או להתחבר.
            </Paragraph>
          </Grid>
          <Grid item container justifyContent="center" xs={12}>
            <StyledButtonXL
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                router.push('/register');
                onClose();
              }}
            >
              להרשמה
            </StyledButtonXL>
          </Grid>
          <Grid item container justifyContent="center" xs={12}>
            <StyledButtonXL
              variant="contained"
              onClick={() => {
                router.push('/login');
                onClose();
              }}
            >
              להתחברות
            </StyledButtonXL>
          </Grid>
        </Grid>
      </Box>
    </StyledDialog>
  );
}
