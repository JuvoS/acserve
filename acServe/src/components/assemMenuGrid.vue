<template>
  <div class="index">

  	<div class="grid-panel">
  		<div class="grid-wrapper">
			  <div class="grid-item" v-for="item in menu" @click="menuLink(item.info)">
  				<span>{{ item.name }}</span>
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
      },{
      	demandFlag: 0,
      	name: '完全删除',
      	info: 'del',
      	num: 0
      }]
    }
  },
  methods: {
    getMenuInfo(){
    	this.$axios.get(this.$localUrl + 'bill/menu?code='+sessionStorage.userCode).then((response) => {
//				console.log(response.data);
				this.menu = response.data.menu;
			}).catch((err) => {
				console.log(err);
			});
    },
    menuLink(val){
    	this.$router.push('/bill/list/'+val);
    }
  },
  mounted: function(){
//		this.getMenuInfo();
  }
  
}
</script>
<style scoped>
.grid-panel {
	min-height: 10rem;
	width: 100%;
	/*background: #CCCCCC;*/
	margin: 0 auto;
	font-size: 12px;
	overflow: hidden;
	overflow-y: hidden;
}
.grid-wrapper {
	height: 10rem;
	display: grid;
	grid-template-columns: 50% 50%;
  /*grid-template-rows: 6rem 6rem;*/
}
.grid-item {
	background: #FFFFFF;
	margin: 1px;
	height: calc(5rem - 1px);
	line-height: 4.9rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
}
</style>
