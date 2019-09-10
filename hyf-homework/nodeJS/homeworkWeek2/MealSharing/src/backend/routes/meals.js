const express = require('express');
const router = express.Router();

const meals = require('../data/meals.json');

router.get('/meals', function (req, res) {
    const options = {
        maxPrice: req.query.maxPrice,
        title: req.query.title,
        createdAfter: req.query.createdAfter,
        limit: req.query.limit
    }
    const query = req.query;

    for(let key in query){
        if(!options.hasOwnProperty(key)){
            res.status(400).send('There is no such query parameter');
        }
    }

    let resMeals = meals;
    
    if(typeof options.maxPrice !== 'undefined'){
        resMeals = resMeals.filter(meal => {
            return meal.Price < options.maxPrice; 
        })
    }

    if(typeof options.title !== 'undefined') {
        resMeals = resMeals.filter(meal => {
            return meal.Title.toLowerCase().includes(options.title.toLowerCase());
        })
    }

    if(typeof options.createdAfter !== 'undefined') {
        resMeals = resMeals.filter(meal => {            
            return meal.CreatedDate.split(' ')[0] > options.createdAfter;
        })
    }

    if(typeof options.limit !== 'undefined'){
        resMeals = resMeals.slice(0, options.limit);
    }

    res.send(resMeals);
})

module.exports = router;