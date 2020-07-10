import React, { useState, useEffect } from 'react';
import styles from './RegistrationForm.module.scss';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import httpReq from '../../Util/HTTP';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

const RegistrationForm = ({ setislogging, setCookie }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState({});
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tos, setTos] = useState(false);
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const history = useHistory();

  const formValidation = async () => {
    if (!username) {
      setError('Please enter a valid username');
      setTimeout(() => setError(''), 5000);
      setUsernameError(true);
      return false;
    }

    if (!password || !confirmPassword || password.length < 8) {
      setError('Please enter a valid password');
      setTimeout(() => setError(''), 5000);
      setPasswordError(true);
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords are not matching');
      setTimeout(() => setError(''), 5000);
      setPasswordError(true);
      return false;
    }

    if (!tos) {
      setError('Please accept terms & conditions');
      setTimeout(() => setError(''), 5000);
      return false;
    }
    return true;
  };

  const handleRegistration = async () => {
    if (formValidation()) {
      try {
        const response = await httpReq.post('/register', {
          username,
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
  }, [token]);

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
        <TextField
          id='outlined-basic'
          label='Confirm Password'
          variant='outlined'
          type='password'
          className={styles.input}
          error={passwordError}
          value={confirmPassword}
          onChange={(e) => {
            setError('');
            setPasswordError(false);
            setConfirmPassword(e.target.value);
          }}
        />
        <div className={styles.checkBox}>
          <Checkbox
            color='primary'
            checked={tos}
            onClick={() => setTos(!tos)}
          />
          <p>
            {/* eslint-disable-next-line */}I agree to the
            <a href='#'> terms and conditions</a>
          </p>
        </div>

        <p className={styles.registerLoginText}>
          Already have an account?
          <span onClick={() => setislogging()}> Sign in</span>
        </p>

        <Button
          variant='contained'
          color='primary'
          className={styles.submitButton}
          onClick={handleRegistration}
        >
          REGISTER
        </Button>
      </div>
    </div>
  );
};

export default RegistrationForm;
