// Hardcoded Credentials — CWE-798
// BAD: secrets committed to source
const DB_PASSWORD = 'P@ssw0rd123!';
const AWS_ACCESS_KEY_ID = 'AKIAIOSFODNN7EXAMPLE';
const AWS_SECRET_ACCESS_KEY = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY';
const JWT_SECRET = 'super-secret-jwt-signing-key-do-not-share';
const GITHUB_TOKEN = 'ghp_1234567890abcdefghijklmnopqrstuvwxyzAB';

function dsn() {
  return `mysql://root:${DB_PASSWORD}@db.internal/app`;
}

function awsHeader() {
  return `AWS ${AWS_ACCESS_KEY_ID}:${AWS_SECRET_ACCESS_KEY}`;
}

const jwt = require('jsonwebtoken');
function sign(payload) {
  // BAD: signing with hardcoded secret
  return jwt.sign(payload, JWT_SECRET);
}

module.exports = { dsn, awsHeader, sign, GITHUB_TOKEN };
