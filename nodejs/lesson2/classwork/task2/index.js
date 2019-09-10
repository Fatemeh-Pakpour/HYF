const express = require("express");
const app = express();

app.use((req, res, next) => {
    const secret = req.query.secret;

    if(secret !== 'Olha'){
        res.status(403).send('not author');
        return;
    }

    next();
})

app.get("/", (req, res) => {
    //bla(); //Error
    res.send("task2 ok");
});



//http://localhost:5000/contact?email=ddd@ddf.com&phone=123456789
app.get("/contact", (req, res) => {
    console.log(req.query);
    res.send(req.query);
});

//http://localhost:5000/education/KNURE
app.get("/education/:univ", (req, res) => {
// //http://localhost:5000/education?gradAfter=2018
//   app.get("/education/:univ", (req, res) => {
//   const array = [{"name": "KNURE", "gradYear" : "2015"}];

    console.log(req.params);
    const univ = req.params.univ;
    res.send(`Universitet: ${univ}`);
});

app.get("/skills", (req, res) => {
    res.send(1);
});

app.use((err, req, res, next) => {
    console.log('Error: ', err);

    const errorResponse = {
        err: err.toString(),
        url: req.originalUrl
    };    
    // res.status(400).send(`Error happened in ${req.originalUrl}`);
    res.status(400).send(errorResponse);
})

app.listen(5000);