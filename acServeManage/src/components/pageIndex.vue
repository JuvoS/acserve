<template>
  <div class="index">
  	<el-container class="wrapper-content">

	  	<el-main class="wrapper-content">
		  	<div>
		  		<router-link to="/bill/create">
		  			<el-button type="primary" round>发布需求</el-button>
		  		</router-link>
		  	</div>
		  	
		  	<ass-Menu-Serve></ass-Menu-Serve>
				<ass-Menu></ass-Menu>
				<ass-Menu-Serve></ass-Menu-Serve>
				<ass-Menu></ass-Menu>
		    
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
.wrapper-content::-webkit-scrollbar {/*滚动条整体样式*/
	width: 0.25rem;     /*高宽分别对应横竖滚动条的尺寸*/
	height: 1px;
}
.wrapper-content::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
	border-radius: 0.2rem;
	 -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	background: #535353;
}
.wrapper-content::-webkit-scrollbar-track {/*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	border-radius: 0.2rem;
	background: #EDEDED;
}
</style>
