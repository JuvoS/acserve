import Vue from 'vue'
import Router from 'vue-router'

import assHeader from '@/components/assemHeader'
import assFooter from '@/components/assemFooter'
import assAside from '@/components/assemAside'
import assemUserList from '@/components/assemUserList'
import assemDeviceList from '@/components/assemDeviceList'
import assemBrandNav from '@/components/assemBrandNav'
import billCreatePage from '@/components/pageBillCreate'
import billListPage from '@/components/pageBillList'
import userCreatePage from '@/components/pageUserCreate'
import userListPage from '@/components/pageUserList'
import deviceListPage from '@/components/pageDeviceList'
import deviceBrandPage from '@/components/pageDeviceBrand'
import deviceMoldPage from '@/components/pageDeviceMold'
import deviceModelPage from '@/components/pageDeviceModel'
import deviceModelUserPage from '@/components/pageDeviceModelUser'
import deviceTimePage from '@/components/pageDeviceTime'
import suggestPage from '@/components/pageSuggest'

import assNavBtn from '@/components/assemNavBtn'
import assAdrlist from '@/components/assemAddressList'
import assImgup from '@/components/assemImgUp'
import assMenu from '@/components/assemMenu'
import assMenuServe from '@/components/assemMenuServe'
import assBillList from '@/components/assemBillList'
import assBillServe from '@/components/assemBillServe'

import lostPage from '@/components/404'
import indexPage from '@/components/pageIndex'
import loginPage from '@/components/pageLogin'
import regPage from '@/components/pageRegister'
import addressListPage from '@/components/pageAddressList'


Vue.use(Router)
Vue.component('ass-Header',assHeader);
Vue.component('ass-Footer',assFooter);
Vue.component('ass-Aside',assAside);
Vue.component('ass-user-List',assemUserList);
Vue.component('ass-device-List',assemDeviceList);
Vue.component('ass-BrandNav',assemBrandNav);

Vue.component('ass-Navbtn',assNavBtn);
Vue.component('ass-Menu',assMenu);
Vue.component('ass-Menu-Serve',assMenuServe);
Vue.component('ass-adrlist',assAdrlist);
Vue.component('ass-imgup',assImgup);
Vue.component('ass-billlist',assBillList);
Vue.component('ass-billserve',assBillServe);

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
      path: '/addresslist',
      name: 'addresslist',
      component: addressListPage
    },{
    	path: '/user/create',
    	name: 'userCreate',
    	component: userCreatePage
    },{
    	path: '/user/list',
    	name: 'userList',
    	component: userListPage
    },{
    	path: '/bill/create',
    	name: 'billCreate',
    	component: billCreatePage
    },{
    	path: '/bill/list/',
    	name: 'billListAll',
    	component: billListPage
    },{
    	path: '/device/create',
    	name: 'billCreate',
    	component: billCreatePage
    },{
    	path: '/device/list/',
    	name: 'deviceListAll',
    	component: deviceListPage
    },{
    	path: '/device/brand/',
    	name: 'deviceBrand',
    	component: deviceBrandPage
    },{
    	path: '/device/mold/',
    	name: 'deviceMold',
    	component: deviceMoldPage
    },{
    	path: '/device/model/',
    	name: 'deviceModel',
    	component: deviceModelPage
    },{
    	path: '/device/time/',
    	name: 'deviceTime',
    	component: deviceTimePage
    },{
    	path: '/device/user/',
    	name: 'deviceModelUser',
    	component: deviceModelUserPage
    },{
    	path: '/question/create',
    	name: 'questionCreate',
    	component: billCreatePage
    },{
    	path: '/question/list/',
    	name: 'questionListAll',
    	component: billListPage
    },{
    	path: '/module/list/',
    	name: 'moduleListAll',
    	component: billListPage
    },{
    	path: '/suggest',
    	name: 'suggest',
    	component: suggestPage
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
