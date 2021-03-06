CREATE DATABASE url_shortener;

CREATE TABLE url_shortener.url_reference (
  ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  ORIGINAL_URL VARCHAR(255) NOT NULL,
  URL_HASH VARCHAR(255) NOT NULL UNIQUE,
  CREATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP
)