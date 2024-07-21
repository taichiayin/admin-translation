const express = require('express');
const router = express.Router();
const formCtrl = require('../controllors/formCtrl');

// 查表
router.get('/', formCtrl.findAll);
// 修改
router.put('/', formCtrl.updateForm);
// 新增
router.post('/', formCtrl.create);

module.exports = router;
