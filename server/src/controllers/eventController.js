const db = require('../db');

exports.getAllUserEvents = async (req, res) => {
  try {
    const { user_id } = req.query;

    const eventQuery = `SELECT * FROM events WHERE user_id = $1`;

    const response = await db.query(eventQuery, [user_id]);

    res.send({ status: true, data: response.rows });
  } catch (err) {
    res.send({ message: err.message });
  }
};

exports.getEventByDate = async (req, res) => {
  try {
    const { user_id, date } = req.body;

    const eventQuery = `SELECT * FROM events WHERE user_id = $1 AND date::date = $2`;

    const response = await db.query(eventQuery, [user_id, date]);

    res.send({ status: true, data: response.rows[0] });
  } catch (err) {
    res.send({ message: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { user_id, date, description } = req.body;

    const eventQuery = `INSERT INTO events(user_id,date,description)
                        VALUES($1,$2,$3)`;

    const activityQuery = `INSERT INTO activity(user_id,date,description) VALUES($1,$2,$3)`;

    await db.query(eventQuery, [user_id, date, description]);

    await db.query(activityQuery, [user_id, date, 'Created an event on ']);

    res.send({ message: 'Event successfully created!', status: true });
  } catch (err) {
    res.send({ message: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id, date, user_id } = req.body;

    const eventQuery = `DELETE FROM events WHERE id = $1`;

    const activityQuery = `INSERT INTO activity(user_id,date,description) VALUES($1,$2,$3)`;

    await db.query(eventQuery, [id]);

    await db.query(activityQuery, [user_id, date, 'Deleted an event on ']);

    res.send({ message: 'Event successfully deleted!', status: true });
  } catch (err) {
    res.send({ message: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id, description, date, user_id } = req.body;

    const eventQuery = `UPDATE events SET description = $1 WHERE id = $2`;

    const activityQuery = `INSERT INTO activity(user_id,date,description) VALUES($1,$2,$3)`;

    await db.query(eventQuery, [description, id]);

    await db.query(activityQuery, [user_id, date, 'Updated an event on ']);

    res.send({ message: 'Event successfully updated!', status: true });
  } catch (err) {
    res.send({ message: err.message });
  }
};
