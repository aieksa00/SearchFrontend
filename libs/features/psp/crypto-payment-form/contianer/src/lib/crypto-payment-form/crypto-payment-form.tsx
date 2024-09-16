/* eslint-disable @nx/enforce-module-boundaries */
import { Paper, Typography, Button } from '@mui/material';
import { PSPRoutes } from '@sep-frontend/models';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './crypto-payment-form.module.css';
import { TransactionResponse, ethers } from 'ethers';
import { MakeCryptoTransaction } from '@sep-frontend/features/psp/crypto-payment-form/data-access';

/* eslint-disable-next-line */
export interface CryptoPaymentFormProps {}

export function CryptoPaymentForm(props: CryptoPaymentFormProps) {
  const [error, setError] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [agencyWalletId, setAgencyWalletId] = useState<string>('');
  const [cryptoTransactionId, setCryptoTransactionId] = useState<number>(-1);

  const navigate = useNavigate();

  const onSubmit = async (event:any) => {
    event.preventDefault();
    if (!window.ethereum) {
      setError('Please install Metamask');
      return;
    }
    await window.ethereum.send('eth_requestAccounts');

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    try {
      ethers.getAddress(agencyWalletId);
    } catch (error: any) {
      if (error.code === 'INVALID_ARGUMENT') {
        setError('Invalid address');
        return;
      } else {
        setError(error.message);
        return;
      }
    }

    let oneETHinUSD = -1;
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      );
      oneETHinUSD = await response.json().then((data) => {
        return data.ethereum.usd;
      });
    } catch (error: any) {
      await MakeCryptoTransaction(cryptoTransactionId, '', '', 3);
      navigate(`${PSPRoutes.TransactionError}?message=Unable to get ETH price`);
      return;
    }

    const ethAmount = ethers.parseEther((amount / oneETHinUSD).toString()); //Is this correct?

    try {
      const tx: TransactionResponse = await signer.sendTransaction({
        to: agencyWalletId,
        value: ethAmount,
      });
      const res = await MakeCryptoTransaction(
        cryptoTransactionId,
        tx.hash,
        tx.from,
        1
      );
      if (res.status === 1) {
        navigate(`${PSPRoutes.TransactionSuccess}?message=Transaction successful&amount=${amount}`);
        return;
      }
      else {
        setError("Something went wrong. PSP did not save your transaction.");
        return;
      }
    } catch (error: any) {
      if (error.code === 'INSUFFICIENT_FUNDS') {
        await MakeCryptoTransaction(cryptoTransactionId, '', '', 2);
        navigate(`${PSPRoutes.TransactionFailed}?message=Insufficient funds`);
        return;
      } else if (error.code === 'ACTION_REJECTED') {
        await MakeCryptoTransaction(cryptoTransactionId, '', '', 2);
        navigate(`${PSPRoutes.TransactionFailed}?message=Transaction rejected.`);
        return;
      }
       else {
        await MakeCryptoTransaction(cryptoTransactionId, '', '', 3);
        navigate(`${PSPRoutes.TransactionError}?message=Unexpected error.`);
        return;
      }
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const amountParam = queryParams.get('amount');
    const cryptoTransactionIdParam = queryParams.get('cryptoTransactionId');
    const agencyWalletIdParam = queryParams.get('agencyWalletId');

    setAmount(amountParam ? parseFloat(amountParam.replace(',', '.')) : 0);
    setCryptoTransactionId(
      cryptoTransactionIdParam ? +cryptoTransactionIdParam : -1
    );
    setAgencyWalletId(agencyWalletIdParam ? agencyWalletIdParam : '');
  }, [location.search]);

  return (
    <Paper elevation={8} className={styles.loginContainer}>
      <Typography variant="h4" align="center">
        Crypto Payment
      </Typography>

      <form onSubmit={ onSubmit }>
        <div className={styles.inputContainer}>
          <input type="text" id="agencyWalletId" disabled={true} value={agencyWalletId} />
          <label
            className={styles.label}
            htmlFor="agencyWalletId"
            id="label-agencyWalletId"
          >
            <div className={styles.text}>Seller Wallet Id</div>
          </label>
        </div>

        <div className={styles.inputContainer}>
          <input type="number" id="usdAmount" disabled={true} value={amount} />
          <label
            className={styles.label}
            htmlFor="usdAmount"
            id="label-usdAmount"
          >
            <div className={styles.text}>USD Amount</div>
          </label>
        </div>

        <div className={styles.inputContainer}>
          <Button
            variant="contained"
            size="large"
            type="submit"
            sx={{
              color: 'white',
              background: '#212121',
              height: '46px',
              width: '60%',
              alignSelf: 'center',
              ':hover': { background: 'whitesmoke', color: '#212121' },
            }}
          >
            Pay And Convert to ETH
          </Button>
          <Typography variant="subtitle1" color={'red'} align="center">
            {error}
          </Typography>
        </div>
      </form>
    </Paper>
  );
}

export default CryptoPaymentForm;
