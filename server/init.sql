CREATE TABLE IF NOT EXISTS userprofile (
	id SERIAL UNIQUE PRIMARY KEY,
	username VARCHAR(30) NOT NULL UNIQUE,
	created_at TIMESTAMP DEFAULT now(),
	password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS events (
	id SERIAL UNIQUE PRIMARY KEY,
    date DATE NOT NULL,
	description TEXT,
	user_id INT REFERENCES userprofile(id) NOT NULL,
	created_at TIMESTAMP DEFAULT now()
);

