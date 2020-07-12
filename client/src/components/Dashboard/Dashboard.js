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
import Alert from '@material-ui/lab/Alert';

const Dashboard = () => {
  const [token, setToken] = useState();
  const [eventId, setEventId] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState();
  const [description, setDescription] = useState('');
  const [isEventSet, setIsEventSet] = useState(false);
  const [alertText, setAlertText] = useState('');

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
      setEventId(response.data.data.id);
      setIsEventSet(true);
    } else {
      setDescription('');
      setIsEventSet(false);
    }
  };

  const getUserEvents = async () => {
    const response = await httpRequest.get(`/event?user_id=${token.id}`);
    if (response.data.data) formatEvents(response.data.data);
  };

  const saveEvent = async () => {
    if (isEventSet) {
      await httpRequest.put('/event', {
        user_id: token.id,
        description,
        date,
        id: eventId,
      });
      getUserEvents();
      setAlertText('Event successfully updated!');
      setDate();
      setTimeout(() => {
        setAlertText('');
      }, 4000);
    } else {
      await httpRequest.post('/event', {
        user_id: token.id,
        description,
        date,
      });
      getUserEvents();
      setDate();
      setAlertText('Event successfully created!');
      setTimeout(() => {
        setAlertText('');
      }, 4000);
    }
  };

  const deleteEvent = async () => {
    const { id } = token;

    const response = await httpRequest.post('/event/date', {
      user_id: id,
      date,
    });

    const event_id = response.data.data.id;

    await httpRequest.post(`/event/delete?id=${event_id}`);

    setDescription('');
    setDate();

    getUserEvents();

    setAlertText('Event successfully deleted!');

    setTimeout(() => {
      setAlertText('');
    }, 4000);
  };

  const logOut = async () => {
    setIsLoggedIn(false);
    await Cookies.remove('JWT');
    history.push('/');
  };

  const formatEvents = (events) => {
    setEvents(
      events.map((event) => new Date(moment(event.date).format('llll')))
    );
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const getToken = async () => {
      const cookie = await Cookies.get('JWT');
      if (!cookie) {
        history.push('/');
      } else {
        jwt.verify(cookie, 'secretToken', async (err, decoded) => {
          setToken(decoded);
        });
        setIsLoggedIn(true);
      }
    };

    getToken();
  }, []);

  useEffect(() => {
    if (token) getUserEvents();
  }, [token]);

  return (
    <div className={styles.container}>
      <Navbar isloggedin={isLoggedIn} logout={logOut} />
      <div className={styles.innerContainer}>
        <div className={styles.calendarWrapper}>
          <Calendar handleDate={handleDate} events={events} />
        </div>
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
              deleteEvent={deleteEvent}
            />
          ) : (
            <p>Please select a date</p>
          )}

          {alertText ? (
            <div className={styles.alert}>
              <Alert severity='success'>{alertText}</Alert>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
