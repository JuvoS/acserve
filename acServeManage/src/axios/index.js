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