<template>
  <div class="index">
  	<el-container class="wrapper-content">

	  	<el-main class="wrapper-content">
		  	<el-carousel :interval="4000" type="card" height="300px">
			    <el-carousel-item v-for="item in 6" :key="item">
			      <h3>{{ item }}</h3>
			    </el-carousel-item>
			  </el-carousel>
			  
			  <div class="wrapper-grid">
		  		<div class="grid-wrapper">
					  <div class="grid-item">
					  	<el-card shadow="hover">
							  <div slot="header" class="clearfix">
							    <span>卡片名称</span>
							    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
							  </div>
							  <div v-for="o in 4" :key="o" class="text item">
							    {{'列表内容 ' + o }}
							  </div>
							</el-card>
					  </div>
					  <div class="grid-item">
					  	<el-card shadow="hover">
							  <div slot="header" class="clearfix">
							    <span>卡片名称</span>
							    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
							  </div>
							  <div v-for="o in 4" :key="o" class="text item">
							    {{'列表内容 ' + o }}
							  </div>
							</el-card>
					  </div>
					  <div class="grid-item">
					  	<el-card shadow="hover">
							  <div slot="header" class="clearfix">
							    <span>卡片名称</span>
							    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
							  </div>
							  <div v-for="o in 4" :key="o" class="text item">
							    {{'列表内容 ' + o }}
							  </div>
							</el-card>
					  </div>
					  <div class="grid-item">
					  	<el-card shadow="hover">
							  <div slot="header" class="clearfix">
							    <span>卡片名称</span>
							    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
							  </div>
							  <div v-for="o in 4" :key="o" class="text item">
							    {{'列表内容 ' + o }}
							  </div>
							</el-card>
					  </div>
					  <div class="grid-item">
					  	<el-card shadow="hover">
							  <div slot="header" class="clearfix">
							    <span>卡片名称</span>
							    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
							  </div>
							  <div v-for="o in 4" :key="o" class="text item">
							    {{'列表内容 ' + o }}
							  </div>
							</el-card>
					  </div>
					  <div class="grid-item">
					  	<el-card shadow="hover">
							  <div slot="header" class="clearfix">
							    <span>卡片名称</span>
							    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
							  </div>
							  <div v-for="o in 4" :key="o" class="text item">
							    {{'列表内容 ' + o }}
							  </div>
							</el-card>
					  </div>
					</div>
		  	</div>
			  
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
<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .wrapper-grid{
	  min-height: 300px;
		width: 100%;
		margin: 0 auto;
		font-size: 12px;
 	}
 	.grid-wrapper {
		min-height: 300px;
		display: grid;
		grid-template-columns: 50% 50%;
	  grid-template-rows: auto auto auto;
	  text-align: center;
	}
	.grid-item {
		width: 98%;
		margin: 1%;
		background: #FFFFFF;
		
	}
</style>
