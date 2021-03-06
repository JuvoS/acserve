
var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var db = require('../lib/mysql.lib');
var commonUtil = require('../lib/util.lib');
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
      "messgae": "发布成功!"
    }
    
    var demandCode = codeGenerLib.generDemandCode();
    while(1){
      var flag = await db.FindOne('demand',{'demandCode': demandCode})
      if(commonUtil.isEmpty(flag)) break;

      demandCode = codeGenerLib.generDemandCode();
    }

    obj.demandCode = demandCode;
    obj.createTime = dateLib.getTimeStamp();
    obj.updateTime = dateLib.getTimeStamp();
    await db.INSERT('demand', obj,'');
    
    return res.json(data);
  })();
  
});
router.post('/photocode', [commonUtil.jsonHeader], function(req, res, next) { 
    var data = {
      "code": 200,
      "messgae": "创建成功!"
    }

    var form = new multiparty.Form();
    form.encoding = 'utf-8';
    form.parse(req, async (err, fields, files)=>{ 
      var userCode = commonUtil.replaceKuo(fields.userCode);
      var userFlagCode = userCode.toString().slice(5,12);
      photoCode = codeGenerLib.generPhotoCode(userFlagCode);
      while(1){
        var flag = await db.FindOne('photopool',{
            'photoCode': photoCode,
            'userCode': userCode
        })
        if(commonUtil.isEmpty(flag)) break;
    
        photoCode = codeGenerLib.generPhotoCode(userFlagCode);
      }

      data.photoCode = photoCode;
      return res.json(data);
    })
});
router.get('/photoList', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var data = {"code": 200,"messgae": "创建成功!"}
    var photoCode = req.query.code;
    var userCode = req.query.user;
    let dataTemp = await db.FindAll('photopool', {
      userCode: userCode,
      photoCode: photoCode,
      imgFlag: 200
    },'createTime','desc');
    var list = [];
    for(var item in dataTemp){
      var t = {
        url: dataTemp[item].photoUrl,
        imgcode: dataTemp[item].Id
      }
      list.push(t);
    }
    data.data = list;
    return res.json(data);
  })();
});
router.get('/photoDel', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var data = {"code": 200,"message": "删除成功!"}
    var photoCode = req.query.code;
    var imgCode = req.query.img;
    await db.UPDATE('photopool', {imgFlag: 0},{
      photoCode: photoCode,
      Id: imgCode
    });
    
    return res.json(data);
  })();
});
router.get('/menu', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var data = {"code": 200,"message": "获取菜单成功!"}
    var userCode = req.query.code;
    var menuList = [];
    var menuTemp = commonUtil.menu;
    for(var item in menuTemp){
      let num;
      if(menuTemp[item].demandFlag == 0){
        num = await db.COUNT('demand', {
          userCode: userCode
        });
        menuTemp[item] = {
          icon: 'el-icon-menu',
          demandFlag: 0,
          name: '全部',
          info: 'all',
          num: 0
        }
      }else{
        num = await db.COUNT('demand', {
          userCode: userCode,
          demandFlag: menuTemp[item].demandFlag
        });
      }
      menuTemp[item].num = num[0]['count(*)'];
      menuList.push(menuTemp[item]);
    }
    data.menu = menuList;
    
    return res.json(data);
  })();
});
router.get('/list', [commonUtil.jsonHeader], async (req, res, next)=> {

    var temp = req.query.code;
    var type = req.query.type;

    var demandFindObj = {userCode: temp};
    
    if(type!='all') demandFindObj.demandFlag = commonUtil.changeTypeFromStr(type);//获取状态值

    let data = await db.FindAll('demand', demandFindObj,'createTime','desc');
    var list = [];
    for(var item in data){
      let addressTemp = await db.FindAll('address', {addressCode:data[item].addressCode},'createTime','desc');
      
      var t = {
        demandCode: data[item].demandCode,
        type: commonUtil.changeTypeFromNum(data[item].demandFlag),
        describetion: data[item].describetion,
        supplyInfo: data[item].supplyInfo,
        address:{
          info: addressTemp[0].info,
          tel: addressTemp[0].tel
        },
        showImg: '',
        img: ''
      }

      let imgTemp;
      if(data[item].photoCode!='1111'){
        imgTemp = await db.FindAll('photopool', {photoCode:data[item].photoCode},'createTime','desc');
        t.img = imgTemp;
        t.showImg = imgTemp[0].photoUrl;
      }
      
      list.push(t);
    }
    console.log(list);
    return res.json(list);

});
router.get('/menuServe', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var data = {"code": 200,"message": "获取菜单成功!"}
    var userCode = req.query.code;
    var menuList = [];
    var menuTemp = commonUtil.menuServe;
    for(var item in menuTemp){
      let num;
      if(menuTemp[item].demandFlag == 200){
        num = await db.COUNT('demand', {
          demandFlag: menuTemp[item].demandFlag
        });
      }else{
        num = await db.COUNT('billqueue', {
          serveCode: userCode,
          billFlag: menuTemp[item].demandFlag
        });
      }
      menuTemp[item].num = num[0]['count(*)'];
      menuList.push(menuTemp[item]);
    }
    data.menu = menuList;
    
    return res.json(data);
  })();
});
router.get('/list/:billStatus/:pageIndex/:pageSizeNum', [commonUtil.jsonHeader], async (req, res, next)=> {

  var billStatus = req.params.billStatus;

  var demandFindObj = {};
  
  if(billStatus!='all') demandFindObj.demandFlag = commonUtil.changeTypeFromStr(billStatus);//获取状态值

  let dataTemp = await db.PAGE('demand',demandFindObj,req.params.pageIndex,req.params.pageSizeNum,'createTime','desc');
  var list = [];
  for(var item in dataTemp){
    let addressTemp = await db.FindOne('address', {addressCode:dataTemp[item].addressCode},'createTime','desc');
    
    var t = {
      demandCode: dataTemp[item].demandCode,
      type: commonUtil.changeTypeFromNum(dataTemp[item].demandFlag),
      typeNum: dataTemp[item].demandFlag,
      describetion: dataTemp[item].describetion,
      supplyInfo: dataTemp[item].supplyInfo,
      personName: dataTemp[item].personName,
      address:{
        info: addressTemp[0].info,
        tel: addressTemp[0].tel
      },
      showImg: '',
      img: ''
    }

    let imgTemp;
    if(dataTemp[item].photoCode!='1111'){
      imgTemp = await db.FindAll('photopool', {photoCode:dataTemp[item].photoCode},'createTime','desc');
      t.img = imgTemp;
      t.showImg = imgTemp[0].photoUrl;
    }
    
    list.push(t);
  }

  let countNum = await db.COUNT('demand',demandFindObj);
  var data = {
    "code": 200,
    "message": "获取用户信息成功!",
    "currentPage": req.params.pageIndex,
    "pageSizeNum": req.params.pageSizeNum,
    "count":countNum[0]['count(*)']
  }
  data.data = list;
  return res.json(data);

});
router.get('/getone/:demandCode', [commonUtil.jsonHeader], async (req, res, next)=> {

  var demandFindObj = {demandCode: req.params.demandCode};
  
  let data = await db.FindOne('demand', demandFindObj,'createTime','desc');
  var list = [];
  for(var item in data){
    let addressTemp = await db.FindAll('address', {addressCode:data[item].addressCode},'createTime','desc');
    
    var t = {
      demandCode: data[item].demandCode,
      type: commonUtil.changeTypeFromNum(data[item].demandFlag),
      describetion: data[item].describetion,
      supplyInfo: data[item].supplyInfo,
      address:{
        info: addressTemp[0].info,
        tel: addressTemp[0].tel
      },
      showImg: '',
      img: ''
    }

    let imgTemp;
    if(data[item].photoCode!='1111'){
      imgTemp = await db.FindAll('photopool', {photoCode:data[item].photoCode},'createTime','desc');
      t.img = imgTemp;
      t.showImg = imgTemp[0].photoUrl;
    }
    
    list.push(t);
  }
  return res.json(list);

});
router.get('/getuser', [commonUtil.jsonHeader], async (req, res, next)=> {

  var userFindObj = {userTypeCode: 101};
  let userTemp = await db.FindAll('user', userFindObj,'createTime','desc');

  return res.json(userTemp);

});
router.post('/assign', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var obj = JSON.parse(JSON.stringify(req.body));
    for( var k in obj){
      obj = k;
    }
    obj = JSON.parse(obj);
    
    var data = {
      "code": 200,
      "message": "指派成功!"
    }
    
    var createTime = dateLib.getTimeStamp();
    var updateTime = dateLib.getTimeStamp();

      obj.updateTime = dateLib.getTimeStamp();
      obj.demandFlag = 201;
      await db.INSERT('userservelog', { userCode: obj.serveCode,  did: '派遣'+obj.Id+'为：'+JSON.stringify(obj), createTime: createTime, updateTime:updateTime },'');
      delete obj.serveCode;
      await db.UPDATE('demand', obj, { demandCode: obj.demandCode },'');

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
      "code": 0,
      "message": "修改失败，须指派维修人员!"
    }
    if(obj.demandFlag != 201){
      var createTime = dateLib.getTimeStamp();
      var updateTime = dateLib.getTimeStamp();
  
      obj.updateTime = dateLib.getTimeStamp();
      await db.INSERT('userservelog', { userCode: obj.serveCode,  did: '修改订单'+obj.Id+'为：'+JSON.stringify(obj), createTime: createTime, updateTime:updateTime },'');
      delete obj.serveCode;
      console.log(obj);
      await db.UPDATE('demand', obj, { demandCode: obj.demandCode },'');

      data = {
        "code": 200,
        "message": "修改成功!"
      }
    }

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

      await db.INSERT('userservelog', { userCode: obj.serveCode,  did: '删除订单'+obj.Id+'名为：'+obj.name, createTime: createTime, updateTime:updateTime },'');
      delete obj.serveCode;
      await db.DELETE('demand', { Id: obj.Id },'');


    return res.json(data);
  })();
  
});

