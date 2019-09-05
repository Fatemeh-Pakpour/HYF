const express = require('express');
const router = express.Router();

const meals = require('../data/meals.json');
const reservations = require('../data/reservations.json');

const randomMeal = meals[Math.floor(Math.random() * meals.length)];

let meal = '';
reservations.forEach(item => {
    if(randomMeal.Id === item.MealId){
        console.log(randomMeal.Id, randomMeal.Title, item.MealId, item.Email);
        meal = `${randomMeal.Title} : ${item.Email}`;
    }
    else{
        meal = `${randomMeal.Title}`
    }
})

router.get('/meal', function (req, res) {
    res.json(meal);
});

module.exports = router;