import * as React from 'react';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  styled,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/router';
import { FormError, StyledButtonXL } from '@kol-amelamdim/styled';
import { Categories, Category } from '@kol-amelamdim/types';
import {
  MAX_FILES_ALLOWED,
  MOBILE_QUERY,
  UPLOAD_VALIDATION_ERRORS,
} from '@kol-amelamdim/constants';
import { uploadFileValidationError } from '@kol-amelamdim/utils';
import CloseIcon from '@mui/icons-material/Close';
import axios from '../../api';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import { AlertContext } from '../../context/alert-context-provider';
import { AuthContext } from '../../context/auth-context-provider';
import { i18n, useTranslation } from 'next-i18next';
import StyledDialog from '../dialog/StyledDialog';
import StyledTextField from '../text-field/StyledTextField';
import StyledSelect from '../select/StyledSelect';

const Paragraph = styled('p')`
  margin: 0;
  text-align: center;
`;

const CategoryLabel = styled(InputLabel)`
  &.MuiFormLabel-root {
    background: ${(props) => props.theme.palette.primary.light};
    padding: 0 5px;
  }
`;

const UploadingIndicatorText = styled(Typography)`
  color: ${(props) => props.theme.palette.primary.main};
  margin-top: 10px;
`;

interface UploadFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: Category;
}

export const UploadFileDialog = ({
  isOpen,
  onClose,
  defaultCategory,
}: UploadFileDialogProps) => {
  const router = useRouter();
  const { t } = useTranslation('home');

  const { setAlertMessage } = useContext(AlertContext);
  const { isAuthenticated } = useContext(AuthContext);

  const [category, setCategory] = useState(defaultCategory || '');
  const [fileName, setFileName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submissionError, setSubmissionError] = useState('');
  const [isUploadingInProcess, setIsUploadingInProcess] = useState(false);
  const [isUploadButtonDisabled, setIsUploadButtonDisabled] = useState(false);
  const isMobile = useMediaQuery(MOBILE_QUERY);

  useEffect(() => {
    if (!isAuthenticated && isOpen) {
      router.push('/login');
    }
  }, [isOpen, isAuthenticated, router]);

  const handleFileSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const filesList: FileList = e.target.files;

    if (filesList.length > MAX_FILES_ALLOWED) {
      setSubmissionError(UPLOAD_VALIDATION_ERRORS.MAX_FILES_ALLOWED);
    }

    if (filesList.length === 0) {
      setSubmissionError(UPLOAD_VALIDATION_ERRORS.MIN_FILES_ALLOWED);
    }

    setSelectedFile(filesList[0]);
  };

  const resetFormValues = () => {
    setSubmissionError('');
    setCategory('');
    setFileName('');
    setSelectedFile(null);
    setIsUploadButtonDisabled(false);
  };

  const handleCloseUploadFileDialog = () => {
    resetFormValues();
    onClose();
  };

  const handleFileSubmission = async () => {
    if (!category || !fileName) {
      return setSubmissionError(
        API_ERRORS.missingFieldsOnUploadFile.message[i18n.language]
      );
    }

    const uploadValidationError = uploadFileValidationError(selectedFile);

    if (!uploadValidationError) {
      setIsUploadButtonDisabled(true);
      setSubmissionError('');
      setIsUploadingInProcess(true);

      const formData = new FormData();
      formData.append('sharedFile', selectedFile, fileName);
      formData.append('category', category);

      try {
        const res = await axios.post('/api/upload-file', formData);
        if (res.data.isUploaded) {
          setAlertMessage(t('dialog-success-message'));
          setIsUploadingInProcess(false);
          handleCloseUploadFileDialog();
          await router.replace(router.asPath);
        }
      } catch (e) {
        if (e.response) {
          setSubmissionError(e.response.data.message[i18n.language]);
        }
        setIsUploadingInProcess(false);
        setIsUploadButtonDisabled(false);
      }
    } else {
      setSubmissionError(uploadValidationError);
      setIsUploadButtonDisabled(false);
    }
  };

  return (
    <StyledDialog open={isAuthenticated && isOpen} onClose={onClose}>
      <Box sx={{ p: isMobile ? '2em 1em' : '2em 3em' }}>
        {onClose ? (
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
        ) : null}

        <Grid
          container
          direction={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          spacing={4}
        >
          <Grid item>
            <Typography
              variant="h2"
              component="h2"
              sx={{ mb: 3, textAlign: 'center' }}
            >
              {t('dialog-header')}
            </Typography>
            <Paragraph>{t('dialog-subheader')}</Paragraph>
          </Grid>
          <Grid item container justifyContent="center" xs={12}>
            <StyledTextField
              label={t('dialog-file-name')}
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              error={!fileName && !!submissionError}
            />
          </Grid>
          <Grid container item>
            <FormControl sx={{ width: '100%' }}>
              <CategoryLabel id="category-selection">
                {t('dialog-file-type')}
              </CategoryLabel>
              <StyledSelect
                value={category}
                labelId="category-selection"
                id="demo-simple-select"
                error={!category && !!submissionError}
                onChange={(e: SelectChangeEvent) => setCategory(e.target.value)}
              >
                {Categories.map((category) => {
                  return (
                    <MenuItem key={category.URL} value={category.URL}>
                      {category[i18n.language]}
                    </MenuItem>
                  );
                })}
              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid item sx={{ width: '100%' }}>
            <Button
              variant="contained"
              color="secondary"
              component={'label'}
              sx={{
                borderRadius: '100px',
                padding: '2px 30px 6px 20px',
                color: 'white',
                fontSize: '1.4rem !important',
                width: '100%',
              }}
            >
              {t('dialog-file-upload-btn')}
              <input type="file" onChange={handleFileSelection} hidden />
            </Button>
          </Grid>
          <Grid item>
            {selectedFile?.name && (
              <Typography sx={{ mt: 1, fontSize: '16px' }}>
                {selectedFile.name}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <StyledButtonXL
              sx={{ mt: isMobile ? 7 : 'auto' }}
              variant="contained"
              onClick={handleFileSubmission}
              disabled={isUploadButtonDisabled}
            >
              {t('dialog-submit')}
            </StyledButtonXL>
          </Grid>
          <Grid item xs={12}>
            {isUploadingInProcess && !submissionError && (
              <UploadingIndicatorText>
                {t('dialog-loading')}
              </UploadingIndicatorText>
            )}

            {submissionError && (
              <FormError sx={{ textAlign: 'center' }}>
                {submissionError}
              </FormError>
            )}
          </Grid>
        </Grid>
      </Box>
    </StyledDialog>
  );
};

export default UploadFileDialog;
