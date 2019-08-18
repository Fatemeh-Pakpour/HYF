-- use school_olhaa;

-- create tables
/*CREATE TABLE `class` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `begins` DATE(255) NOT NULL,
  `ends` DATE(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `student` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NULL,
  `phone` VARCHAR(255) NULL,
  `class_id` INT(10) UNSIGNED NOT NULL,
  INDEX (`name`),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_class` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
*/

-- insert data
/*insert into class (name, begins, ends) values ('08', '2019-08-01', '2020-08-01');
insert into class (name, begins, ends) values ('09', '2019-08-01', '2020-06-01');
insert into class (name, begins, ends) values ('10', '2019-08-01', '2020-08-01');
insert into class (name, begins, ends) values ('11', '2019-08-01', '2020-08-01');

insert into student (name, email, phone, class_id) values ('Alex', 'alex@msd.com', '111111', 1);
insert into student (name, email, phone, class_id) values ('Olha', 'olha@msd.com', '222222', 2);
insert into student (name, email, phone, class_id) values ('Maria', 'maria@msd.com', '3333333', 3);
insert into student (name, email, phone, class_id) values ('Stefan', 'stefan@msd.com', '4444444', 4);
insert into student (name, email, phone, class_id) values ('Alexey', 'alexey@msd.com', '55555555', 1);
insert into student (name, email, phone, class_id) values ('Mark', 'mark@msd.com', '66666666', 2);
insert into student (name, email, phone, class_id) values ('Marius', 'marius@msd.com', '177111', 1);*/


-- add new column to table class
/*ALTER TABLE class
ADD status ENUM('not-started', 'ongoing', 'finished');*/

-- add status to each class
/*UPDATE class
SET status = 'ongoing'
WHERE id = 1 OR id = 2 OR id = 3 OR id = 4;*/
