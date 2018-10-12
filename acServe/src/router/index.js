import Vue from 'vue'
import Router from 'vue-router'

import assHeader from '@/components/assemHeader'
import assFooter from '@/components/assemFooter'
import assNavBtn from '@/components/assemNavBtn'
import assAdrlist from '@/components/assemAddressList'
import assImgup from '@/components/assemImgUp'
import assMenu from '@/components/assemMenu'
import assMenuServe from '@/components/assemMenuServe'
import assemMenuGrid from '@/components/assemMenuGrid'
import assemMenuGridServe from '@/components/assemMenuGridServe'
import assBillList from '@/components/assemBillList'
import assBillServe from '@/components/assemBillServe'

import lostPage from '@/components/404'
import indexPage from '@/components/pageIndex'
import loginPage from '@/components/pageLogin'
import regPage from '@/components/pageRegister'
import addressListPage from '@/components/pageAddressList'
import billCreatePage from '@/components/pageBillCreate'
import billListPage from '@/components/pageBillList'
import billListServe from '@/components/pageBillServe'
import devicePage from '@/components/pageDevice'
import userPage from '@/components/pageUser'
import suggestPage from '@/components/pageSuggest'

Vue.use(Router)
Vue.component('ass-Header',assHeader);
Vue.component('ass-Footer',assFooter);
Vue.component('ass-Navbtn',assNavBtn);
Vue.component('ass-Menu',assMenu);
Vue.component('ass-Menu-Serve',assMenuServe);
Vue.component('ass-Menu-Grid',assemMenuGrid);
Vue.component('ass-Menu-GridServe',assemMenuGridServe);
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
    	path: '/bill/create',
    	name: 'billCreate',
    	component: billCreatePage
    },{
    	path: '/bill/list/all',
    	name: 'billListAll',
    	component: billListPage
    },{
    	path: '/suggest',
    	name: 'suggest',
    	component: suggestPage
    },{
    	path: '/serve/wait',
    	name: 'waitBill',
    	component: billListServe
    },{
    	path: '/device',
    	name: 'device',
    	component: devicePage
    },{
    	path: '/user',
    	name: 'user',
    	component: userPage
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
