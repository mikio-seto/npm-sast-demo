// ReDoS — CWE-1333
const express = require('express');
const router = express.Router();

// BAD: catastrophic backtracking regex on tainted input
router.get('/validate', (req, res) => {
  const input = req.query.s;                         // source
  const ok = /^(a+)+$/.test(input);                  // sink
  res.json({ ok });
});

// BAD: nested quantifier on user email
router.get('/email', (req, res) => {
  const email = req.query.email;                     // source
  const ok = /^([a-zA-Z0-9]+)*@example\.com$/.test(email); // sink
  res.json({ ok });
});

module.exports = router;
