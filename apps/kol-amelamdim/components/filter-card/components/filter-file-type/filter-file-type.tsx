import * as React from 'react';
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  useMediaQuery,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FILE_TYPES_DICTIONARY } from '@kol-amelamdim/types';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';
import { useTranslation } from 'next-i18next';

interface FilterFileTypeProps {
  fileType: string;
  setFileType: (fileType: string) => void;
}

export const FilterFileType = ({
  fileType,
  setFileType,
}: FilterFileTypeProps) => {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const { t } = useTranslation('category');

  const handleChange = (event: SelectChangeEvent) => {
    setFileType(event.target.value);
  };

  return (
    <Box
      sx={{
        minWidth: isMobile ? '100px' : '120px',
        marginRight: isMobile ? '10px' : '20px',
      }}
    >
      <FormControl fullWidth>
        <InputLabel>{t('select-file-type')}</InputLabel>
        <Select value={fileType} label="סוג קובץ" onChange={handleChange}>
          <MenuItem value={FILE_TYPES_DICTIONARY.all}>
            {t('all-file-types')}
          </MenuItem>
          <MenuItem value={FILE_TYPES_DICTIONARY.pdf}>
            {FILE_TYPES_DICTIONARY.pdf}
          </MenuItem>
          <MenuItem value={FILE_TYPES_DICTIONARY.png}>
            {FILE_TYPES_DICTIONARY.png}
          </MenuItem>
          <MenuItem value={FILE_TYPES_DICTIONARY.jpeg}>
            {FILE_TYPES_DICTIONARY.jpeg}
          </MenuItem>
          <MenuItem value={FILE_TYPES_DICTIONARY.msword}>
            {FILE_TYPES_DICTIONARY.msword}
          </MenuItem>
          <MenuItem
            value={
              FILE_TYPES_DICTIONARY[
                'vnd.openxmlformats-officedocument.wordprocessingml.document'
              ]
            }
          >
            {
              FILE_TYPES_DICTIONARY[
                'vnd.openxmlformats-officedocument.wordprocessingml.document'
              ]
            }
          </MenuItem>
          <MenuItem value={FILE_TYPES_DICTIONARY.plain}>
            {FILE_TYPES_DICTIONARY.plain}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
