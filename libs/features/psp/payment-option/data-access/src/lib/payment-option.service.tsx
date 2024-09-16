import { AgencyWalletDTO, PSPURL } from "@sep-frontend/models";
import axios from "axios";
import Swal from "sweetalert2";


export async function GetPaymentURL(apiKey: string, amount: number, orderId: string, timestamp: Date, paymentType: number): Promise<string> {
  return await axios({
    method: 'get',
    url: PSPURL.URL + `payment/paymentURL?ApiKey=${apiKey}&Amount=${amount}&OrderId=${orderId}&Timestamp=${timestamp.toISOString()}&PaymentType=${paymentType}`,
  })
    .then(function (response) {
      return response.data.paymentURL;
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong, please try again',
        showConfirmButton: false,
        position: 'bottom-right',
        timer: 3000,
        timerProgressBar: true,
        backdrop: 'none',
        width: 300,
        background: '#212121',
        color: 'white',
      });
      return error;
    });
}

export async function PingPayPalService(): Promise<void> {
  await axios({
    method: 'get',
    url: `${PSPURL.URL}weather/ping/paypal?Days=5&BottomTemperature=10&TopTemperature=25`,
  })
    .then(function (response) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Payment successful',
        showConfirmButton: false,
        position: 'bottom-right',
        timer: 3000,
        timerProgressBar: true,
        backdrop: 'none',
        width: 300,
        background: '#212121',
        color: 'white',
      });
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong, please try again',
        showConfirmButton: false,
        position: 'bottom-right',
        timer: 3000,
        timerProgressBar: true,
        backdrop: 'none',
        width: 300,
        background: '#212121',
        color: 'white',
      });
    });
}

export async function RequestNewPayPalPayment(apiKey: string, amount: number, orderId: string): Promise<any> {
  return await axios({
    method: 'post',
    url: `${PSPURL.URL}payment/paypal/new`,
    data: {
      apiKey: apiKey,
      amount: amount,
      orderId: orderId,
    },
  })
    .then(function (response) {
      return response.data.redirectUrl;
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong, please try again',
        showConfirmButton: false,
        position: 'bottom-right',
        timer: 3000,
        timerProgressBar: true,
        backdrop: 'none',
        width: 300,
        background: '#212121',
        color: 'white',
      });
    });
}

export async function GetAgencyWalletId(apiKey: string, amount: number, orderId: string, timestamp: Date, paymentType: number): Promise<AgencyWalletDTO> {
 return await axios({
    method: 'get',
    url: PSPURL.URL + `payment/crypto/agencyWallet?ApiKey=${apiKey}&Amount=${amount}&OrderId=${orderId}&Timestamp=${timestamp.toISOString()}&PaymentType=${paymentType}`,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong, please try again',
        showConfirmButton: false,
        position: 'bottom-right',
        timer: 3000,
        timerProgressBar: true,
        backdrop: 'none',
        width: 300,
        background: '#212121',
        color: 'white',
      });
    });
}
