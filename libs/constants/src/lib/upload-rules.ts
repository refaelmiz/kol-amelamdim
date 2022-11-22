export const MAX_UPLOAD_FILE_SIZE = 5000000; // bytes
export const MIN_FILES_ALLOWED = 1;
export const MAX_FILES_ALLOWED = 1;
export const ALLWOED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/pdf',
  'application/msword',
  '.doc',
  '.docx',
  'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

export const UPLOAD_VALIDATION_ERRORS = {
  MIN_FILES_ALLOWED: 'יש לבחור לפחות קובץ אחד',
  MAX_FILES_ALLOWED: 'יש להעלות קובץ אחד בלבד בכל פעם',
  MAX_UPLOAD_FILE_SIZE: 'הגודל המקסימלי להעלאת קובץ הינו 5 מ״ב',
  NOT_ALLOWED_TYPE: 'פורמט הקובץ שבחרת אינו נתמך באתר שלנו',
  AT_LEAST_ONE_REQUIRED: 'יש לבחור לפחות קובץ אחד',
};

export const UPLOAD_SUBMISSION_ERROR =
  'משהו השתבש בצד שלנו. יש לנסות שוב בזמן אחר';
