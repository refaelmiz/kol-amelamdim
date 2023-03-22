import React, {useState} from 'react';
import {Box, Button, Dialog, Grid, TextField, Typography, useMediaQuery} from "@mui/material";
import validator from "validator";
import axios from "axios";
import {MOBILE_QUERY} from "@kol-amelamdim/constants";

interface CourseRegisterDialogProps {
  open: boolean;
  onClose: () => void;
}

const CourseRegisterDialog = ({open, onClose}: CourseRegisterDialogProps) => {
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
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidEmail = validator.isEmail(formValues.email);
    setIsEmailValid(isValidEmail);
    if (!isValidEmail) return;

    try {
      await axios.post('https://courses.kol-amelamdim.co.il/wp-json/uap/v2/uap-30392-30393', formValues);
      setIsFormSubmitted(true);
      setFormValues({
        email: "",
        name: ""
      })
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ height: 600, minWidth: isMobile ? "100%" : 600, p: isMobile ? "16px 4px" : 4}}>
        {isFormSubmitted ? (
          <Grid container justifyContent="center" alignItems="center">
            <Typography variant="h1" align="center" sx={{mb: 5}}>הטופס נשלח בהצלחה</Typography>
            <Button variant="contained" onClick={() => {
              setIsFormSubmitted(false);
              onClose();
            }}>סגירה</Button>
          </Grid>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4} justifyContent="center" alignItems="center">
              <Grid item>
                <Typography variant="h2" align="center" sx={{mb: 5}}>הרשמה לקבלת הקורס לכתובת המייל</Typography>
              </Grid>

              <Grid item xs={10}>
                <TextField label="שם" name="name" value={formValues.name} required onChange={handleChange} sx={{width: '100%'}} />
              </Grid>

              <Grid item xs={10}>
                <TextField error={!isEmailValid} label="כתובת מייל" name="email" value={formValues.email} required type="email" onChange={handleChange} sx={{width: '100%'}} />
              </Grid>

              <Grid item container justifyContent="center">
                <Button type="submit" variant="contained" size="large">לקבלת המדריך</Button>
              </Grid>

              <Grid item container justifyContent="center">
                <Button variant="text" onClick={() => {
                  setFormValues({
                    name: "",
                    email: ""
                  });
                  onClose();
                }}>סגירה</Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
    </Dialog>
  );
};

export default CourseRegisterDialog;
