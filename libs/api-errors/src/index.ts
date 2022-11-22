export const API_ERRORS = {
  uploadFileError: {
    code: 1,
    message: {
      he: 'אירעה שגיאה בעת העלאת הקובץ אנא נסו שנית',
      en: 'An error occurred while uploading the file. Please try again',
    },
  },
  invalidEmailError: {
    code: 2,
    message: {
      he: 'הוזן אימייל לא תקין, אנא בדקו שהמייל שהוזן תקין ונסו שוב',
      en: 'Email is not valid, try again with other email',
    },
  },
  registrationEmailExistsError: {
    code: 3,
    message: {
      he: 'הוזן מייל שכבר קיים במערכת, אנא עברו להתחברות או השתמשו במייל אחר.',
      en: 'Email is already exists at the system, try again with other email',
    },
  },
  registrationError: {
    code: 4,
    message: {
      he: 'אירעה שגיאה בהרשמה למערכת, אנא נסו שנית',
      en: 'An error occurred while registering to the system. Please try again',
    },
  },
  LoginValidationError: {
    code: 5,
    message: {
      he: 'הוזנו אימייל או סיסמא שגויים, אנא נסו שנית',
      en: 'Incorrect email or password entered, please try again',
    },
  },
  LoginError: {
    code: 6,
    message: {
      he: 'אירעה שגיאה בהתחברות, אנא נסו שנית',
      en: 'There was an error logging in, please try again',
    },
  },
  GeneralError: {
    code: 7,
    message: {
      he: 'אירעה שגיאה כללית, אנא נסו שנית',
      en: 'A general error has occurred, please refresh',
    },
  },
  missingFieldsOnUploadFile: {
    code: 8,
    message: {
      he: 'נא לשלוח קטגוריה שם וקובץ',
      en: 'Please provide category, name and file',
    },
  },
  errorFetchData: {
    code: 9,
    message: {
      he: 'שגיאה ארעה בהזנת נתונים, אנא נסו שנית מאוחר יותר',
      en: 'Error occurred while fetching data, try again later.',
    },
  },
  addWeeklyArticleError: {
    code: 9,
    message: {
      he: 'אירעה שגיאה בעת הוספת המאמר',
      en: 'An error has occurred while adding new article',
    },
  },
  updateWeeklyArticleError: {
    code: 10,
    message: {
      he: 'אירעה שגיאה בעת עדכון המאמר',
      en: 'An error has occurred while updating the article',
    },
  },
  deleteWeeklyArticleError: {
    code: 11,
    message: {
      he: 'לא הצלחנו למחוק את המאמר. נא לנסות שנית.',
      en: 'We cant delete the article. Please try again.',
    },
  },
  getArticleByIdError: {
    code: 11,
    message: {
      he: 'לא הצלחנו למצוא את המאמר הרצוי',
      en: 'We didnt found the article',
    },
  },
  contactUsFormError: {
    code: 12,
    message: {
      he: 'שגיאה בעת שליחת הטופס. נא לוודא שכל השדות מלאים.',
      en: 'Error occurred while submiting the form. Please make sure all fields are filled.',
    },
  },
  unsupportedFileType: {
    code: 12,
    message: {
      he: 'סוג הקובץ לא נתמך',
      en: 'File type is not supported',
    },
  },
  invalidPhoneError: {
    code: 13,
    message: {
      he: 'הוזן טלפון לא תקין, אנא בדקו שהטלפון שהוזן תקין ונסו שוב',
      en: 'Phone is not valid, try again with other phone',
    },
  },
};
