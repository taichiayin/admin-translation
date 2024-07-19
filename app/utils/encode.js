const bcrypt = require('bcrypt');

const defaultSaltRounds = 10;

module.exports.hashPwd = function hashPwd (password, saltRounds = defaultSaltRounds) {
    return bcrypt.hashSync(password, saltRounds);
};