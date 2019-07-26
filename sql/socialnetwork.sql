DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    password text NOT NULL,
    picurl VARCHAR(255),
    bio VARCHAR(700),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS user_profiles;

CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    age Integer,
    city VARCHAR(255),
    homepage VARCHAR(255),
    userid INT NOT NULL UNIQUE
);
