import { Paper, Typography } from '@mui/material';
import styles from './error-transaction.module.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* eslint-disable-next-line */
export interface ErrorTransactionProps {}

export function ErrorTransaction(props: ErrorTransactionProps) {
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
        There was an error. Your transaction has failed!
      </Typography>
      <Typography variant="h5" align="center">
        {message}
      </Typography>
    </Paper>
  );
}

export default ErrorTransaction;
