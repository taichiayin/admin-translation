const logger = require('./logger');

module.exports = (err, req, res, next) => {
  logger.error('Error:', err);
  res.status(500).json({ code:1, message: err.message });
};
