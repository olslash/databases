-- DROP DATABASE chat;
CREATE DATABASE chat;

USE chat;



-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS `users`;
    
CREATE TABLE `users` (
  `id_user` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name_user` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id_user`)
);

-- ---
-- Table 'friendship'
-- 
-- ---

DROP TABLE IF EXISTS `friendship`;
    
CREATE TABLE `friendship` (
  `id_user_from` INTEGER NULL DEFAULT NULL,
  `id_user_to` INTEGER NULL DEFAULT NULL,
  `id_friendship` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id_friendship`)
);

-- ---
-- Table 'messages'
-- 
-- ---

DROP TABLE IF EXISTS `messages`;
    
CREATE TABLE `messages` (
  `id_message` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_user_from` INTEGER NULL DEFAULT NULL,
  `message_text` VARCHAR(1000) NULL DEFAULT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `id_room` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_message`)
);

-- ---
-- Table 'rooms'
-- 
-- ---

DROP TABLE IF EXISTS `rooms`;
    
CREATE TABLE `rooms` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name_room` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `friendship` ADD FOREIGN KEY (id_user_from) REFERENCES `users` (`id_user`);
ALTER TABLE `friendship` ADD FOREIGN KEY (id_user_to) REFERENCES `users` (`id_user`);
ALTER TABLE `messages` ADD FOREIGN KEY (id_user_from) REFERENCES `users` (`id_user`);
ALTER TABLE `messages` ADD FOREIGN KEY (id_room) REFERENCES `rooms` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `friendship` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id_user`,`name_user`) VALUES
-- ('','');
-- INSERT INTO `friendship` (`id_user_from`,`id_user_to`,`id_friendship`) VALUES
-- ('','','');
-- INSERT INTO `messages` (`id_message`,`id_user_from`,`message_text`,`createdAt`,`id_room`) VALUES
-- ('','','','','');
-- INSERT INTO `rooms` (`id`,`name_room`) VALUES
-- ('','');

