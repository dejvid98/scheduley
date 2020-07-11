import React, { useState, useEffect } from 'react';
import Navbar from '../Layout/Navbar';
import styles from './Dashboard.module.scss';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Calendar from './Calendar';
import Event from './Event';

const Dashboard = () => {
  const [token, setToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [event, setEvent] = useState();

  const history = useHistory();

  const handleEvent = (date) => setEvent(date);

  const logOut = async () => {
    setIsLoggedIn(false);
    await Cookies.remove('JWT');
    history.push('/');
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const getToken = async () => {
      const cookie = await Cookies.get('JWT');
      if (!cookie) history.push('/');
      else {
        jwt.verify(cookie, 'secretToken', async (err, decoded) => {
          setToken(decoded);
        });
        setIsLoggedIn(true);
      }
    };
    getToken();
  }, []);
  return (
    <div className={styles.container}>
      <Navbar isloggedin={isLoggedIn} logout={logOut} />
      <div className={styles.innerContainer}>
        <Calendar />
        <div className={styles.interface}>
          <h3>
            Welcome back, {token ? capitalizeFirstLetter(token.username) : null}
          </h3>
          <Event event={event} handleEvent={handleEvent} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
