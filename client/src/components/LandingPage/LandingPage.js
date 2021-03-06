// Libraries imports
import React, { useState } from 'react';

//Relative imports
import Navbar from '../Layout/Navbar';
import styles from './LandingPage.module.scss';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

const LandingPage = () => {
  const [isLogging, setIsLogging] = useState(false);

  const setIsLoggingIn = () => {
    setIsLogging(!isLogging);
  };

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
          <LoginForm setislogging={setIsLoggingIn} />
        ) : (
          <RegistrationForm setislogging={setIsLoggingIn} />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
