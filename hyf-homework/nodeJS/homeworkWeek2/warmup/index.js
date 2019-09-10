const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send(`
        <br />
        <p>Play with numbers</p>
        <a href="http://localhost:3000/numbers/add?first=2&second=31">Add numbers</a><br />
        <a href="http://localhost:3000/numbers/multiply/2/3">Multiply numbers</a>
    `);
})

// http://localhost:3000/numbers/add?first=2&second=31
app.get('/numbers/add', (req, res) => {
    res.send(`${req.query.first} + ${req.query.second} = ${+req.query.first + +req.query.second}`);
});

// http://localhost:3000/numbers/multiply/2/3
app.get('/numbers/multiply/:firstNumber/:secondNumber', (req, res) => {
    const firstNumber = req.params.firstNumber;
    const secondNumber = req.params.secondNumber;

    res.send(`${firstNumber} * ${secondNumber} = ${firstNumber * secondNumber}`);
});

app.listen(3000, () => {
    console.log('Server is working');
});