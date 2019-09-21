const express = require("express");
const app = express();
const router = express.Router();
const pool = require("./../database");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post("/api/meals", (request, response) => {
  // Example for meal
  // {
  //   "Title": "Chips", 
  //   "Description": "Chips from pack", 
  //   "Location" : "London", 
  //   "When": "23.10.2019", 
  //   "MaxReservations": "5", 
  //   "Price" : "3.23", 
  //   "CreatedDate" : "21.10.2019"
  // } 
  const newMeal = request.body;

  pool.query("INSERT INTO meal SET ?", newMeal, function(error, results, fields) {
    if(error) {
      console.err(error);
      throw error;
    }
    if(!error){
      response.send("Meal added successfully! Congrats!");
    }
  });
});

module.exports = router;
