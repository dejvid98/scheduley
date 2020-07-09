const db = require('../db');

exports.createEvent = async (req, res) => {
  try {
    const { user_id, date, description } = req.body;

    const eventQuery = `INSERT INTO events(user_id,date,description)
                        VALUES($1,$2,$3)`;

    await db.query(eventQuery, [user_id, date, description]);

    res.send({ message: 'Event successfully created!', status: true });
  } catch (err) {
    res.send({ message: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.body;

    const eventQuery = `DELETE FROM events WHERE id = $1`;

    await db.query(eventQuery, [id]);

    res.send({ message: 'Event successfully deleted!', status: true });
  } catch (err) {
    res.send({ message: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id, description } = req.body;

    const eventQuery = `UPDATE events SET description = $1 WHERE id = $2`;

    await db.query(eventQuery, [description, id]);

    res.send({ message: 'Event successfully deleted!', status: true });
  } catch (err) {
    res.send({ message: err.message });
  }
};
