const express = require('express');
const app = express();

//Homework2 - <!--
app.use((req, res, next) => {
  const date = new Date();
  console.log(`${date.toUTCString()} request recieved for the path ${req.url}`);
  next();
})
// Homework 2 -->

const meals = require('./routes/meals.js');
const cheapMeal = require('./routes/cheap-meals.js');
const largeMeal = require('./routes/large-meals.js');
const randomMeal = require('./routes/random-meal.js');
const reservation = require('./routes/reservation.js');
const reservations = require('./routes/reservations.js');

//Homework2 - <!--
const mealsId = require('./routes/meals-id.js');
const reservationsId = require('./routes/reservations-id.js');
const reviewsId = require('./routes/reviews-id.js');
const reviews = require('./routes/reviews.js');
// Homework 2 -->

app.get('/', function (req, res) {
  res.send(`
    <p>Homework week1</p>
    <a href="/meals">../meals</a><br />
    <a href="/cheap-meals">../cheap-meals</a><br />
    <a href="/large-meals">../large-meals</a><br />
    <a href="/random-meal">../random-meal</a><br />
    <a href="/reservation">../reservation</a><br />
    <a href="/reservations">../reservations</a><br />
    <p>Homework week2</p>
    <a href="/meals/4">../meals/{id}</a><br />
    <a href="/reservations/3">../reservations/{id}</a><br />
    <a href="/reviews/1">../reviews/{id}</a><br />
    <a href="/reviews">../reviews</a><br />
  `);
});

app.get('/meals', meals);
app.get('/cheap-meals', cheapMeal);
app.get('/large-meals', largeMeal);
app.get('/random-meal', randomMeal);
app.get('/reservation', reservation);
app.get('/reservations', reservations);

//Homework2 - <!--
app.get('/meals/:id', mealsId);
app.get('/reservations/:id', reservationsId);
app.get('/reviews/:id', reviewsId);
app.get('/reviews', reviews);
// Homework 2 -->

app.listen(3000);