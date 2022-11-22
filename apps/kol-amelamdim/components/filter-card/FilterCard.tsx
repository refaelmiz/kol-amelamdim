import React from 'react';
import { Card, Button, Grid } from '@mui/material';
import { FilterFileType } from './components/filter-file-type/filter-file-type';
import { FilterText } from './components/filter-text/filter-text';
import { useTranslation } from 'next-i18next';

interface FilterCardProps {
  setFileType: (fileType: string) => void;
  fileType: string;
  filterText: string;
  setFilterText: (filterText: string) => void;
  onClick: () => void;
}

export const FilterCard = ({
  fileType,
  setFileType,
  filterText,
  setFilterText,
  onClick,
}: FilterCardProps) => {
  const { t } = useTranslation('category');

  return (
    <Card sx={{ mt: '20px' }}>
      <Grid container alignItems="center" sx={{ height: '100%' }}>
        <Grid item container sx={{ margin: '10px' }}>
          <FilterText filterText={filterText} setFilterText={setFilterText} />
          <FilterFileType setFileType={setFileType} fileType={fileType} />
          <Button variant="contained" onClick={onClick}>
            {t('filter-btn')}
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};
