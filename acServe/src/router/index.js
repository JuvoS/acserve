import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '@/components/indexPage'
import loginPage from '@/components/loginPage'
import regPage from '@/components/regPage'
import aheader from '@/components/HeaderPage'
import afooter from '@/components/FooterPage'
import navbtn from '@/components/navBtnPage'
import adrlist from '@/components/addressList'
import imgup from '@/components/imgUpPage'

import formPage from '@/components/form'
import lostPage from '@/components/lostPage'
import addressListPage from '@/components/addressListPage'
import billCreatePage from '@/components/billCreatePage'
import billListPage from '@/components/billListPage'
import HelloWorld from '@/components/zHelloWorld'
import zloginPage from '@/components/zloginPage'
import ztokenPage from '@/components/ztokenPage'
import zuploadPaga from '@/components/zuploadPaga'
import zuploadPage from '@/components/zuploadPage'
import zaddressPage from '@/components/zaddress'
import zchildPage from '@/components/zchild'
import zchparentPage from '@/components/zchparent'

Vue.use(Router)
Vue.component('a-Header',aheader);
Vue.component('a-Footer',afooter);
Vue.component('navbtn',navbtn);
Vue.component('adrlist',adrlist);
Vue.component('imgup',imgup);
Vue.component('zchild',zchildPage);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: indexPage
    },{
      path: '/index',
      redirect: "/"
    },{
      path: '/login',
      name: 'login',
      component: loginPage
    },{
      path: '/reg',
      name: 'register',
      component: regPage
    },{
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/form',
      name: 'form',
      component: formPage
    },{
      path: '/addresslist',
      name: 'addresslist',
      component: addressListPage
    },{
    	path: '/bill/create',
    	name: 'billCreate',
    	component: billCreatePage
    },{
    	path: '/bill/list/all',
    	name: 'billLsit',
    	component: billListPage
    },{
      path: '/zlogin',
      name: 'zlogin',
      component: zloginPage
    },{
      path: '/ztoken',
      name: 'ztoken',
      component: ztokenPage
    },{
      path: '/zups',
      name: 'zups',
      component: zuploadPaga
    },{
      path: '/zupload',
      name: 'zupload',
      component: zuploadPage
    },{
      path: '/zaddress',
      name: 'zadd',
      component: zaddressPage
    },{
      path: '/zchp',
      name: 'zchp',
      component: zchparentPage
    },{
      path: "*",
      redirect: "/404"
    },{
      path: '/404',
      name: '404',
      component: lostPage
    }
  ]
})
