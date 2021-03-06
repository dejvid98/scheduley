require('dotenv').config();

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Routes imports
const register = require('./routes/registerRoute');
const login = require('./routes/loginRoute');
const event = require('./routes/eventRoute');

// Initialization
const app = express();
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/register', register);
app.use('/login', login);
app.use('/event', event);

// Server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
