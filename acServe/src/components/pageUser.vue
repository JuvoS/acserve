<template>
  <div class="mine">
  	<el-header>
	  	<ass-Header class="header-panel"></ass-Header>
		</el-header>
		<div class="mine-panel">
			<div class="mine-item" @click="menuLink('/suggest')">
				<a class="mine-suggest">建议列表</a>
			</div>
			<div class="mine-item" @click="logout">
				<a class="mine-logout">退出当前账号</a>
			</div>
		</div>
		
  </div>
</template>

<script>
export default {
  name: 'mine',
  data () {
    return {

    }
  },
  methods: {
  	logout: function(){
  		sessionStorage.userCode = '';
			sessionStorage.accessToken = '';
			window.location.reload();
  	},
  	menuLink: function(val){
			this.$router.push(val);
    }
  },
  mounted: function(){	

  }
  
}
</script>

<style scoped>
	.el-header{
		padding: 0;
	}
.mine-panel {
	width: 100%;
	min-height: 100%;
	padding-top: 0.1rem;
	display: flex;
	flex-direction: column;
}
.mine-item {
	width: 100%;
	margin: 0.1rem 0;
	height: 3rem;
	line-height: 3rem;
	background: #FFFFFF;
}
.mine-logout {
	color: #FF9800;
}
.mine-suggest {
	
}
</style>
