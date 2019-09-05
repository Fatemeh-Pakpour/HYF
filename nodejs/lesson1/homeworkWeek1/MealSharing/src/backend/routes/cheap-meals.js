const express = require('express');
const router = express.Router();

const meals = require('../data/meals.json');

router.get('/cheap-meals', function (req, res) {
    res.json(meals.filter(meal => {
        return meal.Price < 6;
    }));
})

module.exports = router;