import { AgencyWalletDTO, PSPURL } from "@sep-frontend/models";
import axios from "axios";
import Swal from "sweetalert2";


export async function ConfirmPayment(token: string, payerId: string): Promise<any> {
  return await axios({
    method: 'get',
    url: PSPURL.URL + `payment/paypal/confirm?token=${token}&PayerID=${payerId}`,
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

export async function CancelPayment(token: string): Promise<any> {
  return await axios({
    method: 'get',
    url: PSPURL.URL + `payment/paypal/cancel?token=${token}`,
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
