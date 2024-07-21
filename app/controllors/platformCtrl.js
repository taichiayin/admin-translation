const platformService = require('../services/platformService');

exports.login = async (req, res, next) => {
  try {
    const user = await platformService.login(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
