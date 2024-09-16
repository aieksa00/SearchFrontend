import { BankTransactionDto, CryptoTransactionDto, PSPURL, PayPalTransactionDto } from "@sep-frontend/models";
import axios from "axios";
import Swal from "sweetalert2";


export interface GetPageOfBankTransactionsResponse {
  transactions: BankTransactionDto[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export async function GetBankTransactions(page: number, size: number): Promise<GetPageOfBankTransactionsResponse> {
  return await axios({
    method: 'get',
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` },
    url: PSPURL.URL + `payment/bank/transactions?Page=${page}&PageSize=${size}`,
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

export interface GetPageOfCryptoTransactionsResponse {
  transactions: CryptoTransactionDto[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export async function GetCryptoTransactions(page: number, size: number): Promise<GetPageOfCryptoTransactionsResponse> {
  return await axios({
    method: 'get',
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` },
    url: PSPURL.URL + `payment/crypto/transactions?Page=${page}&PageSize=${size}`,
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

export interface GetPageOfPayPalTransactionsResponse {
  items: PayPalTransactionDto[];
  pageIndex: number;
  count: number;
  totalPages: number;
}

export async function GetPayPalTransactions(page: number, size: number): Promise<GetPageOfPayPalTransactionsResponse> {
  return await axios({
    method: 'get',
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` },
    url: PSPURL.URL + `payment/paypal/page?Page=${page}&PageSize=${size}`,
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