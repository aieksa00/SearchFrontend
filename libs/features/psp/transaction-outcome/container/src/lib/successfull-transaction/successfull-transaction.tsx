import { Paper, Typography } from '@mui/material';
import styles from './successfull-transaction.module.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

/* eslint-disable-next-line */
export interface SuccessfullTransactionProps {}

export function SuccessfullTransaction(props: SuccessfullTransactionProps) {
  const [message, setMessage] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const messageParam = queryParams.get('message');
    const amountParam = queryParams.get('amount');

    setMessage(messageParam ? messageParam : '');
    setAmount(amountParam ? parseFloat(amountParam.replace(",", ".")) : 0);
  }, [location.search]);

  return (
    <Paper elevation={8} className={styles.container}>
      <Typography variant="h4" align="center">
        Your transaction was successfull!
      </Typography>
      <Typography variant="h5" align="center">
        {message}
      </Typography>
      <Typography variant="h5" align="center">
        You have spent: {amount} RSD
      </Typography>
    </Paper>
  );
}

export default SuccessfullTransaction;
