import { useState, ChangeEvent, useContext, useEffect } from 'react';
import {
  Typography,
  Divider,
  IconButton,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  styled,
  SelectChangeEvent,
  useMediaQuery,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/router';
import { Dialog, FormError } from '@kol-amelamdim/styled';
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
    <Dialog open={isAuthenticated && isOpen}>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={handleCloseUploadFileDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}

      <Typography variant="h2" component="h3" sx={{ mt: 1 }}>
        {t('dialog-header')}
      </Typography>
      <Typography component="h4">{t('dialog-subheader')}</Typography>

      <Divider sx={{ mt: 4, mb: 4 }} />
      <TextField
        label={t('dialog-file-name')}
        sx={{ mb: 3 }}
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        error={!fileName && !!submissionError}
      />
      <FormControl sx={{ mb: 3 }}>
        <CategoryLabel id="category-selection">
          {t('dialog-file-type')}
        </CategoryLabel>
        <Select
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
        </Select>
      </FormControl>
      <Button variant="outlined" component="label">
        {t('dialog-file-upload-btn')}
        <input type="file" onChange={handleFileSelection} hidden />
      </Button>
      {selectedFile?.name && (
        <Typography sx={{ mt: 1, fontSize: '16px' }}>
          {selectedFile.name}
        </Typography>
      )}

      <Button
        sx={{ mt: isMobile ? 7 : 'auto' }}
        variant="contained"
        onClick={handleFileSubmission}
        disabled={isUploadButtonDisabled}
      >
        {t('dialog-submit')}
      </Button>
      {isUploadingInProcess && !submissionError && (
        <UploadingIndicatorText>{t('dialog-loading')}</UploadingIndicatorText>
      )}
      <FormError>{submissionError}</FormError>
    </Dialog>
  );
};

export default UploadFileDialog;
