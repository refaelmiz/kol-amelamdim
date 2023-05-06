import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Typography,
  useMediaQuery,
} from '@mui/material';
import validator from 'validator';
import axios from 'axios';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';
import {
  StyledButton,
  StyledButtonXL,
  StyledCheckbox,
  StyledLangButton,
  StyledMUILink,
} from '@kol-amelamdim/styled';
import StyledTextField from '../text-field/StyledTextField';
import StyledDialog from '../dialog/StyledDialog';
import { useTranslation } from 'next-i18next';
import TermsDialog from '../terms-dialog/TermsDialog';

interface CourseRegisterDialogProps {
  open: boolean;
  onClose: () => void;
}

const CourseRegisterDialog = ({ open, onClose }: CourseRegisterDialogProps) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    name: '',
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const [termsDialogOpen, setTermsDialogOpen] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidEmail = validator.isEmail(formValues.email);
    setIsEmailValid(isValidEmail);
    if (!isValidEmail) return;

    try {
      await axios.post(
        'https://courses.kol-amelamdim.co.il/wp-json/uap/v2/uap-30395-30396',
        formValues
      );
      setIsFormSubmitted(true);
      setFormValues({
        email: '',
        name: '',
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
      <Box sx={{ p: isMobile ? '16px 4px' : 4 }}>
        {isFormSubmitted ? (
          <Grid container item direction="column" p={4} pt={2} spacing={3}>
            <Grid item>
              <Typography
                variant="body2"
                align="center"
                sx={{ fontSize: '2.5rem' }}
              >
                הטופס נשלח בהצלחה
              </Typography>
            </Grid>

            <Grid item justifyContent="center" textAlign={'center'}>
              <Typography
                variant="body2"
                align="center"
                sx={{
                  fontSize: '1.5rem',
                  display: 'inline',
                  color: (theme) => theme.palette.secondary.main,
                  marginRight: '10px',
                }}
              >
                חשוב!
              </Typography>
              <span>אם אינך רואה את המייל ששלחתי בזמן הקרוב, </span>

              <span>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                בדוק ב"ספאם" או ב"קידומי מכירות", אולי הגיע המייל לשם בטעות,
              </span>

              <span>
                {' '}
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                א"כ חשוב שתעביר אותו לדואר נכנס הראשי כדי שלא תפספס בטעות את
                המיילים עם השיעורים הבאים
              </span>
            </Grid>

            <Grid item xs={12} mt={2}>
              <StyledButton
                variant="contained"
                onClick={() => {
                  setIsFormSubmitted(false);
                  onClose();
                }}
              >
                סגירה
              </StyledButton>
            </Grid>
          </Grid>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={{ xs: 3, md: 4 }}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h2" align="center" sx={{ mb: 1 }}>
                  הרשמה לקבלת המדריך לכתובת המייל
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <StyledTextField
                  label="שם"
                  name="name"
                  value={formValues.name}
                  required
                  onChange={handleChange}
                  sx={{ width: '100%' }}
                />
              </Grid>

              <Grid item xs={12}>
                <StyledTextField
                  error={!isEmailValid}
                  label="כתובת מייל"
                  name="email"
                  value={formValues.email}
                  required
                  type="email"
                  onChange={handleChange}
                  sx={{ width: '100%' }}
                />
              </Grid>

              <Grid container item alignItems="center" justifyContent="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isChecked}
                      required
                      onChange={handleCheckboxChange}
                      name="acceptTerms"
                    />
                  }
                  label={'אני מסכים'}
                />
                <Link
                  sx={{ cursor: 'pointer' }}
                  role={'button'}
                  tabIndex={0}
                  onClick={() => setTermsDialogOpen(true)}
                >
                  {'לתנאי התקנון'}
                </Link>
              </Grid>

              <Grid item container justifyContent="center">
                <StyledButtonXL
                  disabled={!isChecked}
                  type="submit"
                  variant="contained"
                >
                  לקבלת המדריך
                </StyledButtonXL>
              </Grid>

              <Grid item container justifyContent="center">
                <StyledLangButton
                  variant="outlined"
                  onClick={() => {
                    setFormValues({
                      name: '',
                      email: '',
                    });
                    onClose();
                  }}
                >
                  סגירה
                </StyledLangButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
      <TermsDialog
        isOpen={termsDialogOpen}
        onClose={() => setTermsDialogOpen(false)}
      />
    </StyledDialog>
  );
};

export default CourseRegisterDialog;
