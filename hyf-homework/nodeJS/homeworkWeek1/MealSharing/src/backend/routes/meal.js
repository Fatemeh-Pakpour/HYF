const express = require('express');
const router = express.Router();

const meals = require('../data/meals.json');
const reservations = require('../data/reservations.json');

router.get('/meal', function (req, res) {
    const randomMeal = meals[Math.floor(Math.random() * meals.length)];

    let meal = '';
    let listOfEmails = reservations
    .filter(reservation => reservation.MealId == randomMeal.Id)
    .map(item => item.Email);

    let emailString = listOfEmails.join(', ');
    
    if(emailString === ''){
        meal = randomMeal.Title;
    }
    else{
        meal = `${randomMeal.Title}: ${emailString}`;
    }   

    res.json(meal);
});

module.exports = router;