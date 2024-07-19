const { log } = require('winston');
const logger = require('../utils/logger');
const mysqlPool = require('../utils/mysqlPool');


class User {
    static async create({ account, username, password, roleId, createDate, createUser, updateDate, updateUser }) {
        try {

            // 檢查帳號是否存在
            const user = await mysqlPool.query(
                'SELECT * FROM users WHERE account = ?',
                [account]
            );

            // 如果帳號已存在，回傳錯誤訊息
            if (user.length > 0) {
                logger.warn(`帳號已存在: ${account}`);
                return { code: 1, message: '帳號已存在' };
            }

            const result = await mysqlPool.query(
                'INSERT INTO users (account, username, password, roleId, createDate, createUser, updateDate, updateUser) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [account, username, password, roleId, createDate, createUser, updateDate, updateUser]
            );

            logger.info(`create user id: ${JSON.stringify(result.insertId)}`);
            return { code: 0, message: 'success' };
        } catch (error) {
            throw error
        }
    }

    // get user by account
    static async getUserByAccount(account) {
        try {
            const user = await mysqlPool.query(
                'SELECT * FROM users WHERE account = ?',
                [account]
            );

            return user[0];
        } catch (error) {
            throw error
        }
    }
}

module.exports = User;