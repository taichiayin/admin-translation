const translator = require('../services/translatorService');

exports.translator = async (req, res, next) => {
  try {
    const { input } = req.body;

    const data = await translator.translate(input);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
