import React from 'react';
import Navbar from '../Layout/Navbar';
import styles from './LandingPage.module.scss';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
    </div>
  );
};

export default LandingPage;
