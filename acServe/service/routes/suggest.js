
var express = require('express');
var router = express.Router();
var db = require('../lib/mysql.lib');
var commonUtil = require('../lib/util.lib');
var tokenLib = require('../lib/token.lib');
var codeGenerLib = require('../lib/codeGener.lib');
var dateLib = require('../lib/date.lib');

var flagDeal = function(s){
  for(var i=0;i<s.length;i++){
    s[i].isActive = 'dealNoActive';
   
    switch(parseInt(s[i].flag)){
      case 1:
        s[i].flag = '待处理';
        continue;
      case 2:
        s[i].flag = '已处理';
        s[i].isActive = 'dealActive';
        continue;
      default:
        s[i].flag = '未处理';
        break;
    }
  }

  return s;
}
router.post('/create', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var obj = JSON.parse(JSON.stringify(req.body));
    for( var k in obj){
      obj = k;
    }
    obj = JSON.parse(obj);

    var data = {
      "code": 200,
      "messgae": "创建成功!"
    }
   
    obj.createTime = dateLib.getTimeStamp();
    obj.updateTime = dateLib.getTimeStamp();
    obj.flag = 1;
    await db.INSERT('suggest', obj,'');

    return res.json(data);
  })();
  
});
router.get('/list', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var temp = req.query.code;
    let data = await db.FindAll('suggest', {
      userCode: temp
    },'createTime','desc');
    data = flagDeal(data);
    return res.json(data);
  })();
});
router.get('/page/:pageIndex/:pageSizeNum', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    let countNum = await db.COUNT('suggest','');
    let s = await db.PAGE('suggest','',req.params.pageIndex,req.params.pageSizeNum);
    
    var data = {
      "code": 200,
      "message": "获取用户信息成功!",
      "currentPage": req.params.pageIndex,
      "pageSizeNum": req.params.pageSizeNum,
      "count":countNum[0]['count(*)']
    }
    data = flagDeal(data);
    data.data = s;
    return res.json(data);
  })();

});

router.post('/edit', [commonUtil.jsonHeader], function(req, res, next) {
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

      obj.updateTime = dateLib.getTimeStamp();
      await db.INSERT('userservelog', { userCode: obj.serveCode,  did: '修改建议'+obj.Id+'为：'+JSON.stringify(obj), createTime: createTime, updateTime:updateTime },'');
      delete obj.serveCode;
      console.log(obj);
      await db.UPDATE('suggest', obj, { Id: obj.Id },'');


    return res.json(data);
  })();
  
});
router.post('/del', [commonUtil.jsonHeader], function(req, res, next) {
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

      await db.INSERT('userservelog', { userCode: obj.serveCode,  did: '删除建议'+obj.Id+'名为：'+obj.name, createTime: createTime, updateTime:updateTime },'');
      delete obj.serveCode;
      await db.DELETE('suggest', { Id: obj.Id },'');


    return res.json(data);
  })();
  
});

module.exports = router;
