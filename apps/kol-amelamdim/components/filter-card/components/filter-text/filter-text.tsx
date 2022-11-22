import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useMediaQuery } from '@mui/material';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';
import { useTranslation } from 'next-i18next';

interface FilterTextProps {
  filterText: string;
  setFilterText: (filterText: string) => void;
}

export const FilterText = ({ filterText, setFilterText }: FilterTextProps) => {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const { t } = useTranslation('category');

  return (
    <TextField
      label={t('search')}
      value={filterText}
      onChange={(e) => setFilterText(e.target.value)}
      sx={{
        mr: isMobile ? '10px' : '20px',
        width: isMobile ? '105px' : '200px',
      }}
    />
  );
};
