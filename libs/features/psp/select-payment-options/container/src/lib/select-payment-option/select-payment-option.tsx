import styles from './select-payment-option.module.css';
import { useEffect, useState } from 'react';
import { PaymentOption } from '@sep-frontend/features/psp/payment-option/container';
import { useLocation } from 'react-router-dom';
import { PaymentOptionsDTO } from '@sep-frontend/models';
import { GetPaymentOptions } from '@sep-frontend/features/psp/select-payment-options/data-access';

/* eslint-disable-next-line */
export interface SelectPaymentOptionProps {}

export function SelectPaymentOption(props: SelectPaymentOptionProps) {
  const [paymentOptions, setPaymentOptions] = useState<PaymentOptionsDTO>();
  const [amount, setAmount] = useState(0);
  const [apiKey, setApiKey] = useState('');
  const [orderId, setOrderId] = useState('');
  const [timestamp, setTimestamp] = useState(new Date());

  const location = useLocation();

  const getPaymentOptions = async (apiKey: string | null) => {
    if (!apiKey) {
      return;
    }
    const response = await GetPaymentOptions(apiKey);    
    setPaymentOptions(response);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const amountParam = queryParams.get('amount');
    const apiKeyParam = queryParams.get('apiKey');
    const orderIdParam = queryParams.get('orderId');
    const timestampParam = queryParams.get('timestamp');

    setAmount(amountParam ? parseFloat(amountParam.replace(",", ".")) : 0);
    setApiKey(apiKeyParam ? apiKeyParam : '');
    setOrderId(orderIdParam ? orderIdParam : '');
    setTimestamp(timestampParam ? new Date(timestampParam) : new Date());
    
    getPaymentOptions(apiKeyParam);
  }, []);

  return (
    <div className={styles.paymentOptionGrid}>
      {paymentOptions?.paymentOptions.map((paymentOption) => (
        <PaymentOption
          isEditView={false}
          paymentOptionType={paymentOption}
          amount={amount}
          apiKey={apiKey}
          orderId={orderId}
          timestamp={timestamp}
        />
      ))}
    </div>
  );
}

export default SelectPaymentOption;
