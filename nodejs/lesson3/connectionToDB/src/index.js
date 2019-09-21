const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();


const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'MjxXLVhLdQ',
    database : 'nodejs'
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.connect(function(err){
    console.log(err);
});

app.get('/', (req, res) => {
    res.send("HYF week3");
})

// app.get('/add-contact', (req,res) => {
//     const contact = {
//         name: 'alex',
//         phoneNumber: '45789789454'
//     };

//     db.query('INSERT INTO contacts SET ?', contact, function(err, result, query){
//         if(err) {
//             console.err(err);
//         }
//         if(!err){
//             res.send('contact added successfully');
//         }
//     })
// })

app.post('/add-contact', (req, res) => {
    console.log(req.body);
    const contact = req.body;
    db.query('INSERT INTO contacts SET ?', contact, function(err, result, query){
        if(err) {
            console.err(err);
        }
        if(!err){
            res.send('contact added successfully');
        }
    })
});

app.get('/get-contact/:id', (req, res) => {
    const contactId = req.params.id;
    console.log(contactId);
    db.query('SELECT * FROM contacts WHERE idcontacts = ?', contactId, function(err, result, query){
        if(err) {
            console.err(err);
            throw err;
        }
        if(!err){
            res.send(result);
        }
    })
});

app.listen(4000);