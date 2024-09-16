import { SearchURL } from "@sep-frontend/models";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import Swal from "sweetalert2";


export async function Login(email: string, password: string): Promise<String> {
  return await axios({
    method: 'post',
    url: SearchURL.UserController + '/login',
    data: { email, password },
  })
    .then(function (response) {
      const token: string = response.data;
      localStorage.setItem('jwt-token', token);
      const decodedToken: any = jwtDecode(token);
      //console.log(decodedToken);
      const email = decodedToken.sub;
      localStorage.setItem('Email', email);
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