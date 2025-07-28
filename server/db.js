// // db.js
require('dotenv').config(); // ✅ Load environment variables
const mysql = require('mysql2');
const util = require('util');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'userdetails',
});
// ✅ Add promise support for async/await
db.query = util.promisify(db.query).bind(db);

module.exports = db;
