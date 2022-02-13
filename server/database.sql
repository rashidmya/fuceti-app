CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE fuceti IF NOT EXISTS;

CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    friends TEXT [],
    sent_requests TEXT [],
    recieved_requests TEXT [],
    created_at TIMESTAMP DEFAULT NOW()
);

SELECT * FROM users;


UPDATE users SET friends = ARRAY_APPEND(friends, 'c6e2b5c1-042c-49a2-b280-805b1ce53868') WHERE id = '06d1c06c-b6e6-437f-99de-5c89563a65d8'


INSERT INTO users (email, username, password) VALUES ('rawrxd@gmail.com', 'buga','123456')