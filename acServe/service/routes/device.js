
var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var db = require('../lib/mysql.lib');
var commonUtil = require('../lib/util.lib');
var codeGenerLib = require('../lib/codeGener.lib');
var dateLib = require('../lib/date.lib');

router.post('/create/:deName', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var obj = JSON.parse(JSON.stringify(req.body));
    for( var k in obj){
      obj = k;
    }
    obj = JSON.parse(obj);
    
    var data = {
      "code": 200,
      "message": "创建成功!",
      'data': obj
    }
    
    var createTime = dateLib.getTimeStamp();
    var updateTime = dateLib.getTimeStamp();
    if(req.params.deName == 'brand'){
      await db.INSERT('userservelog', { userCode: obj.serveCode,  did: '创建品牌：'+obj.name, createTime: createTime, updateTime:updateTime },'');
      delete obj.serveCode;
      await db.INSERT('debrand', { name: obj.name, createTime: createTime, updateTime:updateTime },'');
    }
    if(req.params.deName == 'mold'){
      await db.INSERT('userservelog', { userCode: obj.serveCode,  did: '创建类型：'+obj.name, createTime: createTime, updateTime:updateTime },'');
      delete obj.serveCode;
      await db.INSERT('demold', { name: obj.name, createTime: createTime, updateTime:updateTime },'');
    }
    if(req.params.deName == 'model'){
      obj.createTime = dateLib.getTimeStamp();
      obj.updateTime = dateLib.getTimeStamp(); 
      await db.INSERT('userservelog', { userCode: obj.serveCode,  did: '创建型号：'+obj.name, createTime: createTime, updateTime:updateTime },'');
      delete obj.serveCode;
      await db.INSERT('demodel', obj,'');
    }
    if(req.params.deName == 'time'){
      await db.INSERT('userservelog', { userCode: obj.serveCode,  did: '创建服务期：'+obj.name, createTime: createTime, updateTime:updateTime },'');
      delete obj.serveCode;
      await db.INSERT('detime', { name: obj.name, createTime: createTime, updateTime:updateTime },'');
    }

    res.json(data);
  })();
  
});
router.get('/list/:deName/:pageIndex/:pageSizeNum', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    let countNum;
    let s;
    if(req.params.deName == 'brand'){
      countNum = await db.COUNT('debrand','');
      s = await db.PAGE('debrand','',req.params.pageIndex,req.params.pageSizeNum);
    }
    if(req.params.deName == 'mold'){
      countNum = await db.COUNT('demold','');
      s = await db.PAGE('demold','',req.params.pageIndex,req.params.pageSizeNum);
    }
    if(req.params.deName == 'model'){
      countNum = await db.COUNT('demodel','');
      s = await db.PAGE('demodel','',req.params.pageIndex,req.params.pageSizeNum);
    }
    if(req.params.deName == 'time'){
      countNum = await db.COUNT('detime','');
      s = await db.PAGE('detime','',req.params.pageIndex,req.params.pageSizeNum);
    }
    
    var data = {
      "code": 200,
      "message": "获取用户信息成功!",
      "currentPage": req.params.pageIndex,
      "pageSizeNum": req.params.pageSizeNum,
      "count":countNum[0]['count(*)']
    }
    data.data = s;
    res.json(data);
  })();

});
router.get('/alllist/:deName', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    let s;
    if(req.params.deName == 'brand'){
      countNum = await db.COUNT('debrand','');
      s = await db.FindAll('debrand','');
    }
    if(req.params.deName == 'mold'){
      countNum = await db.COUNT('demold','');
      s = await db.FindAll('demold','');
    }
    if(req.params.deName == 'model'){
      countNum = await db.COUNT('demodel','');
      s = await db.FindAll('demodel','');
    }
    if(req.params.deName == 'time'){
      countNum = await db.COUNT('detime','');
      s = await db.FindAll('detime','');
    }
    
    var data = s;
    res.json(data);
  })();

});
router.post('/edit/:deName', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var obj = JSON.parse(JSON.stringify(req.body));
    for( var k in obj){
      obj = k;
    }
    obj = JSON.parse(obj);
    
    var data = {
      "code": 200,
      "message": "修改成功!"
    }
    
    var createTime = dateLib.getTimeStamp();
    var updateTime = dateLib.getTimeStamp();
    if(req.params.deName == 'brand'){
      await db.INSERT('userservelog', { userCode: obj.serveCode,  did: '修改品牌'+obj.Id+'为：'+obj.name, createTime: createTime, updateTime:updateTime },'');
      delete obj.serveCode;
      await db.UPDATE('debrand', { name: obj.name, updateTime:updateTime }, { Id: obj.Id },'');
    }
    if(req.params.deName == 'mold'){
      await db.INSERT('userservelog', { userCode: obj.serveCode,  did: '修改类型'+obj.Id+'为：'+obj.name, createTime: createTime, updateTime:updateTime },'');
      delete obj.serveCode;
      await db.UPDATE('demold', { name: obj.name, updateTime:updateTime }, { Id: obj.Id },'');
    }
    if(req.params.deName == 'model'){
      obj.updateTime = dateLib.getTimeStamp();
      await db.INSERT('userservelog', { userCode: obj.serveCode,  did: '修改型号'+obj.Id+'为：'+JSON.stringify(obj), createTime: createTime, updateTime:updateTime },'');
      delete obj.serveCode;
      console.log(obj);
      await db.UPDATE('demodel', obj, { Id: obj.Id },'');
    }
    if(req.params.deName == 'time'){
      await db.INSERT('userservelog', { userCode: obj.serveCode,  did: '修改类型'+obj.Id+'为：'+obj.name, createTime: createTime, updateTime:updateTime },'');
      delete obj.serveCode;
      await db.UPDATE('detime', { name: obj.name, updateTime:updateTime }, { Id: obj.Id },'');
    }

    res.json(data);
  })();
  
});
router.post('/del/:deName', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var obj = JSON.parse(JSON.stringify(req.body));
    for( var k in obj){
      obj = k;
    }
    obj = JSON.parse(obj);
    
    var data = {
      "code": 200,
      "message": "删除成功!",
      'data': obj
    }
    
    var createTime = dateLib.getTimeStamp();
    var updateTime = dateLib.getTimeStamp();
    if(req.params.deName == 'brand'){
      await db.INSERT('userservelog', { userCode: obj.serveCode,  did: '删除品牌'+obj.Id+'名为：'+obj.name, createTime: createTime, updateTime:updateTime },'');
      delete obj.serveCode;
      await db.DELETE('debrand', { Id: obj.Id },'');
    }
    if(req.params.deName == 'mold'){
      await db.INSERT('userservelog', { userCode: obj.serveCode,  did: '删除类型'+obj.Id+'名为：'+obj.name, createTime: createTime, updateTime:updateTime },'');
      delete obj.serveCode;
      await db.DELETE('demold', { Id: obj.Id },'');
    }
    if(req.params.deName == 'model'){
      await db.INSERT('userservelog', { userCode: obj.serveCode,  did: '删除型号'+obj.Id+'名为：'+obj.name, createTime: createTime, updateTime:updateTime },'');
      delete obj.serveCode;
      await db.DELETE('demodel', { Id: obj.Id },'');
    }
    if(req.params.deName == 'time'){
      await db.INSERT('userservelog', { userCode: obj.serveCode,  did: '删除服务期'+obj.Id+'名为：'+obj.name, createTime: createTime, updateTime:updateTime },'');
      delete obj.serveCode;
      await db.DELETE('detime', { Id: obj.Id },'');
    }

    res.json(data);
  })();
  
});

module.exports = router;
