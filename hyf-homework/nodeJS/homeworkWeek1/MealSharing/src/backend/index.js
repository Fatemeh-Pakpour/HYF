const express = require('express');
const app = express();

const meals = require('./routes/meals.js');
const cheapMeal = require('./routes/cheap-meals.js');
const largeMeal = require('./routes/large-meals.js');
const meal = require('./routes/meal.js');
const reservation = require('./routes/reservation.js');
const reservations = require('./routes/reservations.js');

app.get('/', function (req, res) {
  res.send(`
    <a href="/meals">../meals</a><br />
    <a href="/cheap-meals">../cheap-meals</a><br />
    <a href="/large-meals">../large-meals</a><br />
    <a href="/meal">../meal</a><br />
    <a href="/reservation">../reservation</a><br />
    <a href="/reservations">../reservations</a><br />
  `);
});
app.get("/meals", meals);
app.get("/cheap-meals", cheapMeal);
app.get("/large-meals", largeMeal);
app.get("/meal", meal);
app.get("/reservation", reservation);
app.get("/reservations", reservations);

app.listen(3000);