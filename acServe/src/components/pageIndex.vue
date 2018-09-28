<template>
  <div class="index">
  	<el-container>
		  <el-header>
		  	<ass-Header class="header-panel"></ass-Header>
		  </el-header>
	  	<el-main>
		  	<div>
		  		<router-link to="/bill/create">
		  			<el-button type="primary" round>发布需求</el-button>
		  		</router-link>
		  	</div>
		  	
		  	<ass-Menu-Serve></ass-Menu-Serve>
				<ass-Menu></ass-Menu>
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
	font-size: 12px;
}
.header-panel {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 999;
}
</style>
