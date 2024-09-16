import { LawDto, SearchDto, SearchURL } from "@sep-frontend/models";
import axios from "axios";
import Swal from "sweetalert2";

export interface GetPageOfLawsResponse {
  laws: LawDto[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export async function SearchLaws(dto: SearchDto, page: number, size: number): Promise<GetPageOfLawsResponse> {
  let searchParams = dto.searchParams;
  let radius = dto.radius;
  return await axios({
    method: 'put',
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` },
    data: { searchParams, radius },
    url: SearchURL.LawController + `/search?page=${page}&size=${size}`,
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
      return false;
    });
}

export async function GetAllLaws(page: number, size: number): Promise<GetPageOfLawsResponse> {
  return await axios({
    method: 'get',
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` },
    url: SearchURL.LawController + `/all?page=${page}&size=${size}`,
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

export async function DownloadLaw(fileName: string): Promise<string> {
  return await axios({
    method: 'get',
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` },
    url: SearchURL.LawController + `/download?fileName=${fileName}`,
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

export async function DeleteLaw(id: string): Promise<any> {
  return await axios({
    method: 'delete',
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` },
    url: SearchURL.LawController + `/delete?id=${id}`,
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