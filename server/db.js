// // db.js
require('dotenv').config(); // ✅ Load environment variables
const mysql = require('mysql');
const util = require('util');

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
const isProduction = process.env.NODE_ENV === 'production';

let dbConfig;

if (isProduction && process.env.DATABASE_URL) {
  const dbUrl = new URL(process.env.DATABASE_URL);
  dbConfig = {
    host: dbUrl.hostname,
    port: dbUrl.port,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.substring(1),
  };
} else {
  dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
}

const db = mysql.createConnection(dbConfig);
db.query = util.promisify(db.query).bind(db);

module.exports = db;
