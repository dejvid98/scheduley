require('dotenv').config();

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const register = require('./routes/registerRoute');

// Initialization
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/register', register);

// Express route handlers
app.get('/test', (req, res) => {
  res.send('Working!');
});

// Server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
