// Path Traversal — CWE-22
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// BAD: user-controlled path in fs.readFile
router.get('/download', (req, res) => {
  const file = req.query.file;                       // source
  fs.readFile('/var/www/uploads/' + file, (err, data) => { // sink
    if (err) return res.status(404).end();
    res.send(data);
  });
});

// BAD: path.join with tainted input still allows ../
router.get('/read', (req, res) => {
  const name = req.query.name;                       // source
  const full = path.join('/var/data', name);
  res.send(fs.readFileSync(full));                   // sink
});

module.exports = router;
