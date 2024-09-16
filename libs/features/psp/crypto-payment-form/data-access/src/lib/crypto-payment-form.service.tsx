import { PSPURL } from "@sep-frontend/models";
import axios from "axios";
import Swal from "sweetalert2";

interface MakeCryptoTransactionResponse {
  status: number;
  cryptoTransactionId: string;
}

export async function MakeCryptoTransaction(cryptoTransactionId: number, transactionHash: string, buyerWalletId: string, status: number ): Promise<MakeCryptoTransactionResponse> {
  return await axios({
    method: 'put',
    url: PSPURL.URL + 'payment/crypto/transaction',
    data: { cryptoTransactionId, transactionHash, buyerWalletId, status },
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong, please try again' + error.response.data.title,
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
