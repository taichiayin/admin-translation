const mysql = require('mysql2');
   const dbConfig = require('../config/config').db;

   const pool = mysql.createPool({
     host: dbConfig.host,
     user: dbConfig.username,
     password: dbConfig.password,
     database: dbConfig.database,
     waitForConnections: true,
     connectionLimit: 10,
     queueLimit: 0
   });

   // 轉換為 Promise 版本
   const promisePool = pool.promise();

   module.exports = promisePool;