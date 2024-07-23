const formsDao = require('../dao/formsDao');
const moment = require('moment');

exports.create = async ({ act, platformTypeId, zhCN, enUS, viVN, thTH, ptBR, koKR, loginAccount }) => {
  try {
    const lastNumber = await formsDao.getLatestSequenceNumber();

    const data = {
      formNumber: moment().format(`TRYYMMDD${lastNumber}`),
      act,
      platformTypeId,
      zhCN,
      enUS: enUS || '',
      viVN: viVN || '',
      thTH: thTH || '',
      ptBR: ptBR || '',
      koKR: koKR || '',
      owner: '',
      formStatus: 1,
      createDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      createUser: loginAccount,
      updateDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      updateUser: loginAccount,
    };

    return await formsDao.create(data);
  } catch (error) {
    throw error;
  }
};

exports.excTranslate = async ({ formNumber, zhCN, enUS, viVN, thTH, ptBR, koKR, loginAccount }) => {
  try {
    const form = await formsDao.findByFormNumber(formNumber);

    if (form.length === 0) {
      throw new Error('Form not found');
    }

    const data = {
      formNumber,
      zhCN,
      enUS,
      viVN,
      thTH,
      ptBR,
      koKR,
      formStatus: 2,
      owner: loginAccount,
      updateDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      updateUser: loginAccount,
    };
    return await formsDao.updateForm(data);
  } catch (error) {
    throw error;
  }
}

exports.rejectForm = async ({ formNumber, loginAccount }) => {
  try {
    const form = await formsDao.findByFormNumber(formNumber);

    if (form.length === 0) {
      throw new Error('Form not found');
    }

    const data = {
      formNumber,
      updateDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      updateUser: loginAccount,
    };
    return await formsDao.rejectForm(data);
  } catch (error) {
    throw error;
  }
}

exports.cancelForm = async ({ formNumber, loginAccount }) => {
  try {
    const form = await formsDao.findByFormNumber(formNumber);

    if (form.length === 0) {
      throw new Error('Form not found');
    }

    const data = {
      formNumber,
      updateDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      updateUser: loginAccount,
    };
    return await formsDao.cancelForm(data);
  } catch (error) {
    throw error;
  }
}


exports.findAll = async (data) => {
  try {
    const result = await formsDao.findAll(data);
    return { code: 1, data: result };
  } catch (error) {
    throw error;
  }
}
