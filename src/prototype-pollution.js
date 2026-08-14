// Prototype Pollution — CWE-1321
const express = require('express');
const _ = require('lodash');

const router = express.Router();

// BAD: lodash.merge on user-controlled object
router.post('/settings', (req, res) => {
  const target = {};
  _.merge(target, req.body);                         // sink (source: req.body)
  res.json(target);
});

// BAD: recursive assignment allowing __proto__ traversal
function assign(target, src) {
  for (const k in src) {
    if (typeof src[k] === 'object' && src[k] !== null) {
      target[k] = target[k] || {};
      assign(target[k], src[k]);                     // sink
    } else {
      target[k] = src[k];
    }
  }
  return target;
}

router.post('/config', (req, res) => {
  const cfg = {};
  assign(cfg, req.body);                             // source: req.body
  res.json(cfg);
});

module.exports = router;
