import { Button, Paper, Typography } from '@mui/material';
import styles from './upload-file.module.css';
import { error } from 'console';
import { watch } from 'fs';
import { Login } from '@sep-frontend/features/shared/login/data-access';
import { LoginDTO, SearchRoutes } from '@sep-frontend/models';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UploadContract, UploadLaw } from '@sep-frontend/features/search/upload-file/data-access';

/* eslint-disable-next-line */
export interface UploadFileProps {
  fileType: string;
}

export function UploadFile(props: UploadFileProps) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data: any) => {
    if (props.fileType === 'Contract') {
      let response = await UploadContract(data.file[0]);

      if (response) {
        navigate(SearchRoutes.Contracts);
      }
    };
    if (props.fileType === 'Law') {
      let response = await UploadLaw(data.file[0]);

      if (response) {
        navigate(SearchRoutes.Laws);
      }
    };
  };

  return (
    <Paper elevation={8} className={styles.uploadContainer}>
      <Typography variant="h4" align="center">
        Upload {props.fileType}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className={styles.inputContainer}>
          <input
            type="file"
            id="file"
            {...register('file', {
              required: 'This field is required.',
            })}
          />
          <label className={styles.label} htmlFor="file" id="label-file">
            <div className={styles.text}>{props.fileType}</div>
          </label>
        </div>

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
          Submit
        </Button>
      </form>
    </Paper >
  );
}

export default UploadFile;
