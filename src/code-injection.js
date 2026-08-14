// Code Injection — CWE-94 / CWE-95
const express = require('express');
const router = express.Router();

// BAD: eval on user input
router.get('/calc', (req, res) => {
  const expr = req.query.expr;                       // source
  const result = eval(expr);                         // sink
  res.json({ result });
});

// BAD: Function constructor with tainted body
router.post('/run', (req, res) => {
  const body = req.body.code;                        // source
  const fn = new Function(body);                     // sink
  res.json({ result: fn() });
});

// BAD: setTimeout with string arg (evaluated as code)
router.get('/later', (req, res) => {
  const code = req.query.code;                       // source
  setTimeout(code, 1000);                            // sink
  res.end();
});

module.exports = router;
