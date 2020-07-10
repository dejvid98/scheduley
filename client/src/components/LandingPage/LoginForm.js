import React, { useState } from 'react';
import styles from './RegistrationForm.module.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import httpReq from '../../Util/HTTP';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const formValidation = async () => {
    if (!username) {
      setError('Please enter a valid username');
      setTimeout(() => setError(''), 5000);
      setUsernameError(true);
      return false;
    }

    if (!password || password.length < 8) {
      setError('Please enter a valid password');
      setTimeout(() => setError(''), 5000);
      setPasswordError(true);
      return false;
    }

    return true;
  };

  const handleRegistration = async () => {
    if (formValidation()) {
      try {
        const response = await httpReq.post('/login', {
          username,
          password,
        });

        if (!response.data.status) {
          setError(response.data.message);
          setPasswordError(true);
          return;
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <img src='Logo.svg' alt='logo' />
      <div className={styles.formContainer}>
        <p>Join us today!</p>
        {error ? (
          <Alert severity='error' className={styles.error}>
            {error}
          </Alert>
        ) : null}

        <TextField
          id='outlined-basic'
          label='Username'
          variant='outlined'
          error={usernameError}
          className={styles.input}
          value={username}
          onChange={(e) => {
            setError('');
            setUsernameError(false);
            setUsername(e.target.value);
          }}
        />
        <TextField
          id='outlined-basic'
          label='Password'
          variant='outlined'
          error={passwordError}
          type='password'
          className={styles.input}
          value={password}
          onChange={(e) => {
            setError('');
            setPasswordError(false);
            setPassword(e.target.value);
          }}
        />

        <Button
          variant='contained'
          color='primary'
          className={styles.submitButton}
          onClick={handleRegistration}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
