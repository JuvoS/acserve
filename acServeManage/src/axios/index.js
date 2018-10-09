import Vue from 'vue';
import axios from 'axios';

Vue.prototype.$axios = axios;
let localUrl = 'http://localhost:2322/';
Vue.prototype.$localUrl = localUrl;
//判断对象是否为空
Vue.prototype.isOwnEmpty = function(obj) {
	for(var name in obj) {
		if(obj.hasOwnProperty(name)) {
			return false;
		}
	}
	return true;
}
//判断字符串是否为空
Vue.prototype.isStrEmpty = function(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}

export default({

});
Vue.prototype.isPhoneNum = function(tel){
	//手机号正则	
    var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;	
    //电话	
    if (phoneReg.test(tel))  return true;
    
    return false;
}
