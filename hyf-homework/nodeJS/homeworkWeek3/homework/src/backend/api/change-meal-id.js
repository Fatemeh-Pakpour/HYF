const express = require("express");
const app = express();
const router = express.Router();
const pool = require("./../database");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.put("/api/meals/:id", (request, response) => {
  const newMeal = request.body;
  const id = request.params.id;

  // Example for meal
  // {
  //   "Location" : "Copenhagen", 
  //   "MaxReservations": "5"
  // } 
  
  let keys = Object.keys(newMeal); //list the properties of an object from req.body
  let arrayOfNewValues = keys.map(x => `${x} = "${newMeal[x]}"`); //form array [key = new value]
  let listOfNewValues = arrayOfNewValues.join(', '); //to the mySQL format

  const query = `UPDATE meal SET ${listOfNewValues} WHERE Id = ${id}`
  pool.query(query, function(error, results, fields) {
    if(error) {
      console.log(error);
      throw error;
    }
    if(!error){
      response.send("Meal updated successfully! Congrats!");
    }
  });
});

module.exports = router;
