const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const pool = require("./database");

require('dotenv').config();

const account_sid = process.env.ACCOUNT_SID;
const account_token = process.env.AUTH_TOKEN;
const my_number = process.env.MY_NUMBER;
const bought_number = process.env.BOUGHT_NUMBER;

const Order = require('./order');
const orderTypes = ['pizza', 'burger', 'salad'];

function processRequest(input){
  return new Promise(function(resolve) {
    if (input === 'guide') {
      resolve('Choose MENU to see menu, ORDER to order food or STATUS (YOUR ID) to check status of the order');
    } else if (input === 'menu') {
      resolve(`Type two words of what to order: ${orderTypes.map(item => `ORDER ${item.toUpperCase()}`).join(', ')}`);
    } else if (input.startsWith('order')) {
      const orderType = input.replace('order ', '');
      const newOrder = new Order(orderType, 'ordered', new Date(), new Date());

      if(!orderTypes.includes(orderType)){
        resolve(`Order type is invalid`);
        return;
      }

      pool.query(`INSERT INTO clientOrder SET ?`, newOrder, function(error, results, fields) {
        if(error) {
          console.log(error);
          throw error;
        }
        else {
          resolve(`Your order's id is ${results.insertId}`);
        }
      });
    }
    else if (input.startsWith('status')) {
      const orderId = input.replace('status ', '');
      pool.query(`SELECT status, modified FROM clientOrder WHERE id = ${orderId}`, function(error, results, fields) {
        if(error) {
          console.log(error);
          throw error;
        }
        else {
          if (results.length > 0){
            resolve(`Order is in ${results[0].status} status. Last updated ${results[0].modified}`);
          }
          else{
            resolve(`You order does not exist`);
          }
        }
      });
    } 
    else {
      resolve('unknown command. Type GUIDE');
    }
  });
}

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    const client = require('twilio')(account_sid, account_token);
    client.messages
        .create({
            body: 'This is the message from OlkaA.',
            // your number
            from: `${my_number}`,
            // number bought from twilio
            to: `${bought_number}`
        })
        .then(message => console.log(message.sid))
        .catch(e => console.log(e));
        res.end('ok');
  });
// b. to send message

// c. receive sms
const MessagingResponse = require('twilio').twiml.MessagingResponse;

router.post('/', (req, res) => {
    // look in res.body to see incoming message  
    // response that you want to send back in response immediately
    let twiml = new MessagingResponse();

    console.log(req.body.Body);
    processRequest(req.body.Body.toLowerCase())
    .then(function(result){
      twiml.message(result);
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    });
  });


module.exports = router;