const formService = require('../services/formService');

exports.create = async (req, res, next) => {
  try {
    const user = await formService.create({ account: req.account, ...req.body });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateForm = async (req, res, next) => {
  try {
    const user = await formService.updateForm(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const user = await formService.findAll();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
