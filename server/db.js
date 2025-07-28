// // db.js
// require('dotenv').config(); // ✅ Load environment variables
// const mysql = require('mysql');
// const util = require('util');

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// // ✅ Add promise support for async/await
// db.query = util.promisify(db.query).bind(db);

// module.exports = db;
require('dotenv').config();
const mysql = require('mysql');
const util = require('util');
const url = require('url');

let dbConfig;

if (process.env.DATABASE_URL) {
  // ✅ If DATABASE_URL is provided (Railway)
  const dbUrl = new URL(process.env.DATABASE_URL);
  dbConfig = {
    host: dbUrl.hostname,
    port: dbUrl.port,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.replace('/', ''),
  };
} else {
  // ✅ Fallback to local .env configuration
  dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
}

const db = mysql.createConnection(dbConfig);

// Add promise support
db.query = util.promisify(db.query).bind(db);

module.exports = db;
