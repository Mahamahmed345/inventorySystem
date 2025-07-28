// // db.js
require('dotenv').config(); // ✅ Load environment variables
const mysql = require('mysql2');
const util = require('util');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ✅ Add promise support for async/await
db.query = util.promisify(db.query).bind(db);

module.exports = db;
