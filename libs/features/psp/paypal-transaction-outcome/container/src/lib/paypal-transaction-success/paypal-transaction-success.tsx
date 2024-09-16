import { Paper, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './paypal-transaction-success.module.css';
import { ConfirmPayment } from '@sep-frontend/features/psp/paypal-transaction-outcome/data-access';

/* eslint-disable-next-line */
export interface PaypalTransactionSuccessProps {}

export function PaypalTransactionSuccess(props: PaypalTransactionSuccessProps) {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenParam = queryParams.get('token');
    const payerIdParam = queryParams.get('PayerID');

    ConfirmPayment(tokenParam!, payerIdParam!);
  }, [location.search]);

  return (
    <Paper elevation={8} className={styles.container}>
      <Typography variant="h4" align="center">
        Your transaction was successfull!
      </Typography>
    </Paper>
  );
}

export default PaypalTransactionSuccess;
