import React, { useState, useEffect } from 'react';
import Navbar from '../Layout/Navbar';
import styles from './Dashboard.module.scss';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Calendar from './Calendar';
import Event from './Event';
import moment from 'moment';
import httpRequest from '../../Util/HTTP';

const Dashboard = () => {
  const [token, setToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState();
  const [description, setDescription] = useState('');

  const history = useHistory();

  const handleDate = async (date) => {
    const formatedDate = moment(date).format('MM.DD.YYYY');
    setDate(formatedDate);
    const response = await httpRequest.post('/event/date', {
      user_id: token.id,
      date: formatedDate,
    });
    if (response.data.data) {
      setDescription(response.data.data.description);
    } else {
      setDescription('');
    }

    console.log(response);
  };

  const saveEvent = async (date) => {
    await httpRequest.post('/event', {
      user_id: token.id,
      description,
      date: '07-10-2020',
    });
  };

  const logOut = async () => {
    setIsLoggedIn(false);
    await Cookies.remove('JWT');
    history.push('/');
  };

  const formatEvents = (events) => {
    setEvents(events.map((event) => moment(event.date).format('MM.DD.YYYY')));
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

  useEffect(() => {
    const getUserEvents = async () => {
      const response = await httpRequest.get(`/event?user_id=${token.id}`);
      if (response.data.data) formatEvents(response.data.data);
    };

    if (token) getUserEvents();
  }, [token]);

  return (
    <div className={styles.container}>
      <Navbar isloggedin={isLoggedIn} logout={logOut} />
      <div className={styles.innerContainer}>
        <Calendar handleDate={handleDate} events={events} />
        <div className={styles.interface}>
          <h3>
            Welcome back, {token ? capitalizeFirstLetter(token.username) : null}
          </h3>
          {date ? (
            <Event
              date={date}
              description={description}
              setDescription={setDescription}
              saveEvent={saveEvent}
            />
          ) : (
            <p>Please select a date</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
