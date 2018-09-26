import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './axios';

Vue.config.productionTip = false

Vue.use(ElementUI)

router.beforeEach((to, from, next)=>{
	if(to.path != '/login' && (to.path!= '/reg')){
		if(!sessionStorage.getItem('accessToken')) next({path: '/login'})
		
		next()
	}
	next()
})

new Vue({
	el: '#app',
	router,
	axios,
	components: {
		App
	},
	template: '<App/>'
})