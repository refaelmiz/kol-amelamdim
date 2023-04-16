import React from 'react';
import { Grid } from '@mui/material';
import { FilterFileType } from './components/filter-file-type/filter-file-type';
import { FilterText } from './components/filter-text/filter-text';
import { useTranslation } from 'next-i18next';
import { StyledButton } from '@kol-amelamdim/styled';

interface FilterProps {
  setFileType: (fileType: string) => void;
  fileType: string;
  filterText: string;
  setFilterText: (filterText: string) => void;
  onClick: () => void;
}

export const Filter = ({
  fileType,
  setFileType,
  filterText,
  setFilterText,
  onClick,
}: FilterProps) => {
  const { t } = useTranslation('category');

  return (
    <Grid xs={12} sx={{ mt: '20px' }}>
      <Grid container alignItems="center" sx={{ height: '100%' }}>
        <Grid
          item
          container
          alignItems="centers"
          sx={{ margin: '10px' }}
          spacing={3}
        >
          <Grid item xs={6}>
            <FilterText filterText={filterText} setFilterText={setFilterText} />
          </Grid>
          <Grid item xs={4}>
            <FilterFileType setFileType={setFileType} fileType={fileType} />
          </Grid>
          <Grid
            container
            item
            xs={'auto'}
            alignItems="center"
            justifyContent="center"
          >
            <StyledButton
              variant="contained"
              onClick={onClick}
              sx={{
                px: '50px',
                height: 'fit-content',
                fontSize: '1.4rem',
                fontWeight: 'bold',
              }}
            >
              {t('filter-btn')}
            </StyledButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
