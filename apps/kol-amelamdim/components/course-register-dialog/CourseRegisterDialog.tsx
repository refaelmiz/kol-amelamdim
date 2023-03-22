import React, {useState} from 'react';
import {Box, Button, Dialog, Grid, TextField, Typography} from "@mui/material";
import validator from "validator";

interface CourseRegisterDialogProps {
  open: boolean;
  onClose: () => void;
}

const CourseRegisterDialog = ({open, onClose}: CourseRegisterDialogProps) => {
  const [formValues, setFormValues] = useState({
    email: '',
    name: '',
  });
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidEmail = validator.isEmail(formValues.email);
    setIsEmailValid(isValidEmail);
    if (!isValidEmail) return;

  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ height: 600, p: 4}}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid item>
              <Typography variant="h2" align="center" sx={{mb: 5}}>הרשמה לקבלת הקורס לכתובת המייל</Typography>
            </Grid>

            <Grid item xs={10}>
              <TextField label="שם" name="name" value={formValues.name} onChange={handleChange} sx={{width: '100%'}} />
            </Grid>

            <Grid item xs={10}>
              <TextField error={!isEmailValid} label="כתובת מייל" name="email" value={formValues.email} onChange={handleChange} sx={{width: '100%'}} />
            </Grid>

            <Grid item container justifyContent="center">
              <Button type="submit" variant="contained" size="large">לקבלת המדריך</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Dialog>
  );
};

export default CourseRegisterDialog;
