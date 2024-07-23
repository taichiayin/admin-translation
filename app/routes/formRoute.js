const express = require('express');
const router = express.Router();
const formCtrl = require('../controllors/formCtrl');

// 查表
router.get('/', formCtrl.findAll);
// 翻譯完成
router.post('/excu', formCtrl.excTranslate);
// 新增
router.post('/', formCtrl.create);
// 撤單
router.put('/cancel', formCtrl.cancelForm);
// 駁回
router.put('/reject', formCtrl.rejectForm);

module.exports = router;
