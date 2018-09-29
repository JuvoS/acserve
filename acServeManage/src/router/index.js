import Vue from 'vue'
import Router from 'vue-router'

import assHeader from '@/components/assemHeader'
import assFooter from '@/components/assemFooter'
import assAside from '@/components/assemAside'
import assemUserList from '@/components/assemUserList'
import billCreatePage from '@/components/pageBillCreate'
import billListPage from '@/components/pageBillList'
import userCreatePage from '@/components/pageUserCreate'
import userListPage from '@/components/pageUserList'

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
    	path: '/bill/create',
    	name: 'billCreate',
    	component: billCreatePage
    },{
    	path: '/bill/list/',
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
    	path: '/user/create',
    	name: 'userCreate',
    	component: userCreatePage
    },{
    	path: '/user/list',
    	name: 'userList',
    	component: userListPage
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