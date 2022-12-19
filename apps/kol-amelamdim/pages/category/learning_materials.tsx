import { useEffect, useState, useContext, ReactElement } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Link,
  Button,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { i18n, useTranslation } from 'next-i18next';
import { Category, Categories, IFile, CategoryObj } from '@kol-amelamdim/types';
import { StyledPageContainer } from '@kol-amelamdim/styled';
import { FILE_TYPES_DICTIONARY } from '@kol-amelamdim/types';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FilterCard } from '../../components/filter-card/FilterCard';
import { UploadFileDialog } from '../../components';
import { AlertContext } from '../../context/alert-context-provider';
import { AlertLayout } from '../../layouts';
import i18nConfig from '../../next-i18next.config';
import connect from '../../db/connectMongo';
import { File } from '@kol-amelamdim/models';

const rowsPerPage = 25;

const CategoryPage = ({ files, error }) => {
  const [fileType, setFileType] = useState('');
  const [filterText, setFilterText] = useState('');
  const [page, setPage] = useState<number>(0);
  const [filteredFiles, setFilteredFiles] = useState<IFile[]>([]);
  const [isUploadFileDialogOpen, setIsUploadFileDialogOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('category');
  const { category } = router.query;
  const { setAlertMessage, setAlertType } = useContext(AlertContext);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleFilter = () => {
    const isFilteredByFileType =
      fileType && fileType !== FILE_TYPES_DICTIONARY.all;
    let filteredFiles = [...files];
    if (isFilteredByFileType) {
      filteredFiles = filteredFiles.filter((file) => file.type === fileType);
    }

    if (filterText) {
      filteredFiles = filteredFiles.filter(
        (file) =>
          file.name.includes(filterText) || file.author.includes(filterText)
      );
    }

    setFilteredFiles(filteredFiles);
  };

  useEffect(() => {
    if (files) {
      setFilteredFiles(files);
    }
  }, [files]);

  useEffect(() => {
    if (error) {
      setAlertType('warning');
      setAlertMessage(API_ERRORS.errorFetchData.message[i18n.language]);
    }
  }, [error, setAlertType, setAlertMessage]);

  return (
    <StyledPageContainer>
      <>
        <Typography variant="h3" component="h2" sx={{ mt: 2 }}>
          {t('learning_materials')}
        </Typography>
        <FilterCard
          setFileType={setFileType}
          fileType={fileType}
          filterText={filterText}
          setFilterText={setFilterText}
          onClick={handleFilter}
        />
        <TableContainer component={Paper} sx={{ maxHeight: 400, mt: '20px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>{t('table-column-name')}</TableCell>
                <TableCell>{t('table-column-author')}</TableCell>
                <TableCell>{t('table-column-file-size')}</TableCell>
                <TableCell>{t('table-column-file-type')}</TableCell>
                <TableCell>{t('table-column-file-download')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFiles
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row.key}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.author}</TableCell>
                      <TableCell>{row.size}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>
                        <Link href={row.URL}>{t('table-download-btn')}</Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[]}
          count={filteredFiles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
        <Button
          variant="contained"
          onClick={() => setIsUploadFileDialogOpen(true)}
        >
          {t('share-btn')}
        </Button>
        {isUploadFileDialogOpen && (
          <UploadFileDialog
            isOpen={isUploadFileDialogOpen}
            onClose={() => setIsUploadFileDialogOpen(false)}
            defaultCategory={category as Category}
          />
        )}
      </>
    </StyledPageContainer>
  );
};
CategoryPage.getLayout = function getLayout(page: ReactElement) {
  return <AlertLayout>{page}</AlertLayout>;
};

export default CategoryPage;


export async function getStaticProps(context) {
  try {
    await connect();
    const files = await File.find({ category: 'learning_materials', approved: true });

    return {
      props: {
        files: JSON.parse(JSON.stringify(files)),
        error: false,
        ...(await serverSideTranslations(
          context.locale,
          ['category', 'home'],
          i18nConfig
        )),
      },
      revalidate: 10,
    };
  } catch (e) {
    return {
      props: {
        files: [],
        error: true,
        ...(await serverSideTranslations(
          context.locale,
          ['category', 'home'],
          i18nConfig
        )),
      },
      revalidate: 10,
    };
  }
}
