const userDao = require('../dao/userDao');
const bcrypt = require('bcrypt');
const generateUserToken = require('../utils/genToken');

exports.login = async (data) => {
  try {
    const { account, password } = data;
    // 用戶是否存在
    const user = await userDao.getUserByAccount(account);

    if (!user) {
      return { code: 1, message: '帳號密碼錯誤' };
    }
    const { username, roleId } = user;
    // 檢查密碼是否正確
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return { code: 1, message: '帳號密碼錯誤' };
    }

    // 製作 token
    const token = generateUserToken(account);

    return { code: 1, message: '登入成功', data: { account, username, roleId, token } };
  } catch (error) {
    throw error;
  }
};
