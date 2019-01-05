### Schema

CREATE DATABASE app_db;
USE app_db;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

