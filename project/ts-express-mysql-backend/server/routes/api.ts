var express = require('express');
var router = express.Router();
import controllerAPI = require('../controller/api')

// 图片上传
router.post('/file_upload', async function (req, res, next) {
  try {
    await controllerAPI.upload(req)
    res.send('success')
  } catch (err) {
    console.log(err);
  }
})

// 图片展示
router.get('/list', async function (req, res, next) {
  try {
    const list = await controllerAPI.getList(req)
    res.send(list)
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;
