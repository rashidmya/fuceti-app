CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE fuceti IF NOT EXISTS;

CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

SELECT * FROM users;

INSERT INTO users (email, username, password) VALUES ('rawrxd@gmail.com', 'buga','123456')