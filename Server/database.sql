CREATE DATABASE data;

CREATE TABLE voter (
    _id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role_id INTEGER NOT NULL,
    password VARCHAR(255) NOT NULL
);
