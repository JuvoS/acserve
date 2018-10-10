<template>
  <div class="index">

  	<div class="menu-panel">
  		<div class="menu-panel-title">需求队列</div>
  		<hr>
  		<div class="menu-wrapper">
			  <div class="menu-item" v-for="item in menu">
			  	<span class="menu-item-btn" @click="menuLink(item.info)" ><i v-bind:class="item.icon"></i></span>
  				<span>{{ item.name }}</span>
  				<span>({{ item.num }})</span>
			  </div>
			</div>
  	</div>
  	
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      menu: [{
		    icon: 'el-icon-menu',    demandFlag: 200,    name: '可接单',    info: 'wait',    num: 0},{
		    icon: 'el-icon-menu',    demandFlag: 201,    name: '待服务',    info: 'serve',    num: 0},{
		    icon: 'el-icon-menu',    demandFlag: 203,    name: '待评价',    info: 'eval',    num: 0},{
		    icon: 'el-icon-menu',    demandFlag: 204,    name: '已评价',    info: 'evaled',    num: 0},{
		    icon: 'el-icon-loading',    demandFlag: 100,    name: '异常订单',    info: 'abno',    num: 0},{
		    icon: 'el-icon-loading',    demandFlag: 1200,    name: '拒接',    info: 'refuse',    num: 0
			}]
    }
  },
  methods: {
    getMenuInfo(){
    	this.$axios.get(this.$localUrl + 'bill/menuServe?code='+sessionStorage.userCode).then((response) => {
				this.menu = response.data.menu;
			}).catch((err) => {
				console.log(err);
			});
    },
    menuLink(val){
    	this.$router.push('/serve/wait');
//  	this.$router.push('/serve/'+val);
    }
  },
  mounted: function(){
		this.getMenuInfo();
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu-panel {
	/*min-height: 17rem;*/
	width: 94%;
	background: #FFFFFF;
	margin: 0 auto;
	border-radius: 10px;
	font-size: 12px;
	overflow: hidden;
	overflow-y: hidden;
}
.menu-panel-title{
	font-size: 16px;
	margin: 0.5rem auto;
}
.menu-panel hr{
	background-color:#eee;
	height:1px;
	border:none;	
}
.menu-wrapper {
	height: 12rem;
	margin-bottom: 1rem;
	display: grid;
	grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 6rem 6rem 6rem;
}
.menu-item {
	/*background: #00B7FF;*/
	margin: 0.25rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
}
.menu-item .el-button {
	height: 2rem;
	width: 2rem;
	margin: 0.25rem auto;
}
.menu-item-btn{
	height: 3rem;
	width: 3rem;
	border-radius: 2rem;
	background: #ff9800;
	color: #FFFFFF;
	line-height: 3rem;
	font-size: 1.5rem;
	margin: 0 auto;
}
</style>
