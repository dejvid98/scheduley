// Libraries imports
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Relative imports
import styles from './Event.module.scss';

const Event = ({
  date,
  description,
  setDescription,
  saveEvent,
  deleteEvent,
}) => {
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      saveEvent();
    }
  };
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
              : 'Looks like you do not have an event on this date'
          }
          multiline
          rows={6}
          variant='outlined'
          className={styles.description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleEnter}
        />
      </div>

      <div className={styles.buttonWrapper}>
        <Button
          variant='contained'
          color='primary'
          className={styles.delete}
          onClick={deleteEvent}
        >
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
