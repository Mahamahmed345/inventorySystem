// // index.js

// // Dependencies
// const express = require('express');
// const cors = require('cors');
// const db = require('./db'); // Import DB connection
// const importExcelRoute = require('./routes/importExcelRoute'); // Make sure this file exists

// const app = express();

// app.use(express.json());
// app.use(cors());

// // Routes

// // ✅ Signup Route
// app.post('/signup', (req, res) => {
//   const { Email, Name, Password } = req.body;
//   const SQL = 'INSERT INTO users (email, name, password) VALUES (?, ?, ?)';
//   const Values = [Email, Name, Password];

//   db.query(SQL, Values, (err, results) => {
//     if (err) return res.send(err);
//     console.log('✅ User inserted successfully!');
//     res.send({ message: 'User added!' });
//   });
// });
// app.get('/', (req, res) => {
//   res.send('Hello, world!');
// });
// // ✅ Login Route
// app.post('/login', (req, res) => {
//   const { LoginEmail, LoginPassword } = req.body;
//   const SQL = 'SELECT * FROM users WHERE Email = ? AND password = ?';
//   const Values = [LoginEmail, LoginPassword];

//   db.query(SQL, Values, (err, results) => {
//     if (err) return res.send({ error: err });
//     if (results.length > 0) return res.send(results);
//     res.send({ message: `Credentials don't match!` });
//   });
// });

// // ✅ Excel Upload Route
// app.use('/', importExcelRoute);

// // ✅ Start server (Only ONE listen call)
// app.listen(3002, () => console.log('🚀 Server running on port 3002'));


// In your server/index.js or app.js file

const express = require('express');
const db = require('./db'); // or correct path to db.js
const app = express();

app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT 1 + 1 AS result');
    res.send(`Database connected! Test result: ${result[0].result}`);
  } catch (err) {
    console.error('DB connection error:', err);
    res.status(500).send('Database connection failed');
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
