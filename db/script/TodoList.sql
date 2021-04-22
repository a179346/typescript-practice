CREATE TABLE `TodoList` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(128) NOT NULL COMMENT 'title',
  `message` VARCHAR(512) NOT NULL COMMENT 'message',
  PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB;

INSERT INTO `TodoList` (`title`,`message`) VALUES ('Write test case','Write the test case according to the spec.');
INSERT INTO `TodoList` (`title`,`message`) VALUES ('Complete code','Complete the code.');
INSERT INTO `TodoList` (`title`,`message`) VALUES ('Run test','Run test to check the code.');