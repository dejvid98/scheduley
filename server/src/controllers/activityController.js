const db = require('../db');

exports.getUserActivity = async (req, res) => {
  try {
    const { user_id } = req.query;

    const eventQuery = `SELECT * FROM activity WHERE user_id = $1`;

    const response = await db.query(eventQuery, [user_id]);

    res.send({ status: true, data: response.rows });
  } catch (err) {
    res.send({ message: err.message });
  }
};
