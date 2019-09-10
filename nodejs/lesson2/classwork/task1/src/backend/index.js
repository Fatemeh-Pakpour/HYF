const express = require('express');
const app = express();

//Restful api HTTP methods:
//Get - get data, POST - add data, PUT - edit data, DELETE - delete data

// GET /users?newerTahn=30&olderThan=15
// POST /users + body {"email": "", "name": ""}

// app.get('/users', (req, res) => {
//     res.send('get');
// })

// app.post('/users', (req, res) => {
//     res.send('post');
// })

app.get('/users/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    console.log(id);
    res.send(`id: ${id}`);
})


app.get("/users", (req, res) => {
    console.log(req.query)
    res.send(req.query.olderThan);
});
app.listen(4000);




// if(req.query.gradAfter > array.gradYear){
//     res.send(array.gradYear);
// }
// else{
//     res.send('0')
// }