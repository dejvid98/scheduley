import React, { useState } from 'react';
import moment from 'moment';
import { isSameDay } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { Calendar } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import './Calendar.scss';
import styles from './Calendar.module.scss';

export default function DatePickerCalendarWithInputExample() {
  const [selectedDate, setSelectedDate] = useState();
  const [events, setEvents] = useState([]);

  const modifiers = {
    selected: (date) =>
      events.some((selectedDate) => isSameDay(selectedDate, date)),
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className={styles.container}>
      <Calendar
        onDayClick={handleDayClick}
        modifiers={modifiers}
        locale={enGB}
      />
    </div>
  );
}
