<template>
  <div class="navBtnPage">
    <div class="nav-box">
	    <div class="nav-box-item" v-for="item in menu" >
	    	<i class="el-icon-menu" v-bind:class="item.icon" @click="menuLink(item.info)"></i>
	    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navBtnPage',
  data () {
    return {
      menu: [{
      	demandFlag: 0,
      	name: '完全删除',
      	info: 'del',
      	num: 0
      },{
      	demandFlag: 200,
      	name: '待接单',
      	info: 'wait',
      	num: 0
      },{
      	demandFlag: 201,
      	name: '已接单',
      	info: 'serve',
      	num: 0
      },{
      	demandFlag: 203,
      	name: '待评价',
      	info: 'eval',
      	num: 0
      },{
      	demandFlag: 204,
      	name: '已评价',
      	info: 'evaled',
      	num: 0
      },{
      	demandFlag: 100,
      	name: '异常订单',
      	info: 'abno',
      	num: 0
      },{
      	demandFlag: 101,
      	name: '已取消',
      	info: 'cancel',
      	num: 0
      },{
      	demandFlag: 102,
      	name: '草稿',
      	info: 'draft',
      	num: 0
      }]
    }
  },
  methods:{
  	getMenuInfo(){
    	this.$axios.get(this.$localUrl + 'bill/menu?code='+sessionStorage.userCode).then((response) => {
				this.menu = response.data.menu;
			}).catch((err) => {
				console.log(err);
			});
    },
    menuLink(val){
    	this.$emit('getBillList',val);
    	this.$router.push('/bill/list/'+val);
    }
  },
  mounted: function(){
  	this.getMenuInfo();
  }
}
</script>

<style scoped>
.navBtnPage {
	height: 2rem;
	line-height: 2rem;
	width: 100%;
	background: #FFFFFF;
	margin: 0;
}
.nav-box {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
.nav-box-item {
	height: 2rem;
	line-height: 2rem;
	text-align: center;
}
</style>
