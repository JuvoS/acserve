import Vue from 'vue'
import Router from 'vue-router'

import assHeader from '@/components/assemHeader'
import assFooter from '@/components/assemFooter'
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
import billCreatePage from '@/components/pageBillCreate'
import billListPage from '@/components/pageBillList'
import billListServe from '@/components/pageBillServe'

import formPage from '@/components/zform'
import HelloWorld from '@/components/zHelloWorld'
import zloginPage from '@/components/zloginPage'
import ztokenPage from '@/components/ztokenPage'
import zuploadPaga from '@/components/zuploadPaga'
import zuploadPage from '@/components/zuploadPage'
import zaddressPage from '@/components/zaddress'
import zchildPage from '@/components/zchild'
import zchparentPage from '@/components/zchparent'

Vue.use(Router)
Vue.component('ass-Header',assHeader);
Vue.component('ass-Footer',assFooter);
Vue.component('ass-Navbtn',assNavBtn);
Vue.component('ass-Menu',assMenu);
Vue.component('ass-Menu-Serve',assMenuServe);
Vue.component('ass-adrlist',assAdrlist);
Vue.component('ass-imgup',assImgup);
Vue.component('ass-billlist',assBillList);
Vue.component('ass-billserve',assBillServe);
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
    	name: 'billListAll',
    	component: billListPage
    },{
    	path: '/bill/list/wait',
    	name: 'billListWait',
    	component: billListPage
    },{
    	path: '/bill/list/serve',
    	name: 'billListServe',
    	component: billListPage
    },{
    	path: '/bill/list/eval',
    	name: 'billListEval',
    	component: billListPage
    },{
    	path: '/bill/list/evaled',
    	name: 'billListEvaled',
    	component: billListPage
    },{
    	path: '/bill/list/abno',
    	name: 'billListAbno',
    	component: billListPage
    },{
    	path: '/bill/list/cancel',
    	name: 'billListCancel',
    	component: billListPage
    },{
    	path: '/bill/list/draft',
    	name: 'billListDraft',
    	component: billListPage
    },{
    	path: '/bill/list/del',
    	name: 'billListDel',
    	component: billListPage
    },{
    	path: '/serve/wait',
    	name: 'waitBill',
    	component: billListServe
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
