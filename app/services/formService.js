const formsDao = require('../dao/formsDao');
const moment = require('moment');

exports.create = async ({ act, platformTypeId, zhCN, enUS, viVN, thTH, ptBR, koKR, account }) => {
  try {
    const lastNumber = await formsDao.getLatestSequenceNumber();

    const data = {
      formNumber: moment().format(`TRYYMMDD${lastNumber}`),
      act,
      platformTypeId,
      zhCN,
      enUS,
      viVN,
      thTH,
      ptBR,
      koKR,
      owner: '',
      formStatus: 1,
      createDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      createUser: account,
      updateDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      updateUser: account,
    };

    return await formsDao.create(data);
  } catch (error) {
    throw error;
  }
};
