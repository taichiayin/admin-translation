const jwt = require('jsonwebtoken');
const config = require('../config/config').platform;
// const CryptoJS = require('crypto-js');

const JWT_SECRET = config.jwt_secret;
// const SALT = config.secret;
const expiresIn = config.exp;

function generateUserToken(account) {
  // 創建 JWT payload
  const payload = {
    account,
  };

  // 簽署 JWT
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
  // console.log('token', token);

  // 將 token 轉換為 16 位數的字串
  // const encryptedToken = CryptoJS.AES.encrypt(token, SALT).toString();

  return token;
}

module.exports = generateUserToken;
