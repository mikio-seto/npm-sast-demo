// SQL Injection — CWE-89
const express = require('express');
const mysql = require('mysql');

const router = express.Router();
const conn = mysql.createConnection({
  host: 'localhost', user: 'root', password: 'root', database: 'app',
});

// BAD: string concatenation of req.query into SQL
router.get('/user', (req, res) => {
  const id = req.query.id;                                   // source
  const sql = "SELECT * FROM users WHERE id = " + id;        // sink
  conn.query(sql, (err, rows) => res.json(rows));
});

// BAD: template literal of req.body into SQL
router.post('/login', (req, res) => {
  const { user, pass } = req.body;                           // source
  conn.query(
    `SELECT 1 FROM users WHERE name='${user}' AND pw='${pass}'`, // sink
    (err, rows) => res.json(rows)
  );
});

module.exports = router;
