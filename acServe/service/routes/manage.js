var express = require('express');
var router = express.Router();
var db = require('../lib/mysql.lib');
var commonUtil = require('../lib/util.lib');
var tokenLib = require('../lib/token.lib');
var codeGenerLib = require('../lib/codeGener.lib');
var dateLib = require('../lib/date.lib');

router.post('/create', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var objTemp = JSON.parse(JSON.stringify(req.body));
    for( var k in objTemp){
      objTemp = k;
    }
    objTemp = JSON.parse(objTemp);
    var obj = {
      usertel: objTemp.usertel,
      userpass: objTemp.userpass
    }
    var telFlag = await db.FindOne('user',{
      'userTel': obj.usertel
    });
    var data = {
      "code": 200,
      "message": "创建成功!"
    }
    if(!commonUtil.isEmpty(telFlag)){
      data = {
        "code": 0,
        "message": "该手机号已注册，创建失败!"
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
    }else if(telFlag[0].userTypeCode != 101){
      data = {"code": 101,"message": "该账号无权限，登录失败!"}
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
        "message": "登录成功!",
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
      "message": "当前可用!",
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

router.get('/page', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    let dataTemp = await db.FindAll('user', '');
    var data = {"code": 200,"message": "获取用户信息成功!"}
    data.data = dataTemp;
    res.json(data);
  })();
});
router.get('/page/:pageIndex/:pageSizeNum', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    let countNum = await db.COUNT('user','');
    let s = await db.PAGE('user','',req.params.pageIndex,req.params.pageSizeNum);
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

router.post('/edit', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var objTemp = JSON.parse(JSON.stringify(req.body));
    for( var k in objTemp){
      objTemp = k;
    }
    console.log(objTemp);
    objTemp = JSON.parse(objTemp);
    var obj = {userCode: objTemp.serveCode}
    var serveFlag = await db.FindOne('user',obj);
    var data = {
      "code": 200,
      "message": "操作成功!"
    }
    if(commonUtil.isEmpty(serveFlag)){
      data = {
        "code": 0,
        "message": "账号无权限，操作失败!"
      }
    }else{
      delete objTemp.serveCode;
      objTemp.updateTime = dateLib.getTimeStamp();
      await db.UPDATE('user', objTemp,{
        userCode: objTemp.userCode
      });
    }
    res.json(data);
  })();
  
});
router.post('/telcheck', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var obj = JSON.parse(JSON.stringify(req.body));
    for( var k in obj){
      obj = k;
    }
    obj = JSON.parse(obj);
    var data;
    //手机号正则	
    var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;	
    //电话	
    if (!phoneReg.test(obj.userTel)) {
      data = {"code": 101,"message": "请输入有效的手机号码!"}
    }else{
      var telFlag = await db.FindOne('user',{'userTel': obj.userTel});
    
      if(!commonUtil.isEmpty(telFlag)) {
        data = {"code": 101,"message": "该手机号已注册!"}
      }else{data = {"code": 200,"messgae": "可注册!"}}
    }
    
    res.json(data);
  })();
});

module.exports = router;
