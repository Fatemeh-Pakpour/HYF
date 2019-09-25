const express = require('express');
const bodyParser = require('body-parser');
const { studentRouter } = require('./student-router');

const app = express();
const port = 3000;

app.use(bodyParser.json());

//mount router
app.use('*', (req, res, next) => {
    const { method, path} = req;
    console.log(`${method} ${path}`);
    next();
})

app.use('/student', studentRouter);

//error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.json({ err }); //.status(400)
    next();
})

app.listen(port, () => {
    console.log(`App started at ${port}`);
});