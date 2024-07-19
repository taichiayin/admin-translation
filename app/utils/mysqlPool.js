const mysql = require('mysql2/promise');
const dbConfig = require('../config/config').db;
const logger = require('./logger');


class MysqlPool {
    constructor() {
        this.pool = mysql.createPool(dbConfig)
    }

    async query(sql, values) {
        try {
            // 組出完整的 SQL 語句
            sql = mysql.format(sql, values);
            logger.info(`Executing query: ${sql}`);

            const [rows] = await this.pool.query(sql);
            return rows;
        } catch (error) {
            logger.error(`Error executing query: ${error}`);
        }
    }
}

module.exports = new MysqlPool();
