require('dotenv').config();
const crypto = require('crypto');

function securedPassword(userpw) {
  let header = {
    'tpy': 'JWT',
    'alg': 'HS256',
  }

  let payload = {
    userpw,
  }

  const encodedHeader = Buffer.from(JSON.stringify(header))
    .toString('base64')
    .replace('=', '')
    .replace('==', '');

  const encodedPayload = Buffer.from(JSON.stringify(payload))
    .toString('base64')
    .replace('=', '')
    .replace('==', '');

  let signature = crypto.createHmac('SHA256', Buffer.from(`${process.env.salt}`))
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64')
    .replace('=', '');
  let jwt = `${encodedHeader}.${encodedPayload}.${signature}`
  return jwt;

}

module.exports = securedPassword;