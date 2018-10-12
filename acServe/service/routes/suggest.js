
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
   
    switch(s[i].flag){
      case 1:
      s[i].flag = '待处理';
      case 2:
      s[i].flag = '已处理';
      s[i].isActive = 'dealActive';
      default:
      s[i].flag = '未处理';
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
    for(var i=0;i<s.length;i++){
      s[i].isActive = 'dealNoActive';
     
      switch(s[i].flag){
        case 1:
        s[i].flag = '待处理';
        case 2:
        s[i].flag = '已处理';
        s[i].isActive = 'dealActive';
        default:
        s[i].flag = '未处理';
      }
    }
    data.data = s;
    return res.json(data);
  })();

});
router.post('/update', [commonUtil.jsonHeader], function(req, res, next) {
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
   
    obj.updateTime = dateLib.getTimeStamp();
    console.log(obj);
    await db.UPDATE('suggest', obj,{
      addressCode  : obj.addressCode
    });

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
      "message": "取消成功!",
      'data': obj
    }
    
    var createTime = dateLib.getTimeStamp();
    var updateTime = dateLib.getTimeStamp();

    await db.INSERT('userservelog', { userCode: obj.serveCode,  did: '删除建议'+obj.Id, createTime: createTime, updateTime:updateTime },'');
    delete obj.serveCode;
    await db.DELETE('suggest', { Id: obj.Id },'');

    return res.json(data);
  })();
});

module.exports = router;
