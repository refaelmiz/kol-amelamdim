import {
  ALLWOED_FILE_TYPES,
  MAX_UPLOAD_FILE_SIZE,
  UPLOAD_VALIDATION_ERRORS,
} from '@kol-amelamdim/constants';

export const uploadFileValidationError = (file: File): string | null => {
  if (!file) {
    return UPLOAD_VALIDATION_ERRORS.AT_LEAST_ONE_REQUIRED;
  }

  if (!ALLWOED_FILE_TYPES.includes(file.type)) {
    return UPLOAD_VALIDATION_ERRORS.NOT_ALLOWED_TYPE;
  }

  if (file.size > MAX_UPLOAD_FILE_SIZE) {
    return UPLOAD_VALIDATION_ERRORS.MAX_UPLOAD_FILE_SIZE;
  }

  return null;
};
