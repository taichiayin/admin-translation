const platformDao = require('../dao/platformDao');

exports.login = async (data) => {
//   const user = new User(userData);

  // 用戶是否存在
  const user = await platformDao.getUser(data.username);

  return await user.save();
};

