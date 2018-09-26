<template>
  <div class="index">
  	<el-container>
		  <el-header>
		  	<a-Header class="header-panel"></a-Header>
		  </el-header>
	  	<el-main>
		  	<div>
		  		<el-button type="primary" round>发布需求</el-button>
		  	</div>
		  	<div class="menu-panel">
		  		<h5 class="">需求订单</h5>
		  		<hr>
		  		<el-row :gutter="20">
		  			<el-col :span="4" :offset="2">
		  				<el-button icon="el-icon-menu" circle></el-button>
		  				<span>全部</span><span>(10)</span>
		  			</el-col>
		  			<el-col :span="4" :offset="1">
		  				<el-button icon="el-icon-loading" circle></el-button>
		  				<span>全部</span><span>(10)</span>
		  			</el-col>
		  			<el-col :span="4" :offset="1">
		  				<el-button icon="el-icon-tickets" circle></el-button>
		  				<span>全部</span><span>(10)</span>
		  			</el-col>
		  			<el-col :span="4" :offset="1">
		  				<el-button icon="el-icon-edit" circle></el-button>
		  				<span>全部</span><span>(10)</span>
		  			</el-col>	
					</el-row>
					<el-row :gutter="20">
		  			<el-col :span="4" :offset="2">
		  				<el-button icon="el-icon-document" circle></el-button>
		  				<span>全部</span><span>(10)</span>
		  			</el-col>
		  			<el-col :span="4" :offset="1">
		  				<el-button type="success" icon="el-icon-circle-close-outline" circle></el-button>
		  				<span>全部</span><span>(10)</span>
		  			</el-col>
		  			<el-col :span="4" :offset="1">
		  				<el-button type="info" icon="el-icon-warning" circle></el-button>
		  				<span>全部</span><span>(10)</span>
		  			</el-col>
		  			<el-col :span="4" :offset="1">
		  				<el-button type="warning" icon="el-icon-edit-outline" circle></el-button>
		  				<span>全部</span><span>(10)</span>
		  			</el-col>	
					</el-row>
		  	</div>
		  	
		    <a-Footer></a-Footer>
	  	</el-main>
		</el-container>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to AC'
    }
  },
  methods: {
    
  },
  mounted: function(){

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.menu-panel {
	height: 20rem;
	width: 94%;
	background: #FFFFFF;
	margin: 0 auto;
	margin-top: 2rem;
	border-radius: 10px;
}
.header-panel {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 999;
}
</style>
