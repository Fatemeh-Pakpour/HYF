const express = require("express");
const app = express();
const router = express.Router();
const pool = require("./../database");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.delete("/api/meals/:id", (request, response) => {
  const id = request.params.id;

  pool.query(`DELETE FROM meal WHERE Id = ${id}`, function(error, results, fields) {
    if(error) {
      console.log(error);
      throw error;
    }
    if(!error){
      response.send("Meal deleted successfully!");
    }
  });
});

module.exports = router;
