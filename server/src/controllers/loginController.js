const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Checks to see if username exists
    const loginQuery = 'SELECT * FROM userprofile WHERE username = $1';
    const result = await db.query(loginQuery, [username.toLowerCase()]);

    if (result.rowCount === 0) {
      res.send({
        message: 'Username does not exist!',
        status: false,
      });
      return;
    }

    const user = { ...result.rows[0] };

    // Comapres hashed values of passwords
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw new Error(err);

      if (!result) {
        res.send({
          message: 'Invalid password!',
          status: false,
        });
        return;
      }

      delete user.password;

      jwt.sign(user, 'secretToken', (err, token) => {
        if (err) throw new Error(err);

        res.send({
          message: 'Successful login!',
          token,
          status: true,
        });
      });
    });
  } catch (err) {
    res.send({
      message: err.message,
      status: false,
    });
  }
};
