import {
  TableCell,
  tableCellClasses,
  TableRow,
  TableContainer,
  TableHead,
  Typography,
  TableBody,
  TableFooter,
  Button,
  styled,
} from '@mui/material';
import { useState, useEffect } from 'react';
import styles from './paypal-transactions.module.css';
import { PayPalTransactionDto } from '@sep-frontend/models';
import { GetPayPalTransactions } from '@sep-frontend/features/psp/transactions-view/data-access';

/* eslint-disable-next-line */
export interface PaypalTransactionsProps {}

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

export function PaypalTransactions(props: PaypalTransactionsProps) {
  const [payPalTransactions, setPaypalTransactions] = useState<
  PayPalTransactionDto[]
  >([]);
  const [page, setPage] = useState<number>(1);
  const [allPagesLoaded, setAllPagesLoaded] = useState<boolean>(false);

  const getPayPalTransactions = async () => {
    const response = await GetPayPalTransactions(page, 10);
    if (response.totalPages === page) {
      setAllPagesLoaded(true);
    }
    setPaypalTransactions((prev) => prev.concat(response.items));
  };

  useEffect(() => {
    getPayPalTransactions();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <StyledTableContainer>
      <TableHead>
        <TableRow>
          <StyledTableCell>
            <Typography variant="subtitle1">Order ID</Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography variant="subtitle1">PayPal Order ID</Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography variant="subtitle1">Amount</Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography variant="subtitle1">Payer ID</Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography variant="subtitle1">Created At</Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography variant="subtitle1">Updated At</Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography variant="subtitle1">Status</Typography>
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {payPalTransactions?.map((payPalTransaction, idx) => (
          <StyledTableRow key={idx}>
            <StyledTableCell>{payPalTransaction.orderId}</StyledTableCell>
            <StyledTableCell>{payPalTransaction.paypalOrderId}</StyledTableCell>
            <StyledTableCell>{payPalTransaction.amount}</StyledTableCell>
            <StyledTableCell>{payPalTransaction.payerId}</StyledTableCell>
            <StyledTableCell>
              {payPalTransaction.createdAt.toLocaleString().split('T')[0]}
            </StyledTableCell>
            <StyledTableCell>
              {payPalTransaction.updatedAt?.toLocaleString().split('T')[0]}
            </StyledTableCell>
            <StyledTableCell>{payPalTransaction.status}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
      <TableFooter>
        <StyledTableRow>
          <StyledTableCell align="center">
            <Typography variant="h6" align="center">
              Page {page}
            </Typography>
          </StyledTableCell>

          <StyledTableCell align="center" colSpan={2}>
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
        </StyledTableRow>
      </TableFooter>
    </StyledTableContainer>
  );
}

export default PaypalTransactions;
