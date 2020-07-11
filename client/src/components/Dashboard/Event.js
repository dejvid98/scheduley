import React from 'react';
import styles from './Event.module.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Event = ({ date, description, setDescription, saveEvent }) => {
  return (
    <div className={styles.container}>
      <div className={styles.date}>
        <p>{String(date)}</p>
      </div>
      <div className={styles.descriptionWrapper}>
        <TextField
          id='standard-multiline-static'
          label={
            description
              ? 'Description'
              : 'Seems like you have no events on selected date'
          }
          multiline
          rows={6}
          variant='outlined'
          className={styles.description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className={styles.buttonWrapper}>
        <Button variant='contained' color='primary' className={styles.delete}>
          Delete
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={styles.save}
          onClick={saveEvent}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Event;
