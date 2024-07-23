const { log } = require('winston');
const userDao = require('../dao/userDao');
const { hashPwd } = require('../utils/encode');
const bcrypt = require('bcrypt');
const logger = require('../utils/logger');

exports.create = async ({ account, username, password, roleId, loginAccount }) => {
  try {
    const data = {
      loginAccount,
      account,
      username,
      password: hashPwd(password),
      roleId,
      createDate: new Date(),
      createUser: loginAccount,
      updateDate: new Date(),
      updateUser: loginAccount
    }

    return await userDao.create(data);

  } catch (error) {
    throw error;
  }
};

exports.updatePassword = async ({ account, oldPassword, newPassword, loginAccount }) => {
  try {

    const user = await userDao.getUserByAccount(account);

    if (user.length === 0) {
      throw new Error('User not found');
    }

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      throw new Error('Old password is incorrect');
    }

    const data = {
      password: hashPwd(newPassword),
      updateDate: new Date(),
      updateUser: loginAccount
    }

    return await userDao.updatePassword(account, data);
  } catch (error) {
    throw error;
  }
}

// 修改使用者資料 (account, { username, roleId, disable, updateUser, updateDate })
exports.updateUser = async ({ account, username, roleId, disable, loginAccount }) => {
  try {

    const user = await userDao.getUserByAccount(account);

    if (user.length === 0) {
      throw new Error('User not found');
    }

    const data = {
      username,
      roleId,
      disable,
      updateDate: new Date(),
      updateUser: loginAccount
    }

    const result = await userDao.updateUser(account, data);

    return result;
  } catch (error) {
    throw error;
  }
}

exports.updateDisable = async (account, disable) => {
  try {
    return await userDao.updateDisable(account, disable);
  } catch (error) {
    throw error;
  }
}

// 查詢使用者
exports.findAll = async (data) => {
  try {
    const result = await userDao.findAll(data);
    return {code: 1, data: result};
  } catch (error) {
    throw error;
  }
}
