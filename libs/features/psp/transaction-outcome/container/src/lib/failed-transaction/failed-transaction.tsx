import { Paper, Typography } from '@mui/material';
import styles from './failed-transaction.module.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

/* eslint-disable-next-line */
export interface FailedTransactionProps {}

export function FailedTransaction(props: FailedTransactionProps) {
  const [message, setMessage] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const messageParam = queryParams.get('message');

    setMessage(messageParam ? messageParam : '');
  }, [location.search]);

  return (
    <Paper elevation={8} className={styles.container}>
      <Typography variant="h4" align="center">
        Your transaction has failed!
      </Typography>
      <Typography variant="h5" align="center">
        {message}
      </Typography>
    </Paper>
  );
}

export default FailedTransaction;
