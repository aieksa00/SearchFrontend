/* eslint-disable @nx/enforce-module-boundaries */
import { useState } from 'react';
import styles from './login-page.module.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Paper, Typography } from '@mui/material';
import { LoginDTO, SearchRoutes } from '@sep-frontend/models';
import { Login } from '@sep-frontend/features/shared/login/data-access';

/* eslint-disable-next-line */
export interface LoginPageProps {}

export function LoginPage(props: LoginPageProps) {
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginDTO) => {
    await Login(data.email, data.password);
    if (localStorage.getItem('jwt-token') !== null) {
      navigate(SearchRoutes.Contracts);
    } 
    else {
      setError('Wrong credentials');
    }
  };

  return (
    
    <Paper elevation={8} className={styles.loginContainer}>
      <Typography variant="h4" align="center">
        Log in
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${styles.inputContainer} ${errors.email ? `${styles.errorBorder}` : ''}`}>
          <input
            type="text"
            id="email"
            value={watch('email')}
            {...register('email', {
              required: 'This field is required.',
            })}
          />
          <label
            className={styles.label}
            htmlFor="email"
            id="label-email"
          >
            <div className={styles.text}>Email</div>
          </label>
          <label className={styles.errorLabel}>
            {errors.email?.message}
          </label>
        </div>

        <div className={`${styles.inputContainer} ${errors.password ? `${styles.errorBorder}` : ''}`}>
          <input
            type="password"
            id="password"
            value={watch('password')}
            {...register('password', {
              required: 'This field is required.',
            })}
          />
          <label
            className={styles.label}
            htmlFor="password"
            id="label-password"
          >
            <div className={styles.text}>Password</div>
          </label>
          <label className={styles.errorLabel}>
            {errors.password?.message}
          </label>
        </div>

        <div
          className={styles.inputContainer}
        >
          <Button
            variant="contained"
            size="large"
            type="submit"
            sx={{
              color: 'white',
              background: '#212121',
              height: '46px',
              width: '40%',
              alignSelf: 'center',
              ':hover': { background: 'whitesmoke', color: '#212121' },
            }}
          >
            Login
          </Button>
          <Typography variant="subtitle1" color={'red'} align="center">
          {error}
        </Typography>
        </div>  
      </form>
    </Paper>
  );
}

export default LoginPage;
