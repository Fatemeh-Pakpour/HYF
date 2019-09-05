
SET NAMES utf8mb4;
CREATE DATABASE MealSharing;
USE MealSharing;
CREATE TABLE Meal (
	`Id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`Title` VARCHAR(255) NOT NULL,
	`Description` TEXT NULL DEFAULT NULL,
	`Location` VARCHAR(255) NOT NULL,
	`When` DATETIME NOT NULL,
	`MaxReservations` INT(10),
	`Price` DECIMAL(10, 2),
	`CreatedDate` DATETIME NOT NULL,
    PRIMARY KEY (`Id`)    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE Reservation (
	`Id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`NumberOfGuests` INT(10) NULL DEFAULT NULL,
	`MealId` INT(10) UNSIGNED NOT NULL,
	`CreatedDate` DATETIME NOT NULL,
    PRIMARY KEY (`Id`),
    CONSTRAINT `FkMealReservation` FOREIGN KEY (`MealId`) REFERENCES `Meal` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE Review (
	`Id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(255) NOT NULL,
    `Description` TEXT NULL DEFAULT NULL,
    `MealId` INT(10) UNSIGNED NOT NULL,
    `Stars` INT(10) NOT NULL,
	`CreatedDate` DATETIME NOT NULL,
    PRIMARY KEY (`Id`),
    CONSTRAINT `FkMealReview` FOREIGN KEY (`MealId`) REFERENCES `Meal` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Meal
INSERT INTO Meal(Title, Description, Location, `When`, MaxReservations, Price, CreatedDate) VALUES ('Pasta', 'Pasta with salmon', 'Copenhagen', '28.08.2019', 2, '10.55', '10.10.2019');
INSERT INTO Meal(Title, Description, Location, `When`, MaxReservations, Price, CreatedDate) VALUES ('Sausage', 'Boiled ausages', 'Copenhagen', '28.08.2019', 2, '10.55', now());
INSERT INTO Meal(Title, Description, Location, `When`, MaxReservations, Price, CreatedDate) VALUES ('Cookies', 'Sweet cookies', 'Copenhagen', '31.08.2019', 2, '12', now());
INSERT INTO Meal(Title, Description, Location, `When`, MaxReservations, Price, CreatedDate) VALUES ('Eggs', 'Fried eggs', 'Fyn', '28.08.2019', 1, '3', now());
INSERT INTO Meal(Title, Description, Location, `When`, MaxReservations, Price, CreatedDate) VALUES ('Salmon', 'Pasta with salmon', 'Copenhagen', '30.08.2019', 1, '14.22', now());
INSERT INTO Meal(Title, Description, Location, `When`, MaxReservations, Price, CreatedDate) VALUES ('Chicken', 'Chicken & BEan', 'Odense', '28.08.2019', 5, '55', now());
INSERT INTO Meal(Title, Description, Location, `When`, MaxReservations, Price, CreatedDate) VALUES ('Meatball', 'Danish meatball', 'Copenhagen', '31.08.2019', 2, '34.55', now());
INSERT INTO Meal(Title, Description, Location, `When`, MaxReservations, Price, CreatedDate) VALUES ('Potato', 'Sweet potato', 'Copenhagen', '28.08.2019', 2, '2.55', now());
INSERT INTO Meal(Title, Description, Location, `When`, MaxReservations, Price, CreatedDate) VALUES ('Pizza', 'Pizza with cheese', 'Odense', '01.09.2019', 3, '5.55', now());
INSERT INTO Meal(Title, Description, Location, `When`, MaxReservations, Price, CreatedDate) VALUES ('Soup', 'Tomato soup', 'Odense', '30.08.2019', 2, '2', '2.10.2019');

-- Reservation
INSERT INTO Reservation(NumberOfGuests, MealId, CreatedDate) VALUES (2, 1, now());
INSERT INTO Reservation(NumberOfGuests, MealId, CreatedDate) VALUES (1, 2, now());
INSERT INTO Reservation(NumberOfGuests, MealId, CreatedDate) VALUES (2, 3, now());
INSERT INTO Reservation(NumberOfGuests, MealId, CreatedDate) VALUES (3, 4, now());
INSERT INTO Reservation(NumberOfGuests, MealId, CreatedDate) VALUES (5, 3, now());
INSERT INTO Reservation(NumberOfGuests, MealId, CreatedDate) VALUES (2, 2, now());
INSERT INTO Reservation(NumberOfGuests, MealId, CreatedDate) VALUES (4, 6, now());
INSERT INTO Reservation(NumberOfGuests, MealId, CreatedDate) VALUES (1, 5, now());
INSERT INTO Reservation(NumberOfGuests, MealId, CreatedDate) VALUES (10, 8, now());

-- Review
INSERT INTO Review(Title, Description, MealId, Stars, CreatedDate) VALUES ('Very good', 'I like it very much', 4, 5, now());
INSERT INTO Review(Title, Description, MealId, Stars, CreatedDate) VALUES ('Good', 'I like it', 3, 4, now());
INSERT INTO Review(Title, Description, MealId, Stars, CreatedDate) VALUES ('Normal', 'It was normal', 4, 3, now());
INSERT INTO Review(Title, Description, MealId, Stars, CreatedDate) VALUES ('Pretty normal', 'I like it a little bit', 2, 2, now());
INSERT INTO Review(Title, Description, MealId, Stars, CreatedDate) VALUES ('Bad', 'Ido not like it very much', 3, 1, now());
INSERT INTO Review(Title, Description, MealId, Stars, CreatedDate) VALUES ('Very good', 'I like it very much', 5, 5, now());
INSERT INTO Review(Title, Description, MealId, Stars, CreatedDate) VALUES ('Good', 'I like it', 6, 4, now());
INSERT INTO Review(Title, Description, MealId, Stars, CreatedDate) VALUES ('Normal', 'It was normal', 7, 3, now());
INSERT INTO Review(Title, Description, MealId, Stars, CreatedDate) VALUES ('Pretty normal', 'I like it a little bit', 8, 2, now());
INSERT INTO Review(Title, Description, MealId, Stars, CreatedDate) VALUES ('Bad', 'Ido not like it very much', 1, 1, now());

-- Meal
-- Get all meals
SELECT * 
	FROM Meal;

-- Add a new meal
INSERT INTO Meal(Title, Description, Location, `When`, MaxReservations, Price, CreatedDate) 
	VALUES ('Salat', 'Potato salat', 'Copenhagen', '28.08.2019', 6, '4', '10.10.2019');

-- Get a meal with any id, fx 1
SELECT * 
	FROM Meal 
	WHERE Id = 1;

-- Update a meal with any id, fx 1. Update any attribute fx the title or multiple attributes
UPDATE Meal
	SET Title = 'Sausages with eggs', Description = 'Fried sausages with eggs'
	WHERE Id = 2;

-- Delete a meal with any id, fx 1
DELETE FROM Meal 
	WHERE Id = 2;


-- Reservation
-- Get all reservations
SELECT * 
	FROM Reservation;

-- Add a new reservation
INSERT INTO Reservation(NumberOfGuests, MealId, CreatedDate) 
	VALUES (1, 3, now());
    
-- Get a reservation with any id, fx 1
SELECT * 
	FROM Reservation WHERE Id = 3;

-- Update a reservation with any id, fx 1. Update any attribute fx the title or multiple attributes
UPDATE Reservation
	SET NumberOfGuests = 7, MealId = 4
	WHERE Id = 3;
    
-- Delete a reservation with any id, fx 1
DELETE FROM Reservation 
	WHERE Id = 6;


-- Review
-- Get all reviews
SELECT * 
	FROM Review;

-- Add a new review
INSERT INTO Review(Title, Description, MealId, Stars, CreatedDate) 
	VALUES ('Good enough', 'I like', 4, 3, now());
    
-- Get a review with any id, fx 1
SELECT * 
	FROM Review 
	WHERE Id = 3;

-- Update a review with any id, fx 1. Update any attribute fx the title or multiple attributes
UPDATE Review
	SET Title = 'Normal'
	WHERE Id = 5;
    
-- Delete a review with any id, fx 1
DELETE FROM Review 
	WHERE id = 10;

-- Additional queries
-- Get meals that has a price smaller than a specific price fx 90
SELECT * 
	FROM Meal 
	WHERE Price < 5;


-- Get meals that still has available reservations
SELECT Meal.Id, Meal.Title, Meal.MaxReservations, sum(Reservation.NumberOfGuests) 
	FROM Meal
	INNER JOIN Reservation
	ON Meal.Id = Reservation.MealId
	GROUP BY Meal.Id
	HAVING Meal.MaxReservations > sum(Reservation.NumberOfGuests);

-- Get meals that partially match a title. Rød grød med will match the meal with the title Rød grød med fløde
SELECT * 
	FROM Meal 
	WHERE Title 
	LIKE '%s%';

-- Get meals that has been created between two dates
SELECT * 
	FROM Meal 
    WHERE CreatedDate 
    BETWEEN '2019-08-28' AND now();

-- Get only specific number of meals fx return only 5 meals
SELECT * 
	FROM Meal 
    LIMIT 5;

-- Get the meals that have good reviews
SELECT * 
	FROM Meal 
    INNER JOIN Review 
    ON Meal.id = Review.MealId 
    WHERE Review.Title = 'Very Good' OR Review.Title = 'Good';

-- Get reservations for a specific meal sorted by created_date
SELECT * 
	FROM Reservation 
    WHERE MealId = 3 
    ORDER BY CreatedDate;

-- Sort all meals by average number of stars in the reviews
SELECT Meal.Id, Meal.Title, AVG(Review.Stars)
	FROM Meal 
    INNER JOIN Review 
    ON Meal.Id = Review.MealId 
	GROUP BY Meal.Title
    ORDER BY Review.Stars;

ALTER TABLE reservation
ADD Email VARCHAR(255);

UPDATE Reservation
SET Email = 'olha@afanasieva.com'
WHERE Id = 1 OR Id = 4 OR Id = 8;

UPDATE Reservation
SET Email = 'student@student.com'
WHERE Id = 3 OR Id = 7 OR Id = 12 OR ID = 10;

UPDATE Reservation
SET Email = 'teacher@teacher.com'
WHERE Id = 5 OR Id = 9 OR Id = 11 OR ID = 13;





