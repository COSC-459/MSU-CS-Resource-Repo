// backend/db.js
const mysql = require('mysql2');  // Use mysql2 instead of mysql

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',            // MySQL username
  password: 'MOREnike@4412',  // MySQL password
  database: 'msu_resource'  // Database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = db;
