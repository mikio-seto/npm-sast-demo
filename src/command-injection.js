// OS Command Injection — CWE-78
const express = require('express');
const { exec, execSync } = require('child_process');

const router = express.Router();

// BAD: exec with user-controlled host
router.get('/ping', (req, res) => {
  const host = req.query.host;                       // source
  exec('ping -c 1 ' + host, (err, stdout) => {       // sink
    res.type('text/plain').send(stdout);
  });
});

// BAD: execSync with template literal
router.post('/backup', (req, res) => {
  const name = req.body.name;                        // source
  const out = execSync(`tar czf /tmp/${name}.tgz /var/www`); // sink
  res.send(out.toString());
});

module.exports = router;
