const db = require('../config/config').db;
const mysql = require('mysql2/promise');

const pool = mysql.createPool(db);

class Platform {
    static async login(userData) {
        // const [result] = await pool.query(
        //   'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
        //   [userData.name, userData.email, userData.age]
        // );

        return { id: result.insertId, ...userData };
    }
}

module.exports = Platform;