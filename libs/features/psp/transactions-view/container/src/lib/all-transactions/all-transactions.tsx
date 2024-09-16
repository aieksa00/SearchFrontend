import { Button } from '@mui/material';
import styles from './all-transactions.module.css';
import { useState } from 'react';
import { BankTransactions } from '../bank-transactions/bank-transactions';
import { CryptoTransactions } from '../crypto-transactions/crypto-transactions';
import PaypalTransactions from '../paypal-transactions/paypal-transactions';

/* eslint-disable-next-line */
export interface AllTransactionsProps {}

export function AllTransactions(props: AllTransactionsProps) {
  const [bankTransactionsSelected, setBankTransactionsSelected] = useState<boolean>(true);
  const [cryptoTransactionsSelected, setCryptoTransactionsSelected] = useState<boolean>(false);
  const [paypalTransactionsSelected, setPaypalTransactionsSelected] = useState<boolean>(false);

  const viewTransactions = async (transactionType: number) => {
    if (transactionType === 1) {
      setBankTransactionsSelected(true);
      setCryptoTransactionsSelected(false);
      setPaypalTransactionsSelected(false);
    } else if (transactionType === 2) {
      setBankTransactionsSelected(false);
      setCryptoTransactionsSelected(true);
      setPaypalTransactionsSelected(false);
    } else if (transactionType === 3) {
      setBankTransactionsSelected(false);
      setCryptoTransactionsSelected(false);
      setPaypalTransactionsSelected(true);
    }
  };

  return (
    <>
    <div className={styles.header}>
      <Button
        variant="contained"
        size="large"
        type="submit"
        sx={{
          color: bankTransactionsSelected ? 'whitesmoke' : '#212121',
          background: bankTransactionsSelected ? '#212121' : 'whitesmoke',
          height: '100%',
          alignSelf: 'center',
          ':hover': bankTransactionsSelected ? { background: 'whitesmoke', color: '#212121' } : { background: '#212121', color: 'whitesmoke' },
        }}
        onClick={() => viewTransactions(1)}
      >
        Bank Transactions
      </Button>
      <Button
        variant="contained"
        size="large"
        type="submit"
        sx={{
          color: cryptoTransactionsSelected ? 'whitesmoke' : '#212121',
          background: cryptoTransactionsSelected ? '#212121' : 'whitesmoke',
          height: '100%',
          alignSelf: 'center',
          ':hover': cryptoTransactionsSelected ? { background: 'whitesmoke', color: '#212121' } : { background: '#212121', color: 'whitesmoke' },
        }}
        onClick={() => viewTransactions(2)}
      >
        Crypto Transactions
      </Button>
      <Button
        variant="contained"
        size="large"
        type="submit"
        sx={{
          color: paypalTransactionsSelected ? 'whitesmoke' : '#212121',
          background: paypalTransactionsSelected ? '#212121' : 'whitesmoke',
          height: '100%',
          alignSelf: 'center',
          ':hover': paypalTransactionsSelected ? { background: 'whitesmoke', color: '#212121' } : { background: '#212121', color: 'whitesmoke' },
        }}
        onClick={() => viewTransactions(3)}
      >
        PayPal Transactions
      </Button>
    </div>
    <div className={styles.transactionsContainer}>
      {bankTransactionsSelected && (
        <BankTransactions />
      )}
      {cryptoTransactionsSelected && (
        <CryptoTransactions />
      )}
      {paypalTransactionsSelected && (
        <PaypalTransactions />
      )}
    </div>
    </>
  );
}

export default AllTransactions;
