// Libraries imports
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import Alert from '@material-ui/lab/Alert';

// Relative imports
import Navbar from '../Layout/Navbar';
import styles from './Dashboard.module.scss';
import Calendar from './Calendar';
import Event from './Event';
import httpRequest from '../../Util/HTTP';

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

  // Checks to see if user has an event on the selected date
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

  // Returns all user events
  const getUserEvents = async () => {
    const response = await httpRequest.get(`/event?user_id=${token.id}`);
    if (response.data.data) formatEvents(response.data.data);
  };

  // Creates or updates an event based on if user has already set it
  const saveEvent = async () => {
    // If user has already created an event it updates it instead
    if (isEventSet && description) {
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
      // Creates a new event
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

    if (response.data.data) {
      const event_id = response.data.data.id;
      await httpRequest.post(`/event/delete?id=${event_id}`);

      setDescription('');
      setDate();
      getUserEvents();
      setAlertText('Event successfully deleted!');
      setTimeout(() => {
        setAlertText('');
      }, 4000);
    }
  };

  const logOut = async () => {
    setIsLoggedIn(false);
    await Cookies.remove('JWT');
    history.push('/');
  };

  // Formats the events to compatible format for the calendar
  const formatEvents = (events) => {
    setEvents(
      events.map((event) => new Date(moment(event.date).format('llll')))
    );
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Checks to see if user is already logged in with token in cookies, if not it redirects the user.
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
    console.log('hi');

    getToken();
  }, [history]);

  // Retrives all user events once the user is logged in
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
