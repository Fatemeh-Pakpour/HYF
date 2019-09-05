const express = require('express');
const router = express.Router();

const meals = require('../data/meals.json');
const reservations = require('../data/reservations.json');

router.get('/meal', function (req, res) {
    const randomMeal = meals[Math.floor(Math.random() * meals.length)];

    let meal = '';
    let listOfEmails = [];

    reservations.forEach(reservation => {
        if (randomMeal.Id == reservation.MealId) {
            listOfEmails.push(reservation.Email);
        } else {
            meal = randomMeal.Title;
        }
    })

    let emailString = '';
    listOfEmails.forEach(email => {
        emailString += `, ${email}`;
    })

    meal = randomMeal.Title + emailString;

    res.json(meal);
});

module.exports = router;