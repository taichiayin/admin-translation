const userService = require('../services/userService');

// 新增使用者
exports.create = async (req, res, next) => {
  try {
    const user = await userService.create({ loginAccount: req.account, ...req.body });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};


exports.updatePassword = async (req, res, next) => {
  try {
    if (!req.body.account) {
      throw new Error('account is required');
    }

    if (!req.body.oldPassword || !req.body.newPassword) {
      throw new Error('oldPassword and newPassword are required');
    }

    const user = await userService.updatePassword({ loginAccount: req.account, ...req.body });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    if (!req.body.account) {
      throw new Error('account is required');
    }

    const user = await userService.updateUser({ loginAccount: req.account, ...req.body });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

exports.updateDisable = async (req, res, next) => {
  try {
    if (!req.body.account) {
      throw new Error('account is required');
    }

    if (!req.body.disable === 0 || !req.body.disable === 1) {
      throw new Error('disable is required');
    }

    const user = await userService.updateDisable(req.body.account, req.body.disable);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

exports.findAll = async (req, res, next) => {
  try {
    const users = await userService.findAll(req.query);
    res.json(users);
  } catch (error) {
    next(error);
  }
}