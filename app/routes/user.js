const express = require('express');
const router = express.Router();
const userCtrl = require('../controllors/userCtrl');

router.post('/', userCtrl.create);

module.exports = router;