const mysql = require("mysql2");
require("dotenv").config();
const pool = mysql.createPool({
  host: "localhost",
  user: process.env.sqlusername,
  password: process.env.sqlpassword,
  database: "cointab",
  connectionLimit: 10,
});

const connection = pool.promise();

module.exports = { connection };
