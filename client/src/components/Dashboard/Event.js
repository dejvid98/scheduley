import React from 'react';
import styles from './Event.module.scss';

const Event = () => {
  return (
    <div className={styles.container}>
      <div className={styles.date}>
        <p>20.04.2019</p>
      </div>
    </div>
  );
};

export default Event;
