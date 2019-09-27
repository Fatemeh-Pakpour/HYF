const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const pool = require("./database");

require('dotenv').config();

const account_sid = process.env.ACCOUNT_SID;
const account_token = process.env.AUTH_TOKEN;
const my_number = process.env.MY_NUMBER;
const bought_number = process.env.BOUGHT_NUMBER;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

function sqlQuery(query) {
  return new Promise(function(resolve, reject){
    pool.query(query, function(error, results, fields) {
      if(error) {
        reject(error);
        throw error;
      }
      else {
        resolve(results);
      }
    });
  });
}

router.get('/order/:id', (req, res) => {
  let orderId = req.params.id;
  pool.query(`SELECT * FROM clientOrder WHERE id = ${orderId}`, function(error, results, fields) {
    if(error) {
      console.log(error);
      throw error;
    }
    else {
      console.log(results);
      res.json(results);
    }
  });
});

router.patch('/order/:id', (request, response) => {
  let orderId = request.params.id;
  let newStatus = request.body.status;

  sqlQuery(`SELECT status FROM clientOrder WHERE id = ${orderId}`)
  .then(res => {
    if(res[0].status !== newStatus){
      sqlQuery(`UPDATE clientOrder SET status = '${newStatus}', modified = ${pool.escape(new Date())} WHERE id = ${orderId}`)
      .then(res => {
        const client = require('twilio')(account_sid, account_token);
        client.messages
          .create({
            body: `Your order's status is changed to ${newStatus}`,
            // number bought from twilio
            from: bought_number,
            // your number
            to: my_number
          })
        response.send(`Status is changed to ${newStatus}`);
      });
    }    
    else{
      response.send('Status has already changed');
    }
  });
});

module.exports = router;