  CREATE TABLE IF NOT EXISTS userprofile (
	id SERIAL UNIQUE PRIMARY KEY,
	username VARCHAR(30) NOT NULL UNIQUE,
	created_at TIMESTAMP DEFAULT now(),
	password TEXT NOT NULL,
);

CREATE TABLE IF NOT EXISTS events (
	id SERIAL UNIQUE PRIMARY KEY,
    event_date DATE NOT NULL,
);