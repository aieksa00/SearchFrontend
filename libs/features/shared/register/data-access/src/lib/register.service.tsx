import { SearchURL, RegisterDto } from "@sep-frontend/models";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

export async function Register(data: RegisterDto): Promise<String> {
  const firstName = data.firstName;
  const lastName = data.lastName;
  const email = data.email;
  const password = data.password;

  return await axios({
    method: 'post',
    url: SearchURL.UserController + '/register',
    data: { firstName, lastName, email, password},
  })
    .then(function (response) {
      const token: string = response.data;
      localStorage.setItem('jwt-token', token);
      const decodedToken: any = jwtDecode(token);
      const email = decodedToken.sub;
      localStorage.setItem('Email', email);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'You have successfully registered',
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
      return error;
    });
}
