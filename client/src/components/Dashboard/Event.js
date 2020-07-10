import React from 'react';
import styles from './Event.module.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Event = () => {
  return (
    <div className={styles.container}>
      <div className={styles.date}>
        <p>20.04.2019</p>
      </div>
      <div className={styles.descriptionWrapper}>
        <TextField
          id='standard-multiline-static'
          label='Description'
          multiline
          rows={6}
          variant='outlined'
          className={styles.description}
        />
      </div>

      <div className={styles.buttonWrapper}>
        <Button variant='contained' color='primary' className={styles.delete}>
          Delete
        </Button>
        <Button variant='contained' color='primary' className={styles.save}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default Event;
