const express = require("express");
const app = express();
const router = express.Router();
const pool = require("./../database");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//router.get("/api/meals", (request, response) => {
  // pool.query("SELECT * FROM meal", function(error, results, fields) {
  //   if(error) {
  //     console.log(error);
  //     throw error;
  //   }
  //   if(!error){
  //     response.json(results);
  //   }    
  //   // error will be an Error if one occurred during the query
  //   // results will contain the results of the query
  //   // fields will contain information about the returned results fields (if any)
  // });
//});

router.get("/api/meals", (request, response) => {
  const options = {
    maxPrice: request.query.maxPrice,
    availableReservations: request.query.availableReservations,
    title: request.query.title,
    createdAfter: request.query.createdAfter,
    limit: request.query.limit
  };

  const query = request.query;

  for(let key in query){
      if(!options.hasOwnProperty(key)){
        response.status(400).json({ msg: "There is no such query parameter"});
      }
  }

  const conditions = [];

  if(typeof options.maxPrice !== 'undefined'){
    conditions.push(`Price < ${Number(options.maxPrice)}`);
  }
  // if(typeof options.availableReservations !== 'undefined') {
  //   conditions.push(` Price < ${Number(options.maxPrice)}`);
  // }
  if(typeof options.title !== 'undefined') {
    conditions.push(`Title LIKE '%${options.title}%'`);
  }
  if(typeof options.createdAfter !== 'undefined') {
    conditions.push(`CreatedDate > '${options.createdAfter}'`);
  }

  let stringOfConditions = conditions.length > 0 ? ' WHERE ' + conditions.join(' AND ') : '';

  if(typeof options.limit !== 'undefined'){
    stringOfConditions += ` LIMIT ${Number(options.limit)}`;
  }  

  pool.query(`SELECT * FROM meal ${stringOfConditions}`, function(error, results, fields) {
    if(error) {
      console.log(error);
      throw error;
    }
    if(!error){
      response.send(results);
    }   
  });  
});

module.exports = router;
