const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
require('dotenv').config();

const account_sid = process.env.ACCOUNT_SID;
const account_token = process.env.AUTH_TOKEN;
const my_number = process.env.MY_NUMBER;
const bought_number = process.env.BOUGHT_NUMBER;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    console.log(1);
    const client = require('twilio')(account_sid, account_token);
    console.log(2);
    client.messages
        .create({
            body: 'This is the message from OlkaA',
            // your number
            from: `${my_number}`,
            // number bought from twilio
            to: `${bought_number}`
        })
        .then(message => console.log(message.sid))
        .catch(e => console.log(e));
        console.log(3);
        res.end('ok');
  });
// b. to send message


// c. receive sms
const MessagingResponse = require('twilio').twiml.MessagingResponse;

router.post('/', (req, res) => {
    // look in res.body to see incoming message  
    // response that you want to send back in response immediately
    const twiml = new MessagingResponse();
    twiml.message('Everyth is working');

    console.log(req.body);
  
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });

module.exports = router;