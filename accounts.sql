CREATE DATABASE IF NOT EXISTS `accounts`;

CREATE TABLE `account` (
    `id` VARCHAR(50) NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NULL DEFAULT NULL,
    `password` VARCHAR(50) NULL DEFAULT NULL,
    `role` VARCHAR(50) NULL DEFAULT NULL,
    `created` VARCHAR(50) NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
);

USE `account`;