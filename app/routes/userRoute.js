const express = require('express');
const router = express.Router();
const userCtrl = require('../controllors/userCtrl');

router.get('/', userCtrl.findAll);

router.post('/', userCtrl.create);

router.put('/updatePassword', userCtrl.updatePassword);

router.put('/', userCtrl.updateUser);

router.put('/updateDisable', userCtrl.updateDisable);

module.exports = router;
