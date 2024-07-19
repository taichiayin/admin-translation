require('dotenv').config();
module.exports = Object.freeze({
    platform:{
        port: process.env.PLATFORM_PORT || 3000,
        secret: process.env.PLATFORM_SECRET_KEY
    },
    db:{
        username: process.env.DEFAULT_DB_MASTER_USER,
        password: process.env.DEFAULT_DB_MASTER_PASSWORD,
        host: process.env.DEFAULT_DB_MASTER_HOST,
        port: process.env.DEFAULT_DB_MASTER_PORT,
        database: process.env.DEFAULT_DB_MASTER_DATABASE
    }

})