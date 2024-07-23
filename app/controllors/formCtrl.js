const formService = require('../services/formService');

exports.create = async (req, res, next) => {
  try {
    const { act, platformTypeId, zhCN } = req.body;

    if (!act || !platformTypeId || !zhCN) {
      throw new Error('act, platformTypeId, zhCN are required');
    }
    
    const data = await formService.create({ loginAccount: req.account, ...req.body });
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

exports.excTranslate = async (req, res, next) => {
  try {
    const { formNumber } = req.body;

    if (!formNumber) {
      throw new Error('formNumber is required');
    }

    const data = await formService.excTranslate({ loginAccount: req.account, ...req.body });
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const data = await formService.findAll(req.query);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.cancelForm = async (req, res, next) => {
  try {
    const { formNumber } = req.body;

    if (!formNumber) {
      throw new Error('formNumber is required');
    }

    const data = await formService.cancelForm({ loginAccount: req.account, ...req.body });
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
}

exports.rejectForm = async (req, res, next) => {
  try {
    const { formNumber } = req.body;

    if (!formNumber) {
      throw new Error('formNumber is required');
    }

    const data = await formService.rejectForm({ loginAccount: req.account, ...req.body });
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
}