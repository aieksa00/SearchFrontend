import { Button, Paper, Typography } from '@mui/material';
import styles from './payment-option.module.css';
import { PSPRoutes, PaymentOptionType } from '@sep-frontend/models';
import {
  GetAgencyWalletId,
  GetPaymentURL,
  RequestNewPayPalPayment,
} from '@sep-frontend/features/psp/payment-option/data-access';
import { useNavigate } from 'react-router-dom';
import { ChangeCurrentPaymentOptions } from '@sep-frontend/features/psp/select-payment-options/data-access';
//import { GetPaymentURL } from '@sep-frontend/features/psp/payment-option/data-access';

/* eslint-disable-next-line */
export interface PaymentOptionProps {
  isEditView: boolean;
  paymentOptionType: PaymentOptionType;
  
  isBought?: boolean;
  allSubscribedPaymentOptions?: PaymentOptionType[];
  reloadParent?: () => void;

  amount?: number;
  apiKey?: string;
  orderId?: string;
  timestamp?: Date;
}

export function PaymentOption(props: PaymentOptionProps) {
  const navigate = useNavigate();

  const getPaymentOptionName = () => {
    if (props.paymentOptionType === PaymentOptionType.CreditCard) {
      return 'Credit card';
    } else if (props.paymentOptionType === PaymentOptionType.QRCode) {
      return 'QR code';
    } else if (props.paymentOptionType === PaymentOptionType.PayPal) {
      return 'PayPal';
    } else if (props.paymentOptionType === PaymentOptionType.Crypto) {
      return 'Ethereum';
    } else {
      return 'Unknown payment option';
    }
  };

  const getPaymentOptionDescription = () => {
    if (props.paymentOptionType === PaymentOptionType.CreditCard) {
      return 'Pay with your credit card';
    } else if (props.paymentOptionType === PaymentOptionType.QRCode) {
      return 'Pay with your QR code';
    } else if (props.paymentOptionType === PaymentOptionType.PayPal) {
      return 'Pay with your PayPal account';
    } else if (props.paymentOptionType === PaymentOptionType.Crypto) {
      return 'Pay with your Ethereum wallet';
    } else {
      return 'Unknown payment option';
    }
  };

  const selectPaymentOption = async () => {
    if (props.paymentOptionType === PaymentOptionType.CreditCard) {
      const paymentUrl = await GetPaymentURL(
        props.apiKey!,
        props.amount!,
        props.orderId!,
        props.timestamp!,
        1
      );
      if (paymentUrl) {
        window.open(paymentUrl, '_blank');
      }
    } else if (props.paymentOptionType === PaymentOptionType.QRCode) {
      const paymentUrl = await GetPaymentURL(
        props.apiKey!,
        props.amount!,
        props.orderId!,
        props.timestamp!,
        2
      );
      if (paymentUrl) {
        window.open(paymentUrl, '_blank');
      }
    } else if (props.paymentOptionType === PaymentOptionType.PayPal) {
      const paymentUrl = await RequestNewPayPalPayment(
        props.apiKey!,
        props.amount!,
        props.orderId!
      );
      if (paymentUrl) {
        window.open(paymentUrl, '_blank');
      }
    } else if (props.paymentOptionType === PaymentOptionType.Crypto) {
      const agencyWalletDTO = await GetAgencyWalletId(
        props.apiKey!,
        props.amount!,
        props.orderId!,
        props.timestamp!,
        3
      );
      if (agencyWalletDTO) {
        navigate(
          `${PSPRoutes.PaymentCrypto}?agencyWalletId=${agencyWalletDTO.walletId}&amount=${agencyWalletDTO.amount}&cryptoTransactionId=${agencyWalletDTO.cryptoTransactionId}`
        );
      }
    } else {
      console.log('Unknown payment option');
    }
  };

  const subscribe = async () => {
    const res = await ChangeCurrentPaymentOptions([...props.allSubscribedPaymentOptions!, props.paymentOptionType]);
    if (res && props.reloadParent) {
        props.reloadParent();
    }
  };

  const unsubscribe = async () => {
    const res = await ChangeCurrentPaymentOptions(
      props.allSubscribedPaymentOptions!.filter((paymentOption) => paymentOption !== props.paymentOptionType)
    );
    if (res && props.reloadParent) {
      props.reloadParent();
    }
  };

  return (
    <Paper elevation={8} className={styles.paymentOptionContainer}>
      <Typography variant="h4" align="center">
        {getPaymentOptionName()}
      </Typography>
      {!props.isEditView && (
        <>
          <Typography variant="h6" align="center">
            {getPaymentOptionDescription()}
          </Typography>
          <Button
            variant="contained"
            size="large"
            type="submit"
            sx={{
              color: 'white',
              background: '#212121',
              height: '46px',
              width: '40%',
              alignSelf: 'center',
              ':hover': { background: 'whitesmoke', color: '#212121' },
            }}
            onClick={() => selectPaymentOption()}
          >
            Select
          </Button>
        </>
      )}
      {props.isEditView && props.isBought && (
        <>
          <Typography variant="h6" align="center">
            <Typography variant="h6" align="center">Your Agency is Subscribed to this payment type</Typography>
          </Typography>
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
              ':hover': { background: 'red' },
            }}
            onClick={() => unsubscribe()}
          >
            Unsubscribe
          </Button>
        </>
      )}
      {props.isEditView && !props.isBought && (
        <>
          <Typography variant="h6" align="center">
            <Typography variant="h6" align="center">Your Agency is Not Subscribed to this payment type</Typography>
          </Typography>
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
              ':hover': { background: 'green' },
            }}
            onClick={() => subscribe()}
          >
            Subscribe now
          </Button>
        </>
      )}
    </Paper>
  );
}

export default PaymentOption;
