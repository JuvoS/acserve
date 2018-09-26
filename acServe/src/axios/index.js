import Vue from 'vue';
import axios from 'axios';

Vue.prototype.$axios = axios;
let localUrl = 'http://localhost:2322/';
Vue.prototype.$localUrl = localUrl;

export default({

});