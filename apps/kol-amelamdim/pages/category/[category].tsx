import { ReactElement, useContext, useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Link,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/router';
import { i18n, useTranslation } from 'next-i18next';
import {
  Categories,
  Category,
  CategoryObj,
  FILE_TYPES_DICTIONARY,
  IFile,
} from '@kol-amelamdim/types';
import { StyledButtonXL, StyledPageContainer } from '@kol-amelamdim/styled';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Filter } from '../../components/filter-card/Filter';
import { UploadFileDialog } from '../../components';
import { AlertContext } from '../../context/alert-context-provider';
import { AlertLayout } from '../../layouts';
import { AuthContext } from '../../context/auth-context-provider';
import i18nConfig from '../../next-i18next.config';
import connect from '../../db/connectMongo';
import { File } from '@kol-amelamdim/models';
import StyledTable from '../../components/table/StyledTable';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';

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
  const { isAuthenticated } = useContext(AuthContext);
  const { setAlertMessage, setAlertType } = useContext(AlertContext);
  const displayedCategory = Categories.filter((cat) => cat.URL === category);

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

  const isMobile = useMediaQuery(MOBILE_QUERY);

  return (
    <StyledPageContainer
      sx={{
        backgroundImage: 'url("/images/full-page-bg.jpg")',
        backgroundSize: 'cover',
        repeat: 'none',
        color: 'white',
        gap: '2em',
        justifyContent: isMobile ? 'start' : '',
      }}
    >
      <Grid
        container
        justifyContent={'center'}
        xs={12}
        md={10}
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100],
          p: isMobile ? '1em' : '1em 2em 3em',
          borderRadius: '10px',
          color: 'black',
        }}
      >
        <Grid textAlign="center" maxWidth="600px">
          <Typography
            variant="h2"
            component="h1"
            sx={{ mt: isMobile ? '2em' : '20px' }}
          >
            {t(`${displayedCategory[0].URL}`)}
          </Typography>
          <Typography>{t('description')}</Typography>
        </Grid>
        <Grid item xs={11} md={10}>
          <Filter
            setFileType={setFileType}
            fileType={fileType}
            filterText={filterText}
            setFilterText={setFilterText}
            onClick={handleFilter}
          />
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ maxHeight: 400, mt: '20px' }}>
            <StyledTable stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: '250px' }}>
                    {t('table-column-name')}
                  </TableCell>
                  <TableCell style={{ minWidth: '100px' }}>
                    {t('table-column-author')}
                  </TableCell>
                  <TableCell>{t('table-column-file-size')}</TableCell>
                  <TableCell>{t('table-column-file-type')}</TableCell>
                  <TableCell style={{ minWidth: '400px' }}>
                    {t('table-column-file-download')}
                  </TableCell>
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
                          {isAuthenticated ? (
                            <Link href={row.URL}>
                              {t('table-download-btn')}
                            </Link>
                          ) : (
                            <Box>
                              <Link onClick={() => router.push('/register')}>
                                הרשמו
                              </Link>
                              <span>או</span>
                              <Link onClick={() => router.push('/login')}>
                                התחברו
                              </Link>

                              <span>כדי להוריד קובץ זה</span>
                            </Box>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </StyledTable>
          </TableContainer>
        </Grid>

        <TablePagination
          component="div"
          rowsPerPageOptions={[]}
          count={filteredFiles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />

        {isUploadFileDialogOpen && (
          <UploadFileDialog
            isOpen={isUploadFileDialogOpen}
            onClose={() => setIsUploadFileDialogOpen(false)}
            defaultCategory={category as Category}
          />
        )}
      </Grid>

      <Grid item mb={6}>
        <StyledButtonXL
          variant="contained"
          onClick={() => setIsUploadFileDialogOpen(true)}
        >
          {t('share-btn')}
        </StyledButtonXL>
      </Grid>
    </StyledPageContainer>
  );
};
CategoryPage.getLayout = function getLayout(page: ReactElement) {
  return <AlertLayout>{page}</AlertLayout>;
};

export default CategoryPage;

export async function getStaticPaths(context) {
  const paths = Categories.map((category: CategoryObj) =>
    context.locales.map((locale) => ({
      params: { category: category.URL },
      locale,
    }))
  ).flat();

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  try {
    const category = context.params.category;
    await connect();
    const files = await File.find({ category, approved: true }).sort({
      _id: -1,
    });

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
    };
  }
}
