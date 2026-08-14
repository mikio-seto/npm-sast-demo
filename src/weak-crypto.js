// Weak Cryptography — CWE-327 / CWE-328 / CWE-338
const crypto = require('crypto');

// BAD: MD5 for password hashing
function hashPassword(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}

// BAD: SHA1 is broken
function fingerprint(data) {
  return crypto.createHash('sha1').update(data).digest('hex');
}

// BAD: DES-ECB with static IV
function encrypt(plain, key) {
  const cipher = crypto.createCipheriv('des-ecb', key, Buffer.alloc(0));
  return Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
}

// BAD: Math.random for security tokens
function token() {
  return Math.random().toString(36).slice(2);
}

module.exports = { hashPassword, fingerprint, encrypt, token };
