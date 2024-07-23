const express = require('express');
const router = express.Router();
const platformCtrl = require('../controllors/platformCtrl');

router.post('/login', platformCtrl.login);

module.exports = router;