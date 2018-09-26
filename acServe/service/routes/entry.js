var express = require('express');
var router = express.Router();
var db = require('../lib/mysql.lib');
var commonUtil = require('../lib/util.lib');
var tokenLib = require('../lib/token.lib');
var codeGenerLib = require('../lib/codeGener.lib');
var dateLib = require('../lib/date.lib');

router.post('/create', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var obj = JSON.parse(JSON.stringify(req.body));
    for( var k in obj){
      obj = k;
    }
    obj = JSON.parse(obj);
    var telFlag = await db.FindOne('user',{
      'userTel': obj.usertel
    });
    var data = {
      "code": 200,
      "messgae": "创建成功!"
    }
    if(!commonUtil.isEmpty(telFlag)){
      data = {
        "code": 0,
        "messgae": "该手机号已注册，创建失败!"
      }
    }else{
      var userCode = codeGenerLib.generCode();
      while(1){
        var flag = await db.FindOne('user',{'userCode': userCode})
        if(commonUtil.isEmpty(flag)) break;

        userCode = codeGenerLib.generCode();
      }
      obj.userCode = userCode;
      obj.createTime = dateLib.getTimeStamp();
      obj.updateTime = dateLib.getTimeStamp();
      await db.INSERT('user', obj,'');
    }
    res.json(data);
  })();
  
});
router.get('/page', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    let data = await db.FindAll('user', '');
    res.json(data);
  })();
});

router.post('/login', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var obj = JSON.parse(JSON.stringify(req.body));
    for( var k in obj){
      obj = k;
    }
    obj = JSON.parse(obj);
    var telFlag = await db.FindOne('user',{
      'userTel': obj.usertel
    });
    var data;
    if(commonUtil.isEmpty(telFlag)) {
      data = {"code": 101,"message": "该手机号未注册，登录失败!"}
    }else if(obj.userpass == telFlag[0].userPass){
      var userToken = tokenLib.createToken({
        userCode: telFlag[0].userCode
      },600)

      await db.UPDATE('user', {'token': userToken},{'userTel': obj.usertel});
      await db.INSERT('userlog',{
        'userCode': telFlag[0].userCode,
        'createTime': dateLib.getTimeStamp(),
        'updateTime': dateLib.getTimeStamp()
      });
      
      data = {
        "code": 200,
        "messgae": "登录成功!",
        "token": userToken,
        "userCode": telFlag[0].userCode
      }
    }
    res.json(data);
  })();
});
router.get('/checkToken', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var temp = req.query.token;

    var data = {
      "code": 200,
      "messgae": "当前可用!",
      "token": temp
    }
    var tokenFlag = tokenLib.checkToken(temp);
    if(!tokenFlag) data = {"code": 101,"messgae": "当前已过期!"}
    data.flag = tokenFlag;

    res.json(data);
  })();
});
router.get('/del', function(req, res, next) {
  (async ()=>{
    let s = await db.DELETE('user', {
      username  : 'Juvos'
    });
    console.log(s);
  })();

  res.send('respond with a resource');
});
router.get('/page', function(req, res, next) {
  (async ()=>{
    let s = await db.PAGE('user','');
    console.log(s);
  })();

  res.send('respond with a resource');
});
router.get('/page/:pageNum', function(req, res, next) {
  (async ()=>{
    console.log(req.params.pageNum);
    let s = await db.PAGE('user','',req.params.pageNum);
    console.log(s);
  })();

  res.send('respond with a resource');
});

module.exports = router;
