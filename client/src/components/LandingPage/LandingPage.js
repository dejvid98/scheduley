import React, { useState, useEffect } from 'react';
import Navbar from '../Layout/Navbar';
import styles from './LandingPage.module.scss';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

const LandingPage = ({ props }) => {
  const [isLogging, setIsLogging] = useState(false);
  const [cookie, setCookie] = useState();

  const setIsLoggingIn = () => {
    setIsLogging(!isLogging);
  };



  useEffect(() => {
    if (cookie) {
    }
  }, [cookie]);
  return (
    <div className={styles.container}>
      <Navbar setislogging={setIsLoggingIn} islogging={isLogging} />
      <div className={styles.illustrationWrapper}>
        <div className={styles.imgContainer}></div>
        <img
          src='CalendarIllustration.svg'
          alt='Calendar Illustration'
          className={styles.calendar}
        />
        <img src='Person.svg' alt='Person' className={styles.person} />
      </div>
      <div className={styles.registrationWrapper}>
        {isLogging ? (
          <LoginForm setislogging={setIsLoggingIn} setCookie={setCookie} />
        ) : (
          <RegistrationForm
            setislogging={setIsLoggingIn}
            setCookie={setCookie}
          />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
