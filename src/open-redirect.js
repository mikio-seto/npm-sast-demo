// Open Redirect — CWE-601
const express = require('express');
const router = express.Router();

// BAD: user-controlled URL passed straight to res.redirect
router.get('/go', (req, res) => {
  const next = req.query.next;                       // source
  res.redirect(next);                                // sink
});

// BAD: Location header set from tainted input
router.get('/next', (req, res) => {
  const url = req.query.url;                         // source
  res.setHeader('Location', url);                    // sink
  res.status(302).end();
});

module.exports = router;
