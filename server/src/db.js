// Database
const { Pool } = require('pg');
const db = new Pool({
  user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: config.pgPort,
});
db.on('error', () => console.log('Lost Postgres connection'));
