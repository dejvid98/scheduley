import React from 'react';
import styles from './RegistrationForm.module.scss';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const RegistrationForm = () => {
  return (
    <div className={styles.container}>
      <img src='Logo.svg' alt='logo' />
      <div className={styles.formContainer}>
        <p>Join us today!</p>
        <TextField
          id='outlined-basic'
          label='Username'
          variant='outlined'
          className={styles.input}
        />
        <TextField
          id='outlined-basic'
          label='Password'
          variant='outlined'
          type='password'
          className={styles.input}
        />
        <TextField
          id='outlined-basic'
          label='Confirm Password'
          variant='outlined'
          type='password'
          className={styles.input}
        />
        <div className={styles.checkBox}>
          <Checkbox color='primary' />
          <p>
            I agree to the <a href='#'>terms and conditions</a>
          </p>
        </div>

        <Button
          variant='contained'
          color='primary'
          className={styles.submitButton}
        >
          REGISTER
        </Button>
      </div>
    </div>
  );
};

export default RegistrationForm;
