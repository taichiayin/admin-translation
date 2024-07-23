const { log } = require('winston');
const logger = require('../utils/logger');
const mysqlPool = require('../utils/mysqlPool');


class User {
    static async findAll(data) {
        try {
            let sql = `SELECT a.account, a.username, a.roleId, disable FROM translation.users a WHERE 1=1`;
            const parmas = [];

            for (const [key, value] of Object.entries(data)) {
                if (key === 'username') {
                    parmas.push(`username LIKE '%${value}%'`);
                } else {
                    parmas.push(`${key} = ?`);
                }
            }

            if (parmas.length > 0) {
                sql += ` AND ${parmas.join(' AND ')}`;
            }

            const users = await mysqlPool.query(sql, Object.values(data));

            return users;
        } catch (error) {
            throw error;
        }
    }

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

            if (result.affectedRows === 0) {
                logger.error(`新增使用者失敗: ${account}`);
                return { code: 1, message: '新增使用者失敗' };
            }

            return { code: 0, message: 'success' };
        } catch (error) {
            throw error
        }
    }

    // 修改密碼 (account, { password, updateDate, updateUser })
    static async updatePassword(account, data) {
        try {
            const fields = [];
            const parmas = [];

            for (const [key, value] of Object.entries(data)) {
                fields.push(`${key} = ?`);
                parmas.push(value);
            }

            // Where condition
            parmas.push(account);

            const sql = `UPDATE translation.users SET ${fields.join(', ')} WHERE account = ?`;
            await mysqlPool.query(sql, parmas);

            return { code: 0, message: 'success' };
        } catch (error) {
            console.error('Error updating password:', error);
            throw error;
        }
    }

    // 修改使用者資料 (account, { username, roldId, disable, updateUser, updateDate })
    static async updateUser(account, data) {
        try {
            const fields = [];
            const parmas = [];

            for (const [key, value] of Object.entries(data)) {
                fields.push(`${key} = ?`);
                parmas.push(value);
            }

            // Where condition
            parmas.push(account);

            const sql = `UPDATE translation.users SET ${fields.join(', ')} WHERE account = ?`;
            await mysqlPool.query(sql, parmas);

            return { code: 0, message: 'success' };
        } catch (error) {
            console.error('Error updating username:', error);
            throw error;
        }
    }

    // update disable 
    static async updateDisable(account, disable) {
        try {
            const sql = 'UPDATE translation.users SET disable = ? WHERE account = ?';
            await mysqlPool.query(sql, [disable, account]);

            return { code: 0, message: 'success' };
        } catch (error) {
            console.error('Error updating disable:', error);
            throw error;
        }
    }

    // get user by account
    static async getUserByAccount(account) {
        try {
            const [user] = await mysqlPool.query(
                'SELECT * FROM users WHERE account = ?',
                [account]
            );

            return user;
        } catch (error) {
            throw error
        }
    }
}

module.exports = User;