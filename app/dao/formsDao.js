const { log } = require('winston');
const logger = require('../utils/logger');
const mysqlPool = require('../utils/mysqlPool');

class Forms {
  // 申請表單
  static async create(payload) {
    try {
      const {
        formNumber,
        act,
        platformTypeId,
        zhCN,
        enUS,
        viVN,
        thTH,
        ptBR,
        koKR,
        owner,
        formStatus,
        createDate,
        createUser,
        updateDate,
        updateUser,
      } = payload;

      const result = await mysqlPool.query(
        `INSERT INTO translation.flowForms (formNumber, act, platformTypeId, zhCN, enUS, viVN, thTH, ptBR, koKR, formStatus, owner, createDate, createUser, updateDate, updateUser) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          formNumber,
          act,
          platformTypeId,
          zhCN,
          enUS,
          viVN,
          thTH,
          ptBR,
          koKR,
          formStatus,
          owner,
          createDate,
          createUser,
          updateDate,
          updateUser,
        ],
      );

      return { code: 0, message: 'success' };
    } catch (error) {
      throw error;
    }
  }

  // 修改表單
  static async updateForm({
    formNumber,
    act,
    platformTypeId,
    zhCN,
    enUS,
    viVN,
    thTH,
    ptBR,
    koKR,
    formStatus,
    owner,
    createDate,
    createUser,
    updateDate,
    updateUser,
  }) {
    // Assuming there's an ID to identify which form to update
    const params = [];
    const values = [];

    if (platformTypeId !== undefined) {
      params.push('platformTypeId = ?');
      values.push(platformTypeId);
    }
    if (act !== undefined) {
      params.push('act = ?');
      values.push(act);
    }
    if (zhCN !== undefined) {
      params.push('zhCN = ?');
      values.push(zhCN);
    }
    if (enUS !== undefined) {
      params.push('enUS = ?');
      values.push(enUS);
    }
    if (viVN !== undefined) {
      params.push('viVN = ?');
      values.push(viVN);
    }
    if (thTH !== undefined) {
      params.push('thTH = ?');
      values.push(thTH);
    }
    if (ptBR !== undefined) {
      params.push('ptBR = ?');
      values.push(ptBR);
    }
    if (koKR !== undefined) {
      params.push('koKR = ?');
      values.push(koKR);
    }
    if (formStatus !== undefined) {
      params.push('formStatus = ?');
      values.push(formStatus);
    }
    if (owner !== undefined) {
      params.push('owner = ?');
      values.push(owner);
    }
    if (createDate !== undefined) {
      params.push('createDate = ?');
      values.push(createDate);
    }
    if (createUser !== undefined) {
      params.push('createUser = ?');
      values.push(createUser);
    }
    if (updateDate !== undefined) {
      params.push('updateDate = ?');
      values.push(updateDate);
    }
    if (updateUser !== undefined) {
      params.push('updateUser = ?');
      values.push(updateUser);
    }

    const sql = `UPDATE translation.flowForms SET ${params.join(', ')} WHERE formNumber = ?`;
    values.push(formNumber);

    try {
      await mysqlPool.query(sql, values);
      return { code: 0, message: 'success' };
    } catch (error) {
      throw new Error('Error updating form: ' + error.message);
    }
  }

  // 更新表單狀態
  static async updateStatus(formNumber, newformStatus) {
    const sql = 'UPDATE translation.flowForms SET formStatus = ? WHERE formNumber = ?';
    try {
      await mysqlPool.query(sql, [newformStatus, formNumber]);
      return { code: 0, message: 'success' };
    } catch (error) {
      throw new Error('Error updating order status: ' + error.message);
    }
  }

  // 查找表單
  static async findAll({ formNumber, act, formStatus, platformTypeId, zhCN }) {
    // Construct the base SQL query
    let sql = `SELECT * FROM translation.flowForms WHERE 1=1`;
    const conditions = [];
    const values = [];
    try {
      // Add conditions dynamically based on provided arguments
      if (formNumber) {
        conditions.push(`formNumber = ?`);
        values.push(formNumber);
      }
      if (formStatus !== undefined) {
        conditions.push(`formStatus = ?`);
        values.push(formStatus);
      }
      if (platformTypeId !== undefined) {
        conditions.push(`platformTypeId = ?`);
        values.push(platformTypeId);
      }
      if (zhCN) {
        conditions.push(`zhCN LIKE ?`);
        values.push(`%${zhCN}%`);
      }
      if (act) {
        conditions.push(`act = ?`);
        values.push(act);
      }

      // Combine the conditions with the base SQL query
      if (conditions.length) {
        sql += ' AND ' + conditions.join(' AND ');
      }

      const results = await mysqlPool.query(sql, values);

      return results;
    } catch (error) {
      throw new Error('Error finding flowForms: ' + error.message);
    }
  }

  // find by formNumber
  static async findByFormNumber(formNumber) {
    try {
      const results = await mysqlPool.query('SELECT * FROM translation.flowForms WHERE formNumber = ?', [formNumber]);
      return results;
    } catch (error) {
      throw new Error('Error finding flowForms: ' + error.message);
    }
  }

  // 駁回
  static async rejectForm({ formNumber, updateDate, updateUser }) {
    try {
      await mysqlPool.query('UPDATE translation.flowForms SET formStatus = 3, updateDate = ?, updateUser = ? WHERE formNumber = ?', [updateDate, updateUser, formNumber]);
      return { code: 0, message: 'success' };
    } catch (error) {
      throw new Error('Error finding flowForms: ' + error.message);
    }
  }


  // 撤單
  static async cancelForm({ formNumber, updateDate, updateUser }) {
    try {
      await mysqlPool.query('UPDATE translation.flowForms SET formStatus = 4, updateDate = ?, updateUser = ? WHERE formNumber = ?', [updateDate, updateUser, formNumber]);
      return { code: 0, message: 'success' };
    } catch (error) {
      throw new Error('Error finding flowForms: ' + error.message);
    }
  }

  static async getLatestSequenceNumber() {
    try {
      const latestForm = await mysqlPool.query(
        'SELECT * FROM translation.flowForms ORDER BY id DESC LIMIT 1',
      );
      let nextSequenceNumber = 1;

      if (latestForm.length > 0) {
        // const sequenceNumberStr = latestForm[0].id;
        // const sequenceNumber = parseInt(sequenceNumberStr, 10);
        nextSequenceNumber = latestForm[0].id + 1;
      }
      console.log('nextSequenceNumber:', nextSequenceNumber);

      const nextSequenceNumberStr = nextSequenceNumber.toString().padStart(3, '0');

      return nextSequenceNumberStr;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Forms;
