import { PSPURL, PaymentOptionsDTO } from "@sep-frontend/models";
import axios from "axios";
import Swal from "sweetalert2";

export async function GetPaymentOptions(apiKey: string): Promise<PaymentOptionsDTO> {
  return await axios({
    method: 'get',
    url: PSPURL.URL + `payment/paymentOptions?ApiKey=${apiKey}`,
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
      return error;
    });
}

export async function GetPaymentOptionsProtected(): Promise<PaymentOptionsDTO> {
  return await axios({
    method: 'get',
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` },
    url: PSPURL.URL + 'payment/paymentOptions/agency',
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
      return error;
    });
}

export async function ChangeCurrentPaymentOptions(paymentOptions: number[]): Promise<Boolean> {
  return await axios({
    method: 'post',
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` },
    url: PSPURL.URL + 'payment/paymentOptions',
    data: { paymentOptions },
  })
    .then(function (response) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Payment options changed successfully',
        showConfirmButton: false,
        position: 'bottom-right',
        timer: 3000,
        timerProgressBar: true,
        backdrop: 'none',
        width: 300,
        background: '#212121',
        color: 'white',
      });
      return true;
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
      return false;
    });
}