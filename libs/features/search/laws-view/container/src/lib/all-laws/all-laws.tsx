import { TableCell, tableCellClasses, TableRow, TableContainer, Button, TableHead, Typography, TableBody, TableFooter, styled } from '@mui/material';
import { DeleteLaw, DownloadLaw, GetAllLaws, GetPageOfLawsResponse } from '@sep-frontend/features/search/laws-view/data-access';
import { SearchBar } from '@sep-frontend/features/search/search-bar/container';
import { LawDto, SearchRoutes } from '@sep-frontend/models';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './all-laws.module.css';

/* eslint-disable-next-line */
export interface LawsPageProps { }

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#212121',
    color: 'whitesmoke',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxWidth: '95%',
  width: 'fit-content',
  margin: '0 auto',
  borderRadius: '10px',
  boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.4)',
}));

export function LawsPage(props: LawsPageProps) {
  const navigate = useNavigate()

  const [laws, setLaws] = useState<LawDto[]>([]);
  const [page, setPage] = useState<number>(0);
  const [allPagesLoaded, setAllPagesLoaded] = useState<boolean>(false);

  const getLaws = async () => {
    const response = await GetAllLaws(page, 10);
    if (response.totalPages === page + 1) {
      setAllPagesLoaded(true);
    }
    setLaws((prev) => prev.concat(response.laws));
  };

  const downloadLaw = async (fileName: string) => {
    const downloadUrl = await DownloadLaw(fileName);
    window.open(downloadUrl);
  }

  const deleteLaw = async (id: string) => {
    const response = await DeleteLaw(id);
    if (response) {
      setLaws((prev) => prev.filter((law) => law.id !== id));
    }
  }

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  function loadSearchResults(data: GetPageOfLawsResponse) {
    if (data.totalPages === page + 1) {
      setAllPagesLoaded(true);
    }
    setLaws(data.laws);
  }

  function resetSearch() {
    setPage(0);
    setLaws([]);
    getLaws();
  }

  function upload() {
    navigate(SearchRoutes.UploadLaw)
  }

  useEffect(() => {
    getLaws();
  }, [page]);

  return (
    <>
      <SearchBar page={page} size={10} sendDataToParent={loadSearchResults} resetDataOnParent={resetSearch}
        availableFields={['content']}
        availableFieldsNames={['Content']}
        documentType='Law'
      />
      <StyledTableContainer>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Typography variant="subtitle1">Content</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle1">File</Typography>
            </StyledTableCell>
            <StyledTableCell colSpan={2}>
              <Button
                variant="contained"
                size="large"
                onClick={upload}
                sx={{ color: 'white', background: '#212121', ':hover': { background: 'white', color: '#212121' } }}
              >
                Upload Law
              </Button>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {laws?.map((law, idx) => (
            <StyledTableRow key={idx}>
              <StyledTableCell>{law.content}</StyledTableCell>
              <StyledTableCell>{law.fileName}</StyledTableCell>
              <StyledTableCell>
                <Button
                  variant="contained"
                  sx={{ color: 'white', background: '#212121', ':hover': { background: 'green' }}}
                  onClick={() => downloadLaw(law.fileName)}>Download</Button>
              </StyledTableCell>
              <StyledTableCell>
                <Button
                  variant="contained"
                  sx={{ color: 'white', background: '#212121', ':hover': { background: 'red' }}}
                  onClick={() => deleteLaw(law.id)}>Delete</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <StyledTableCell align="center">
              <Typography variant="h6" align="center">
                Page {page + 1}
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="left" colSpan={2}>
              <Button
                variant="contained"
                type="submit"
                disabled={allPagesLoaded}
                sx={{
                  color: 'whitesmoke',
                  background: '#212121',
                  alignSelf: 'center',
                  ':hover': { background: 'whitesmoke', color: '#212121' },
                }}
                onClick={() => handleLoadMore()}
              >
                {allPagesLoaded ? 'All Pages Loaded' : 'Load More'}
              </Button>
            </StyledTableCell>
          </TableRow>
        </TableFooter>
      </StyledTableContainer>
    </>
  );
}

export default LawsPage;
