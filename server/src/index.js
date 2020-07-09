require('dotenv').config();

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Config
const config = require('./config');

// Initialization
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client
const { Pool } = require('pg');
const pgClient = new Pool({
  user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: config.pgPort
});
pgClient.on('error', () => console.log('Lost Postgres connection'));

pgClient
  .query(
    `
  CREATE TABLE IF NOT EXISTS items (
    id uuid,
    item_name TEXT NOT NUll,
    complete BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
  )
`
  )
  .catch(err => console.log(err));


// Server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
