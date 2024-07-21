const jwt = require('jsonwebtoken');
const config = require('../config/config').platform;
// const CryptoJS = require('crypto-js');

const JWT_SECRET = config.jwt_secret;
// const SALT = config.secret;

function verifyUserToken(req, res, next) {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).json({ code: 1, message: 'No token provided.' });
  }

  try {
    // 解密 token
    // const fullToken = CryptoJS.AES.decrypt(token, SALT);

    // 驗證 JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    if (Date.now() > decoded.exp * 1000) {
      return res.status(401).json({ code: 1, message: 'Token expired.' });
    }

    // 將用戶信息附加到請求對象
    req.account = decoded.account;

    // 繼續下一個中間件或路由處理器
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ code: 1, message: 'Failed to authenticate token.', error: error.message });
  }
}

module.exports = verifyUserToken;
