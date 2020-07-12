// Libraries imports
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

// Relative imports
import styles from './RegistrationForm.module.scss';
import httpReq from '../../Util/HTTP';

const LoginForm = ({ setislogging }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState();
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const history = useHistory();

  // Alows user to submit form with enter key
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // Performs input validation
  const formValidation = () => {
    if (username.length < 3) {
      setError('Please enter a valid username');
      setTimeout(() => setError(''), 5000);
      setUsernameError(true);
      return;
    }

    if (password.length < 8) {
      setError('Please enter a valid password');
      setTimeout(() => setError(''), 5000);
      setPasswordError(true);
      return;
    }

    return true;
  };

  const handleLogin = async () => {
    if (formValidation()) {
      try {
        const response = await httpReq.post('/login', {
          username: username.toLocaleLowerCase(),
          password,
        });

        if (!response.data.status) {
          setError(response.data.message);
          setPasswordError(true);
          return;
        }

        Cookies.set('JWT', response.data.token);
        setToken(response.data.token);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    const getToken = async () => {
      const cookie = await Cookies.get('JWT');
      if (cookie) history.push('/dashboard');
    };
    getToken();
    console.log('hi');
  }, [token, history]);

  return (
    <div className={styles.container}>
      <img src='Logo.svg' alt='logo' />
      <div className={styles.formContainer}>
        <p>Welcome back!</p>
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
          onKeyDown={handleEnter}
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
          onKeyDown={handleEnter}
          value={password}
          onChange={(e) => {
            setError('');
            setPasswordError(false);
            setPassword(e.target.value);
          }}
        />

        <p className={styles.registerLoginText}>
          Don't have an account?
          <span onClick={() => setislogging()}> Sign up</span>
        </p>

        <Button
          variant='contained'
          color='primary'
          className={styles.submitButton}
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
