const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const isUsernameTaken = async (query, username) => {
  try {
    const result = await db.query(query, username);

    if (result.rowCount !== 0) return true;

    return false;
  } catch (err) {
    console.log(err);
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const checkQuery = `SELECT * FROM userprofile WHERE username = $1`;

    // Checks to see if username is already taken
    const doesExist = await isUsernameTaken(checkQuery, [email, username]);

    if (doesExist) {
      res.send({
        message: 'Username already exist!',
        status: false,
      });
      return;
    }

    // Hashing password before inserting it into DB
    const salt = await bcrypt.genSalt(4);

    const hashedPassword = await bcrypt.hash(password, salt);

    const stringQuery = `INSERT INTO userprofile (username, password) values ($1,$2)`;

    const response = await db.query(stringQuery, [username, hashedPassword]);

    const payload = {
      user: {
        username,
        email,
        id: response.rows[0].id,
      },
    };

    jwt.sign(payload, 'secretToken', (err, token) => {
      if (err) throw new Error(err);

      res.send({
        message: 'User successfully registered!',
        token,
        status: true,
      });
    });
  } catch (err) {
    res.send({
      message: err.message,
      status: 'false',
    });
  }
};