<template>
  <div class="headerPage">
    <div>
    	<el-row :gutter="20">
    		<el-col :span="4">
			  	<router-link to="/">
			  	<div class="header-panel">
			  		<i class="el-icon-menu"></i>
			  	</div>
			  	</router-link>
			  </el-col>
			  <el-col :span="3" :offset="12">
			  	<router-link to="/addresslist">
			  	<div class="header-panel">
			  		<i class="el-icon-location"></i>
			  	</div>
			  	</router-link>
			  </el-col>
			  <el-col :span="5">
			  	<div class="header-panel">
			  		<img src="../../static/img/logo.png" />
			  	</div>
			  </el-col>
			</el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headerPage',
  data () {
    return {
      msg: 'Welcome to Your header'
    }
  }
}
</script>

<style scoped>
.headerPage {
	height: 60px;
	width: 100%;
	background: #FFFFFF;
	margin: 0;
	color: #333;
}
.header-panel {
	height: 60px;
	line-height: 60px;
	overflow: hidden;
	color: #333!important;
}
.header-panel img {
	height: 2.5rem;
	width: 2.5rem;
	margin-top: 0.25rem;
	border-radius: 2rem;
}
</style>
