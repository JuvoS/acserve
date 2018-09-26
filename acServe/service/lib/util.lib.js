//判断字符是否为空的方法
var isEmpty = function(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}
var jsonHeader = function jsonHeader(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();

};
var failArr = {
    "code": 0,
    "messgae": "获取失败!"
}

module.exports = {
    isEmpty : isEmpty,
    jsonHeader : jsonHeader,
    failArr : failArr
}