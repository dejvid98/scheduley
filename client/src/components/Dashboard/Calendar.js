// Libraries imports
import React from 'react';
import { isSameDay } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { Calendar } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';

// Relative imports
import './Calendar.scss';
import styles from './Calendar.module.scss';

export default function DatePicker({ handleDate, events }) {
  // Highlights the dates where user has set the events
  const modifiers = {
    selected: (date) =>
      events.some((selectedDate) => isSameDay(selectedDate, date)),
  };

  // Sets the state to clicked date
  const handleDayClick = (date) => {
    handleDate(date);
  };

  return (
    <div className={styles.container}>
      <Calendar
        onDayClick={handleDayClick}
        modifiers={modifiers}
        locale={enGB}
        selected={events}
      />
    </div>
  );
}
