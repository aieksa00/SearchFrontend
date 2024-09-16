import { ContractDto, SearchDto, SearchURL } from "@sep-frontend/models";
import axios from "axios";
import Swal from "sweetalert2";

export interface GetPageOfContractsResponse {
  contracts: ContractDto[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export async function SearchContracts(dto: SearchDto, page: number, size: number): Promise<GetPageOfContractsResponse> {
  let searchParams = dto.searchParams;
  let radius = dto.radius;
  return await axios({
    method: 'put',
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` },
    data: { searchParams, radius },
    url: SearchURL.ContractController + `/search?page=${page}&size=${size}`,
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

export async function GetAllContracts(page: number, size: number): Promise<GetPageOfContractsResponse> {
  return await axios({
    method: 'get',
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` },
    url: SearchURL.ContractController + `/all?page=${page}&size=${size}`,
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

export async function DownloadContract(fileName: string): Promise<string> {
  return await axios({
    method: 'get',
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` },
    url: SearchURL.ContractController + `/download?fileName=${fileName}`,
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

export async function DeleteContract(id: string): Promise<any> {
  return await axios({
    method: 'delete',
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` },
    url: SearchURL.ContractController + `/delete?id=${id}`,
  })
    .then(function (response) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Law deleted successfully',
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
    });
}