const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    let string = `Go to the <a href="http://localhost:3000/calculator">calculator</a>`;
    res.send(String(string));
});


// to serve html file
// 1. Serve your static files
app.use(express.static('/'));
// Create an API server that will listen for the requests coming from your frontend app
app.get('/calculator', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



//Using params
app.get('/calculator/:params', (req, res) => {
    const paramsName = req.params.params;
    const queryParameters = req.query;
    let result = undefined;

    for (let key in queryParameters) {
        const number = Number(queryParameters[key]);
        if (result === undefined) {
            result = number;
        } else {
            switch (paramsName) {
                case 'addition':
                    result += number;
                    break;
                case 'subtraction':
                    result -= number;
                    break;
                case 'multiplication':
                    result *= number;
                    break;
                case 'division':
                    result /= number;
                    break;
            }
        }
    }
    res.send(String(result));
})

// Using req.body
// app.post('/calculator', (req, res) => {
//     const method = req.body.method;
//     const queryParameters = req.query;
//     console.log(queryParameters, method);
//     let result = undefined;

//     for (let key in queryParameters) {
//         const number = Number(queryParameters[key]);
        
//         if (result === undefined) {
//             result = number;
//             console.log(result);
//         } else {
//             switch (method) {
//                 case 'addition':
//                     result += number;
//                     break;
//                 case 'subtraction':
//                     result -= number;
//                     break;
//                 case 'multiplication':
//                     result *= number;
//                     break;
//                 case 'division':
//                     result /= number;
//                     break;
//             }
//         }
//     }
//     res.send(String(result));
// })

app.listen(3000);