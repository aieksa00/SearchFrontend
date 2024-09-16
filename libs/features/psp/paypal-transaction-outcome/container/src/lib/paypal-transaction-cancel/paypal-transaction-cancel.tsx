import { Paper, Typography } from '@mui/material';
import styles from './paypal-transaction-cancel.module.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CancelPayment } from '@sep-frontend/features/psp/paypal-transaction-outcome/data-access';

/* eslint-disable-next-line */
export interface PaypalTransactionCancelProps {}

export function PaypalTransactionCancel(props: PaypalTransactionCancelProps) {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenParam = queryParams.get('token');

    CancelPayment(tokenParam!);
  }, [location.search]);

  return (
    <Paper elevation={8} className={styles.container}>
      <Typography variant="h4" align="center">
        Transaction was canceled!
      </Typography>
    </Paper>
  );
}

export default PaypalTransactionCancel;
