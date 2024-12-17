const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Change this if you are using a different user
  password: '',  // Enter your password if necessary
  database: 'admissions_express',  // Name of your database
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + db.threadId);
});

module.exports = db;
