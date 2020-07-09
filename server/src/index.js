require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Config
const config = require('./config');

const app = express();
app.use(cors());
app.use(bodyParser.json());



// Server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
