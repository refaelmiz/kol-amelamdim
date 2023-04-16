import * as React from 'react';
import TextField from '@mui/material/TextField';
import { styled, useMediaQuery } from '@mui/material';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';
import { useTranslation } from 'next-i18next';
import StyledTextField from '../../../text-field/StyledTextField';

interface FilterTextProps {
  filterText: string;
  setFilterText: (filterText: string) => void;
}

export const FilterText = ({ filterText, setFilterText }: FilterTextProps) => {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const { t } = useTranslation('category');

  return (
    <StyledTextField
      placeholder={t('search')}
      value={filterText}
      onChange={(e) => setFilterText(e.target.value)}
    />
  );
};
