import { SearchRoutes, SearchURL } from '@sep-frontend/models';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './features-search-upload-file-data-access.module.css';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface FeaturesSearchUploadFileDataAccessProps {}

export async function UploadContract(file:any): Promise<any> {
  let formData = new FormData();
  formData.append('file', file)
  console.log(formData)
  
  return await axios({
    method: 'post',
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}`},
    data: formData,
    url: SearchURL.ContractController + `/upload`,
  })
    .then(function (response) {
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
      return false
    });
}

export async function UploadLaw(file:any): Promise<any> {
  let formData = new FormData();
  formData.append('file', file)
  console.log(formData)
  
  return await axios({
    method: 'post',
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}`},
    data: formData,
    url: SearchURL.LawController + `/upload`,
  })
    .then(function (response) {
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
      return false
    });
}

