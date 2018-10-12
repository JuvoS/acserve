<template>
  <div id="app">
  <el-container class="wrapper-panel">
	  <el-header>
	  	<ass-Header class="header-panel"></ass-Header>
	  </el-header>
	  <el-container class="main-panel">
	    <el-aside width="240px">
	    	<ass-Aside></ass-Aside>
	    </el-aside>
	    <el-container>

	      <el-main class="main-panel-content">
	      	<router-view ></router-view>
	      </el-main>
	    </el-container>
	  </el-container>
	</el-container>
    
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
  	return {
  		
  	}
  },
  methods: {
  	checkTokenState: function(){
  		if(this.$route.path != '/login' && (this.$route.path!= '/reg')){
	  		this.$axios.get(this.$localUrl + 'entry/checkToken?token='+sessionStorage.accessToken).then((response) => {
					var temp = response.data;
					console.log(temp);
					if(temp.code != 200){
						this.$router.push('/login');
					}
				}).catch((err) => {
					console.log(err);
				});
			}
  	}
  },
  mounted: function(){
	this.checkTokenState();
  }
}
</script>

<style>
.el-message{
	/*min-width: 80%!important;*/
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  margin: 0;
  padding: 0;
  height: 100%;
}
html,body {
	margin: 0;
	padding: 0;
	background: #f7f7f7;
	height: 100%;
}

.wrapper-panel {
	height: 100%;
}
.wrapper-panel::-webkit-scrollbar {/*滚动条整体样式*/
	width: 0.25rem;     /*高宽分别对应横竖滚动条的尺寸*/
	height: 1px;
}
.wrapper-panel::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
	border-radius: 0.2rem;
	 -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	background: #535353;
}
.wrapper-panel::-webkit-scrollbar-track {/*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	border-radius: 0.2rem;
	background: #EDEDED;
}
.el-header {
	padding: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 10;
}
.main-panel {
	margin-top: 61px;
	height: calc(100% - 61px);
}
.el-aside {
	/*min-height: 600px;*/
	background: #FFFFFF;
}
.main-panel-content {
	overflow: hidden;
	overflow-y: auto;
	height: 100%;
}
.main-panel-content::-webkit-scrollbar {/*滚动条整体样式*/
	width: 0.25rem;     /*高宽分别对应横竖滚动条的尺寸*/
	height: 1px;
}
.main-panel-content::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
	border-radius: 0.2rem;
	 -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	background: #535353;
}
.main-panel-content::-webkit-scrollbar-track {/*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	border-radius: 0.2rem;
	background: #EDEDED;
}
</style>
