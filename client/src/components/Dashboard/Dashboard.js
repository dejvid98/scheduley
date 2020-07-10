import React from 'react';
import Navbar from '../Layout/Navbar';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Navbar />
    </div>
  );
};

export default Dashboard;
