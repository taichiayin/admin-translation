const userDao = require('../dao/userDao');
const { hashPwd } = require('../utils/encode');
const logger = require('../utils/logger');

exports.create = async ({ account, username, password, roleId }) => {
  try {
    const data = {
      account,
      username,
      password: hashPwd(password),
      roleId,
      createDate: new Date(),
      createUser: 'system',
      updateDate: new Date(),
      updateUser: 'system'
    }

    return await userDao.create(data);

  } catch (error) {
    throw error;
  }
};

