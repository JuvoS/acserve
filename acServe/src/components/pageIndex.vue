<template>
  <div class="index">
  	<el-container>
		  <el-header style="height: 3rem;">
		  	<ass-Header class="header-panel"></ass-Header>
		  </el-header>
		  <div class="bill-btn-panel">
	  		<router-link to="/bill/create">
	  			<el-button type="primary" round>发布需求</el-button>
	  		</router-link>
	  	</div>
		  <div class="adver-panel">
  			<img src="../../../acServeManage/static/img/header.jpg" />
  		</div>
  		<ass-Menu-Grid class="grid-panel-c" v-show="customFlag"></ass-Menu-Grid>
  		<ass-Menu-GridServe class="grid-panel-c" v-show="serveFlag"></ass-Menu-GridServe>
	  	<el-main>
		  	<ass-Menu-Serve v-show="currentFlag"></ass-Menu-Serve>
				<ass-Menu v-show="currentFlag"></ass-Menu>
		    <ass-Footer></ass-Footer>
	  	</el-main>
		</el-container>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      serveFlag: false,
      customFlag: false,
      currentFlag: false
    }
  },
  methods: {
    checkPersonType: function(){
    	this.$axios.get(this.$localUrl + 'manage/checkPerson/'+sessionStorage.userCode).then((response) => {
				this.serveFlag = response.data.serveFlag;
				this.customFlag = response.data.customFlag;
			}).catch((err) => {
				console.log(err);
			});
    }
  },
  mounted: function(){
  	this.checkPersonType();
  }
  
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.header-pp {
	height: 5rem;
}
.header-panel {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 999;
}
.adver-panel {
	width: 100%;
	overflow: hidden;
	height: 8rem;
}
.adver-panel img {
	width: 100%;
}
.grid-panel-c {
	width: 100%;
}
.bill-btn-panel {
	margin-top: 2rem;
	margin-bottom: 2rem;
}
</style>
