const express = require('express');
const config = require('./config/config');
const errorHandler = require('./utils/errorHandler');
// const db = require('./utils/db');
const logger = require('./utils/logger');

const userRouter = require('./routes/user');
const platformRouter = require('./routes/platform');

const app = express();

app.use(express.json());

// 日誌
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use('/', platformRouter);
app.use('/user', userRouter);

app.use('/yeah', (req, res) => {
  res.send('Yeah!');
});

// 錯誤處理
app.use(errorHandler);

const PORT = config.platform.port || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// 優雅關閉
// process.on('SIGINT', () => {
//   db.end((err) => {
//     if (err) {
//       console.error('Error closing database connections:', err);
//       logger.error(`Error closing database connections:`, err);
//       process.exit(1);
//     }
//     logger.info('Database connections closed');
//     server.close(() => {
//       logger.info('HTTP server closed');
//       process.exit(0);
//     });
//   });
// });
