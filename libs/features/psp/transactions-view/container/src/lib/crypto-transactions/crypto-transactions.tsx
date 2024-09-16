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
import { useState, useEffect } from 'react';
import styles from './crypto-transactions.module.css';
import { CryptoTransactionDto } from '@sep-frontend/models';
import { GetCryptoTransactions } from '@sep-frontend/features/psp/transactions-view/data-access';

/* eslint-disable-next-line */
export interface CryptoTransactionsProps {}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#212121',
    color: 'whitesmoke',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
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

export function CryptoTransactions(props: CryptoTransactionsProps) {
  const [cryptoTransactions, setCryptoTransactions] = useState<CryptoTransactionDto[]>([]);
  const [page, setPage] = useState<number>(1);
  const [allPagesLoaded, setAllPagesLoaded] = useState<boolean>(false);

  const getCryptoTransactions = async () => {
    const response = await GetCryptoTransactions(page, 10);
    if (response.totalPages === page) {
      setAllPagesLoaded(true);
    }
    setCryptoTransactions((prev) => prev.concat(response.transactions));
  };

  useEffect(() => {
    getCryptoTransactions();
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
    }else if (status === 3) {
      return 'Error';
    } 
    else {
      return 'Unknown';
    }
  }

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
            <Typography variant="subtitle1">Transaction Hash</Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography variant="subtitle1">Amount</Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography variant="subtitle1">Agency Wallet ID</Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography variant="subtitle1">Buyer Wallet ID</Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography variant="subtitle1">Status</Typography>
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cryptoTransactions?.map((cryptoTransaction, idx) => (
          <StyledTableRow key={idx}>
            <StyledTableCell>
              {cryptoTransaction.merchantOrderId}
            </StyledTableCell>
            <StyledTableCell>
              {
                cryptoTransaction.merchantTimestamp
                  .toLocaleString()
                  .split('T')[0]
              }
            </StyledTableCell>
            <StyledTableCell>
              {cryptoTransaction.transactionHash}
            </StyledTableCell>
            <StyledTableCell>{cryptoTransaction.amount}</StyledTableCell>
            <StyledTableCell>
              {cryptoTransaction.agencyWalletId}
            </StyledTableCell>
            <StyledTableCell>{cryptoTransaction.buyerWalletId}</StyledTableCell>
            <StyledTableCell>{getStatusText(cryptoTransaction.status)}</StyledTableCell>
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

export default CryptoTransactions;
