// Reflected XSS — CWE-79
const express = require('express');
const router = express.Router();

// BAD: interpolating req.query into HTML response
router.get('/greet', (req, res) => {
  const name = req.query.name;                       // source
  res.type('html').send(`<h1>Hello, ${name}!</h1>`); // sink
});

// BAD: res.write with unescaped input
router.get('/search', (req, res) => {
  const q = req.query.q;                             // source
  res.type('html');
  res.write('<p>You searched: ' + q + '</p>');       // sink
  res.end();
});

module.exports = router;
