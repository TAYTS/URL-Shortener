CREATE DATABASE url_shortener;

CREATE TABLE url_shortener.url_reference (
  ID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  ORIGINAL_URL VARCHAR(255) NOT NULL,
  URL_HASH VARCHAR(255) NOT NULL UNIQUE,
  CREATE_TIMESTAMP TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)