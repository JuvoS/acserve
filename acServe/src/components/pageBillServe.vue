<template>
	<div class="billList">
		<el-header style="margin-bottom: -10px;">
			<ass-Header class="header-panel"></ass-Header>
		</el-header>

		<ass-billserve></ass-billserve>
	</div>
</template>

<script>
	export default {
		name: 'billList',
		data() {
			return {
				billListFlag: true,
				billListData: []
			}
		},
		methods: {
			getBillList: function(type) {
				this.$axios.get(this.$localUrl + 'bill/list?code=' + sessionStorage.userCode + '&type=' + type).then((response) => {
					var temp = response.data;
					this.billListFlag = true;
					if(!this.isOwnEmpty(temp)) this.billListFlag = false;
					this.billListData = temp;
				}).catch((err) => {
					console.log(err);
				});
			}
		},
		mounted: function() {

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
		width: 100%;
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