router.get('/assignList', [commonUtil.jsonHeader], async (req, res, next)=> {

  var temp = req.query.code;
  var type = req.query.type;

  var demandFindObj = {repairCode: temp,demandFlag:201};

  let data = await db.FindAll('demand', demandFindObj,'createTime','desc');
  var list = [];
  for(var item in data){
    let addressTemp = await db.FindAll('address', {addressCode:data[item].addressCode},'createTime','desc');
    
    var t = {
      demandCode: data[item].demandCode,
      type: commonUtil.changeTypeFromNum(data[item].demandFlag),
      typeNum: data[item].demandFlag,
      describetion: data[item].describetion,
      supplyInfo: data[item].supplyInfo,
      address:{
        info: addressTemp[0].info,
        tel: addressTemp[0].tel
      },
      showImg: '',
      img: ''
    }

    let imgTemp;
    if(data[item].photoCode!='1111'){
      imgTemp = await db.FindAll('photopool', {photoCode:data[item].photoCode},'createTime','desc');
      t.img = imgTemp;
      t.showImg = imgTemp[0].photoUrl;
    }
    
    list.push(t);
  }
  return res.json(list);

});
router.get('/finishList', [commonUtil.jsonHeader], async (req, res, next)=> {

  var temp = req.query.code;
  var type = req.query.type;

  var demandFindObj = {repairCode: temp,demandFlag:203};

  let data = await db.FindAll('demand', demandFindObj,'createTime','desc');
  var list = [];
  for(var item in data){
    let addressTemp = await db.FindAll('address', {addressCode:data[item].addressCode},'createTime','desc');
    
    var t = {
      demandCode: data[item].demandCode,
      type: commonUtil.changeTypeFromNum(data[item].demandFlag),
      typeNum: data[item].demandFlag,
      describetion: data[item].describetion,
      supplyInfo: data[item].supplyInfo,
      address:{
        info: addressTemp[0].info,
        tel: addressTemp[0].tel
      },
      showImg: '',
      img: ''
    }

    let imgTemp;
    if(data[item].photoCode!='1111'){
      imgTemp = await db.FindAll('photopool', {photoCode:data[item].photoCode},'createTime','desc');
      t.img = imgTemp;
      t.showImg = imgTemp[0].photoUrl;
    }
    
    list.push(t);
  }
  return res.json(list);

});
router.post('/do/:type', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var obj = JSON.parse(JSON.stringify(req.body));
    for( var k in obj){
      obj = k;
    }
    obj = JSON.parse(obj);
    
    var data = {
      "code": 0,
      "message": "完成失败，联系部门主管!"
    }
    
    var createTime = dateLib.getTimeStamp();
    var updateTime = dateLib.getTimeStamp();
    if(req.params.type == 'finish'){
      obj.demandFlag = 203;
      
      obj.updateTime = dateLib.getTimeStamp();
      await db.INSERT('userservelog', { userCode: obj.serveCode,  did: '维修人员操作订单'+obj.Id+'为：'+JSON.stringify(obj), createTime: createTime, updateTime:updateTime },'');
      delete obj.serveCode;
      await db.UPDATE('demand', obj, { demandCode: obj.demandCode },'');

      data = {
        "code": 200,
        "message": "完成订单!"
      }
    }
    if(req.params.type == 'refuse'){
      obj.demandFlag = 200;

      obj.updateTime = dateLib.getTimeStamp();
      await db.INSERT('userservelog', { userCode: obj.serveCode,  did: '维修人员拒接订单'+obj.Id+'为：'+JSON.stringify(obj), createTime: createTime, updateTime:updateTime },'');
      delete obj.serveCode;
      await db.UPDATE('demand', obj, { demandCode: obj.demandCode },'');

      data = {
        "code": 200,
        "message": "订单已退回!"
      }
    }

    return res.json(data);
  })();
  
});

module.exports = router;
