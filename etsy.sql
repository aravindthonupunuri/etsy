DROP DATABASE [IF EXISTS] etsy;
CREATE DATABASE etsy;
DROP TABLE IF EXISTS `users`;
CREATE TABLE etsy.users (
  `name` varchar(50) NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL
  PRIMARY KEY (`name`)
);