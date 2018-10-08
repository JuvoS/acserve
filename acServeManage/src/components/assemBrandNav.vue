<template>
  <div class="brandNav">

  	<el-container>
  		<el-row class="nav-btn-panel" >
  			<div v-for="(navItem, index) in brandNavMenu">
  				<div class="nav-btn-item" @click="menuLink(navItem.link)">{{ navItem.name }}</div>
  			</div>
				
			</el-row>
  	</el-container>
  	
  </div>
</template>

<script>
export default {
  name: 'brandNav',
  data () {
    return {
      brandNavMenu: [{
      	name: '添加品牌',
      	link: '/device/brand/'
      },{
      	name: '添加类型',
      	link: '/device/brand/'
      },{
      	name: '添加型号',
      	link: '/device/brand/'
      },{
      	name: '添加服务期',
      	link: '/device/brand/'
      }]
    }
  },
  methods: {
    getMenuInfo(){
    	this.$axios.get(this.$localUrl + 'bill/menu?code='+sessionStorage.userCode).then((response) => {
				console.log(response.data);
				this.menu = response.data.menu;
			}).catch((err) => {
				console.log(err);
			});
    },
    menuLink: function(val){
    	this.$router.push(val);
    }
  },
  mounted: function(){
//		this.getMenuInfo();
  }
  
}
</script>

<style scoped>
.nav-btn-panel {
	background: #FFFFFF;
	font-size: 12px;
	height: 40px;
	line-height: 40px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	width: 100%;
}
.nav-btn-item {
	height: 20px;
	line-height: 20px;
	width: 80px;
	margin: 10px;
	border: 1px solid #00B7FF;
	border-radius: 20px;
	color: #00B7FF;
}
</style>
