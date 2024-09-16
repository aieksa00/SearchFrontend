import { useEffect, useState } from 'react';
import {
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  TableCell,
  styled,
  tableCellClasses,
  TableFooter,
  Button,
} from '@mui/material';
import { ContractDto, SearchRoutes } from '@sep-frontend/models';
import { DeleteContract, DownloadContract, GetAllContracts, GetPageOfContractsResponse } from '@sep-frontend/features/search/contracts-view/data-access';
import { SearchBar } from '@sep-frontend/features/search/search-bar/container';
import { useNavigate } from 'react-router-dom';


/* eslint-disable-next-line */
export interface ContractsPageProps { }

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

export function ContractsPage(props: ContractsPageProps) {
  const navigate = useNavigate()

  const [contracts, setContracts] = useState<ContractDto[]>([]);
  const [page, setPage] = useState<number>(0);
  const [allPagesLoaded, setAllPagesLoaded] = useState<boolean>(false);

  const getContracts = async () => {
    const response = await GetAllContracts(page, 10);
    if (response.totalPages === page + 1) {
      setAllPagesLoaded(true);
    }
    setContracts((prev) => prev.concat(response.contracts));
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const downloadContract = async (fileName: string) => {
    const downloadUrl = await DownloadContract(fileName);
    window.open(downloadUrl);
  }

  const deleteContract = async (id: string) => {
    const response = await DeleteContract(id);
    if (response) {
      setContracts((prev) => prev.filter((contract) => contract.id !== id));
    }
  }

  function loadSearchResults(data: GetPageOfContractsResponse) {
    if (data.totalPages === page + 1) {
      setAllPagesLoaded(true);
    }
    setContracts(data.contracts);
  }

  function resetSearch() {
    setPage(0);
    setContracts([]);
    getContracts();
  }

  function upload() {
    navigate(SearchRoutes.UploadContract)
  }

  useEffect(() => {
    getContracts();
  }, [page]);

  return (
    <>
      <SearchBar page={page} size={10} sendDataToParent={loadSearchResults} resetDataOnParent={resetSearch}
        availableFields={[
          'signerName',
          'signerSurname',
          'governmentName',
          'administrationLevel',
          'address',
          'content'
        ]}
        availableFieldsNames={[
          'Signer Name',
          'Signer Surname',
          'Government Name',
          'Administration Level',
          'Address',
          'Content'
        ]}
        documentType='Contract' />
      <StyledTableContainer>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Typography variant="subtitle1">Signer Name</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle1">Signer Surname</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle1">Government</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle1">Administration Level</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle1">Address</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle1">File</Typography>
            </StyledTableCell>
            <StyledTableCell colSpan={2}>
              <Button variant="contained"
                size="large"
                onClick={upload}
                sx={{ color: 'white', background: '#212121', height: '48px', minWidth: '200px', ':hover': { background: 'white', color: '#212121' } }}
              >
                Upload Contract
              </Button>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contracts?.map((contract, idx) => (
            <StyledTableRow key={idx}>
              <StyledTableCell>{contract.signerName}</StyledTableCell>
              <StyledTableCell>{contract.signerSurname}</StyledTableCell>
              <StyledTableCell>{contract.governmentName}</StyledTableCell>
              <StyledTableCell>{contract.administrationLevel}</StyledTableCell>
              <StyledTableCell>{contract.address}</StyledTableCell>
              <StyledTableCell>{contract.fileName}</StyledTableCell>
              <StyledTableCell>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ color: 'white', background: '#212121', ':hover': { background: 'green' }}}
                  onClick={() => downloadContract(contract.fileName)}>Download</Button>
              </StyledTableCell>
              <StyledTableCell>
                <Button
                  variant="contained"
                  sx={{ color: 'white', background: '#212121', ':hover': { background: 'red' }}}
                  onClick={() => deleteContract(contract.id)}>Delete</Button>
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

export default ContractsPage;

