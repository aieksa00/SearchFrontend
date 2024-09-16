import { PaymentOption } from '@sep-frontend/features/psp/payment-option/container';
import styles from './change-payment-options.module.css';
import { GetPaymentOptionsProtected } from '@sep-frontend/features/psp/select-payment-options/data-access';
import { PaymentOptionType, PaymentOptionsDTO } from '@sep-frontend/models';
import { useState, useEffect } from 'react';

/* eslint-disable-next-line */
export interface ChangePaymentOptionsProps {}

export function ChangePaymentOptions(props: ChangePaymentOptionsProps) {
  const [subscribedPaymentOptions, setSubscribedPaymentOptions] = useState<PaymentOptionsDTO>();
  const [reload, setReload] = useState<boolean>(false);
  const allPaymentOptions = [ PaymentOptionType.CreditCard, PaymentOptionType.QRCode, PaymentOptionType.PayPal, PaymentOptionType.Crypto ];

  const getPaymentOptions = async () => {
    if (!localStorage.getItem('jwt-token')) {
      return;
    }
    const response = await GetPaymentOptionsProtected();    
    console.log(response);
    setSubscribedPaymentOptions(response);
  };

  useEffect(() => {
    getPaymentOptions();
  }, [reload]);

  const handleReload = () => {
    setReload(!reload);
  };

  return (
    <div className={styles.paymentOptionGrid}>
      {allPaymentOptions?.map((paymentOption) => (
        <PaymentOption
          isEditView={true}
          paymentOptionType={paymentOption}
          isBought={subscribedPaymentOptions?.paymentOptions.includes(paymentOption)}
          allSubscribedPaymentOptions={subscribedPaymentOptions?.paymentOptions}
          reloadParent={handleReload}
        />
      ))}
    </div>
  );
}

export default ChangePaymentOptions;
