# donations-tracker

## Database setup

CREATE SCHEMA IF NOT EXISTS donations_tracker DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
CREATE USER IF NOT EXISTS 'developer'@'127.0.0.1' IDENTIFIED BY 'developer';
CREATE USER IF NOT EXISTS 'developer'@'localhost' IDENTIFIED BY 'developer';
CREATE USER IF NOT EXISTS 'developer'@'%' IDENTIFIED BY 'developer';
GRANT ALL PRIVILEGES ON donations_tracker.* TO 'developer'@'localhost' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON donations_tracker.* TO 'developer'@'127.0.0.1' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON donations_tracker.* TO 'developer'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;