<template>
	<div class="billList">
		<el-header style="margin-bottom: -10px;">
			<a-Header class="header-panel"></a-Header>
		</el-header>

		<navbtn></navbtn>
		<div class="bill-c-panel">
			<div class="bill-panel">
				<el-collapse accordion>
					<el-collapse-item>
						<template slot="title">
							<div class="bill-list-item-box">
								<div>
									<img class="bill-list-item-img" src="../../static/img/header.jpg" />
								</div>
								<div class="bill-list-item-box-content">
									<div class="title">与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
									<div><span class="state-box" style="color: #00B7FF;border-color: #00B7FF;">待接单</span></div>
								</div>
							</div>
						</template>
						<div class="bill-list-item-content">
				    	<div class="descriction">与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
				    	<div class="mine-box">
				    		<div class="address">成都市成华区花生露58号</div>
				    		<div class="tel">16554587445</div>
				    	</div>
				    	<div class="img-box">
				    		<el-carousel :interval="4000" type="card" height="120px">
    <el-carousel-item v-for="item in 6" :key="item">
      <h3>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
				    	</div>
				    	<div class="btn-box">
			    		  	<el-button type="primary" round class="bill-btn">修正信息</el-button>
				    		<el-button round class="bill-btn">取消订单</el-button>
				    	</div>
				    </div>
					</el-collapse-item>
					
					
					<el-collapse-item>
						<template slot="title" class="bill-list-item">
							<img class="bill-list-item-img" src="../../static/img/header.jpg" />
						</template>
						<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
						<div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
					</el-collapse-item>
				
				</el-collapse>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'billList',
		data() {
			return {

			}
		},
		methods: {

		},
		mounted: function() {
			var pathTemp = this.$route.path.split('/');
			console.log(pathTemp[3]);
		}
	}
</script>
<style>
	.billList {
		width: 100%;
	}
	
	.el-header {
		padding: 0;
	}
	
	.bill-c-panel {
		width: 100%;
	}
	
	.bill-panel {
		width: 96%;
		min-height: 300px;
		border-radius: 5px;
		margin: 10px auto;
		text-align: left;
	}
	
	.el-collapse {
		background: none;
		border-top: 0px;
	}
	
	.el-collapse-item {
		border-radius: 5px;
		margin: 10px auto;
		background: #FFFFFF;
	}
	
	.el-collapse-item__header {
		height: 100px;
	}
	
	.el-collapse-item__arrow {
		line-height: 30px;
		font-size: 25px;
		font-weight: lighter;
		color: #CCCCCC;
		margin-top: 35px;
		margin-right: 10px;
		width: 6%;
	}
	
	.el-collapse-item__content {
		padding-bottom: 5px;
	}
	
	.bill-list-item-img {
		height: 80px;
		line-height: 80px;
		width: 80px;
		margin: 10px;
		border-radius: 5px;
	}
	
	.bill-list-item-box {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	
	.bill-list-item-box-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100px;
		width: 80%;
	}
	
	.bill-list-item-box-content .title {
		font-size: 16px;
		width: 90%;
		height: 60px;
		line-height: 50px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.state-box {
		padding: 5px;
		padding-top: 3px;
		padding-bottom: 3px;
		border: 1px solid;
		border-radius: 5px;
		font-size: 8px;
	}
	
	.bill-list-item-content {
		/*padding: 10px;*/
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		font-size: 12px;
		width:100%;
	}
	
	.mine-box {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 5px 0;
	}
	
	.mine-box .address {
		color: #00B7FF;
	}
	
	.mine-box .tel {
		color: #409eff;
	}
	
	.img-box {
		height: 150px;
	}
	
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
	}
	
	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}
	
	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
	
	.btn-box {
		/*float: right;*/
		text-align: center;
	}
	
	.bill-btn {
		padding: 8px 16px !important;
		font-size: 8px;
	}
</style>