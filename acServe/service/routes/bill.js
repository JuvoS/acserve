
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

    var data = {
      "code": 200,
      "messgae": "创建成功!"
    }
   
    var addressCode = codeGenerLib.generPlaceCode();
    while(1){
      var flag = await db.FindOne('address',{'addressCode': addressCode})
      if(commonUtil.isEmpty(flag)) break;

      addressCode = codeGenerLib.generCode();
    }
    obj.addressCode = addressCode;
    obj.createTime = dateLib.getTimeStamp();
    obj.updateTime = dateLib.getTimeStamp();
    await db.INSERT('address', obj,'');

    res.json(data);
  })();
  
});
router.get('/list', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var temp = req.query.code;
    console.log(temp);
    let data = await db.FindAll('address', {
      userCode: temp
    },'createTime','desc');
    res.json(data);
  })();
});
router.get('/page', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    let data = await db.FindAll('address', '');
    res.json(data);
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
    await db.UPDATE('address', obj,{
      addressCode  : obj.addressCode
    });

    res.json(data);
  })();
});

router.get('/del', function(req, res, next) {
  (async ()=>{
    let s = await db.DELETE('address', {
      addressCode  : 'Juvos'
    });
    console.log(s);
  })();

  res.send('respond with a resource');
});

module.exports = router;
