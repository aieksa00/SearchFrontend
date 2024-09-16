import { PSPRoutes, RegisterDto } from '@sep-frontend/models';
import styles from './register-page.module.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button } from '@mui/material';
import { Register } from '@sep-frontend/features/shared/register/data-access';

/* eslint-disable-next-line */
export interface RegisterPageProps {}

export function RegisterPage(props: RegisterPageProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterDto) => {
    await Register(data);
    if (localStorage.getItem('jwt-token') !== null) {
      navigate(PSPRoutes.ChangePaymentOptions);
    }
  };

  return (
    <Paper elevation={8} className={styles.loginContainer}>
      <Typography variant="h4" align="center">
        Register
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${styles.inputContainer} ${errors.firstName ? `${styles.errorBorder}` : ''}`}>
          <input
            type="text"
            id="firstName"
            value={watch('firstName')}
            {...register('firstName', {
              required: 'This field is required.',
            })}
          />
          <label
            className={styles.label}
            htmlFor="firstName"
            id="label-firstName"
          >
            <div className={styles.text}>First Name</div>
          </label>
          <label className={styles.errorLabel}>
            {errors.firstName?.message}
          </label>
        </div>
        
        <div className={`${styles.inputContainer} ${errors.lastName ? `${styles.errorBorder}` : ''}`}>
          <input
            type="text"
            id="lastName"
            value={watch('lastName')}
            {...register('lastName', {
              required: 'This field is required.',
            })}
          />
          <label
            className={styles.label}
            htmlFor="lastName"
            id="label-lastName"
          >
            <div className={styles.text}>Last Name</div>
          </label>
          <label className={styles.errorLabel}>
            {errors.lastName?.message}
          </label>
        </div>

        <div className={`${styles.inputContainer} ${errors.email ? `${styles.errorBorder}` : ''}`}>
          <input
            type="text"
            id="email"
            value={watch('email')}
            {...register('email', {
              required: 'This field is required.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address.',
              },
            })}
          />
          <label
            className={styles.label}
            htmlFor="email"
            id="label-email"
          >
            <div className={styles.text}>email</div>
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
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long.',
              },
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

        <div className={styles.inputContainer}>
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
            Register
          </Button>
        </div>  
      </form>
    </Paper>
  );
}

export default RegisterPage;
