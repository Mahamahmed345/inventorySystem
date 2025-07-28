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
// db.js
require('dotenv').config(); // Load environment variables
const mysql = require('mysql2');
const util = require('util');
const url = require('url');



let db;

if (process.env.DATABASE_URL) {
  // ✅ Production: Parse DATABASE_URL
  const dbUrl = url.parse(process.env.DATABASE_URL);
  const [user, password] = dbUrl.auth.split(':');

  db = mysql.createConnection({
    host: dbUrl.hostname,
    port: dbUrl.port,
    user,
    password,
    database: dbUrl.pathname.replace('/', ''),
  });
} else {
  // ✅ Development: Use local DB environment variables
  db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'userdetails',
  });
}

// Enable promise-based queries
db.query = util.promisify(db.query).bind(db);

module.exports = db;
