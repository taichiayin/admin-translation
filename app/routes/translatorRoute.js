const express = require('express');
const router = express.Router();
const translatorCtrl = require('../controllors/translatorCtrl');

router.post('/', translatorCtrl.translator);

module.exports = router;