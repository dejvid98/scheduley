const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Checks to see if username is already taken
const isUsernameTaken = async (query, username) => {
  try {
    const result = await db.query(query, username);

    if (result.rowCount !== 0) return true;

    return false;
  } catch (err) {
    console.log(err);
  }
};

// Validates if password is at least 8 characters long, has at least 1 number and 1 special character
const validatePassword = (password) => {
  const passwordRegex = new RegExp(
    '^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
  );
  return passwordRegex.test(String(password));
};

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!validatePassword(password)) {
      res.send({
        message:
          'Please enter a valid password with at least 8 characters, 1 special character and 1 number.',
        status: false,
      });
      return;
    }

    const checkQuery = `SELECT * FROM userprofile WHERE username = $1`;

    const doesExist = await isUsernameTaken(checkQuery, [
      username.toLowerCase(),
    ]);

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

    const stringQuery = `INSERT INTO userprofile (username, password) values ($1,$2) RETURNING ID`;

    const response = await db.query(stringQuery, [username, hashedPassword]);

    const payload = {
      username,
      id: response.rows[0].id,
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
