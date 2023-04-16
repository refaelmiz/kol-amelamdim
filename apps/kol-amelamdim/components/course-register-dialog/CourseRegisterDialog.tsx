import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  Grid,
  styled,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import validator from 'validator';
import axios from 'axios';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';
import {
  StyledButton,
  StyledButtonXL,
  StyledLangButton,
} from '@kol-amelamdim/styled';
import StyledTextField from '../text-field/StyledTextField';
import StyledDialog from '../dialog/StyledDialog';

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
  const isMobile = useMediaQuery(MOBILE_QUERY);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
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
          <Grid container justifyContent="center" alignItems="center">
            <Typography variant="h1" align="center" sx={{ mb: 2 }}>
              הטופס נשלח בהצלחה
            </Typography>
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
                  הרשמה לקבלת הקורס לכתובת המייל
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

              <Grid item container justifyContent="center">
                <StyledButtonXL type="submit" variant="contained">
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
    </StyledDialog>
  );
};

export default CourseRegisterDialog;
