const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'my_database'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

app.get('/', (req, res) => {
  connection.query('SELECT * FROM my_table', (error, results, fields) => {
    if (error) {
      console.error('Error querying MySQL: ' + error.stack);
      return;
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});
