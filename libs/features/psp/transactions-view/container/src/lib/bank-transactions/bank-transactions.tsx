import { useEffect, useState } from 'react';
import styles from './bank-transactions.module.css';
import {
  TableContainer,
  Paper,
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
import { BankTransactionDto } from '@sep-frontend/models';
import { GetBankTransactions } from '@sep-frontend/features/psp/transactions-view/data-access';

/* eslint-disable-next-line */
export interface BankTransactionsProps {}

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

export function BankTransactions(props: BankTransactionsProps) {
  const [bankTransactions, setBankTransactions] = useState<
    BankTransactionDto[]
  >([]);
  const [page, setPage] = useState<number>(1);
  const [allPagesLoaded, setAllPagesLoaded] = useState<boolean>(false);

  const getBankTransactions = async () => {
    const response = await GetBankTransactions(page, 10);
    if (response.totalPages === page) {
      setAllPagesLoaded(true);
    }
    setBankTransactions((prev) => prev.concat(response.transactions));
  };

  useEffect(() => {
    getBankTransactions();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const getStatusText = (status: number) => {
    if (status === 0) {
      return 'Pending';
    } else if (status === 1) {
      return 'Success';
    } else if (status === 2) {
      return 'Failed';
    } else if (status === 3) {
      return 'Error';
    } else {
      return 'Unknown';
    }
  };

  return (
    <StyledTableContainer>
      <TableHead>
        <TableRow>
          <StyledTableCell>
            <Typography variant="subtitle1">Merchant Order ID</Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography variant="subtitle1">Merchant Timestamp</Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography variant="subtitle1">Amount</Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography variant="subtitle1">Acquirer Order ID</Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography variant="subtitle1">Acquirer Timestamp</Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography variant="subtitle1">Payment ID</Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography variant="subtitle1">Status</Typography>
          </StyledTableCell>        
        </TableRow>
      </TableHead>
      <TableBody>
        {bankTransactions?.map((bankTransaction, idx) => (
          <StyledTableRow key={idx}>
            <StyledTableCell>{bankTransaction.merchantOrderId}</StyledTableCell>
            <StyledTableCell>
              {bankTransaction.merchantTimestamp.toLocaleString().split('T')[0]}
            </StyledTableCell>
            <StyledTableCell>{bankTransaction.amount}</StyledTableCell>
            <StyledTableCell>{bankTransaction.acquirerOrderId}</StyledTableCell>
            <StyledTableCell>
              {
                bankTransaction.acquirerTimestamp
                  ?.toLocaleString()
                  .split('T')[0]
              }
            </StyledTableCell>
            <StyledTableCell>{bankTransaction.paymentId}</StyledTableCell>
            <StyledTableCell>
              {getStatusText(bankTransaction.status)}
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <StyledTableCell align="center">
            <Typography variant="h6" align="center">
              Page {page}
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
  );
}

export default BankTransactions;
