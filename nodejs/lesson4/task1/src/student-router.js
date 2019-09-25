const express = require('express');
const Student = require('./student');

const studentRouter = express.Router();

studentRouter.get('/', (req, res) => {
    res.send([]);
})

studentRouter.post('/', (req, res, next) => {
    const { body } = req;
       
    // for(key in body){
    //     if (body[key] === undefined){
    //         res.send(`You have missed ${body[key]}`);
    //     }
    //     else{
    //         res.send(student);
    //     }
    // }

    // if(body.name === undefined || body.grade === undefined){
    //     res.send('You should provide name and grade');
    // }
    // else{
    //     res.send(student);
    // }
    
   try{
        const student = new Student(body);
        res.send(student);
   }
   catch(err) {
        res.status(400);
        next(err);
   }
})

module.exports = { studentRouter };