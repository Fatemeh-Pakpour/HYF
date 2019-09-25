//console.log(process.env);

const mysql = require('mysql');
require("dotenv").config();
const pool = mysql.createPool({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASS,
  database : process.env.DB,
  port : process.env.PORT
});

// const {
//     HOST,
//     USER,
//     PASS,
//     DB
// } = process.env;


pool.getConnection((err, connection) => {
    if (err) {  
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.error("Database connection was closed.");
      }
      if (err.code === "ER_CON_COUNT_ERROR") {
        console.error("Database has too many connections.");
      }
      if (err.code === "ECONNREFUSED") {
        console.error("Database connection was refused.");
      }
    }
    if (connection) connection.release();
    console.log('Works')
    return;
  });

  
 