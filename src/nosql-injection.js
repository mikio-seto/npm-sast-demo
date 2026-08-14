// NoSQL Injection — CWE-943
const express = require('express');
const { MongoClient } = require('mongodb');

const router = express.Router();
let coll;
MongoClient.connect('mongodb://localhost:27017').then((c) => {
  coll = c.db('app').collection('users');
});

// BAD: req.body directly used as query object → operator injection
router.post('/login', async (req, res) => {
  const { username, password } = req.body;           // source
  const user = await coll.findOne({                  // sink
    username: username,
    password: password,
  });
  res.json(user);
});

// BAD: $where clause with tainted string
router.get('/search', async (req, res) => {
  const term = req.query.q;                          // source
  const rows = await coll.find({
    $where: `this.name == '${term}'`,                // sink (JS eval'd on server)
  }).toArray();
  res.json(rows);
});

module.exports = router;
