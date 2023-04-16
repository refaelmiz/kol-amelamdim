import * as React from 'react';
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  useMediaQuery,
  styled,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FILE_TYPES_DICTIONARY } from '@kol-amelamdim/types';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';
import { useTranslation } from 'next-i18next';
import StyledSelect from 'apps/kol-amelamdim/components/select/StyledSelect';

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
    setSelectedValue(event.target.value);
  };

  const [selectedValue, setSelectedValue] = React.useState(
    FILE_TYPES_DICTIONARY.all
  );

  const HiddenInputLabel = styled(InputLabel)`
    font-size: 0;
  `;

  return (
    <Box
      sx={{
        minWidth: isMobile ? '200px' : '200px',
        marginRight: isMobile ? '10px' : '20px',
      }}
    >
      <FormControl fullWidth>
        <HiddenInputLabel>{t('select-file-type')}</HiddenInputLabel>
        <StyledSelect value={selectedValue} onChange={handleChange}>
          <MenuItem value={FILE_TYPES_DICTIONARY.all}>
            {' '}
            {t('all-file-types')}{' '}
          </MenuItem>
          <MenuItem value={FILE_TYPES_DICTIONARY.pdf}>
            {' '}
            {FILE_TYPES_DICTIONARY.pdf}{' '}
          </MenuItem>
          <MenuItem value={FILE_TYPES_DICTIONARY.png}>
            {' '}
            {FILE_TYPES_DICTIONARY.png}{' '}
          </MenuItem>
          <MenuItem value={FILE_TYPES_DICTIONARY.jpeg}>
            {' '}
            {FILE_TYPES_DICTIONARY.jpeg}{' '}
          </MenuItem>
          <MenuItem value={FILE_TYPES_DICTIONARY.msword}>
            {' '}
            {FILE_TYPES_DICTIONARY.msword}{' '}
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
            {' '}
            {FILE_TYPES_DICTIONARY.plain}{' '}
          </MenuItem>
        </StyledSelect>
      </FormControl>
    </Box>
  );
};
