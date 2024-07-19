const winston = require('winston');
const { format } = require('winston');
const { combine, timestamp, json, printf, colorize, errors } = format;
const path = require('path');
const moment = require('moment');

const logsFolder = path.join(path.resolve(), 'logs/')
const DATE = moment().format('YYYYMM');

const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
  // let reqId;
  // if (level.indexOf('sql') > -1) {
  //     message = `\x1b[31m${message}\x1b[0m`;
  // } else {
  //     // async method 会抓不到该 reqId
  //     const namespace = getNamespace('dashboard.platform');
  //     reqId = namespace && namespace.get('reqId') ? namespace.get('reqId') : '';
  // }
  return `${timestamp} ${level} : ${typeof message === 'object' && message !== null ? JSON.stringify(message, null, 4) : message}\n ` + `${metadata.stack || ''}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  // defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console({
      // level: level(),
      format: combine(logFormat)
    }),
    new winston.transports.File({
      filename: `${logsFolder}${DATE}.log`,
      json: true,
      datePattern: 'YYYYMMDD'
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  );
}

module.exports = logger;
