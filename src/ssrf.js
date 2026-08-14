// Server-Side Request Forgery — CWE-918
const express = require('express');
const axios = require('axios');
const http = require('http');

const router = express.Router();

// BAD: user-controlled URL passed to axios
router.get('/fetch', async (req, res) => {
  const url = req.query.url;                         // source
  const r = await axios.get(url);                    // sink
  res.send(r.data);
});

// BAD: user-controlled URL passed to http.get
router.get('/proxy', (req, res) => {
  const target = req.query.target;                   // source
  http.get(target, (upstream) => upstream.pipe(res)); // sink
});

module.exports = router;
