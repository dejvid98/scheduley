import React from 'react';
import Navbar from '../Layout/Navbar';
import styles from './LandingPage.module.scss';
import RegistrationForm from './RegistrationForm';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
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
        <RegistrationForm />
      </div>
    </div>
  );
};

export default LandingPage;
