<template>
	<div class="billList">
		<el-header style="margin-bottom: -10px;">
			<ass-Header class="header-panel"></ass-Header>
		</el-header>
		
		<el-tabs :tab-position="tabPosition" style="min-height: 400px;background: #FFFFFF;padding: 10px;">
		    <el-tab-pane label="用户管理">用户管理</el-tab-pane>
		    <el-tab-pane label="配置管理">配置管理</el-tab-pane>
		    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
		    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
		</el-tabs>

		<ass-Navbtn v-on:getBillList="getBillList"></ass-Navbtn>
		<div class="bill-c-panel">
			<div class="bill-panel">
				<el-collapse accordion>
					<el-collapse-item v-show="billListFlag">
						<template slot="title">
						<div style="text-align: center;line-height: 6rem;">暂无数据</div>
						</template>
					</el-collapse-item>
					<el-collapse-item v-for="(listitem, index) in billListData" :key="index">
						<template slot="title">
							<div class="bill-list-item-box">
								<div>
									<img class="bill-list-item-img" :src="localUrl+listitem.showImg" />
								</div>
								<div class="bill-list-item-box-content">
									<div class="title">{{ listitem.describetion }}</div>
									<div class="address">{{ listitem.address.info }}</div>
									<div><span class="state-box" style="color: #00B7FF;border-color: #00B7FF;">{{ listitem.type }}</span></div>
								</div>
							</div>
						</template>
						<div class="bill-list-item-content">
							<div class="descriction">{{ listitem.describetion }}</div>
							<div class="mine-box">
								<div class="address">{{ listitem.address.info }}</div>
								<div class="tel">{{ listitem.address.tel }}</div>
							</div>
							<div class="img-box">
								<el-carousel :interval="4000" type="card" height="120px">
									<el-carousel-item v-for="imgitem in listitem.img" :key="imgitem.Id">
										<img :src="localUrl+imgitem.photoUrl" style="text-align: center;height: 100%;"/>
									</el-carousel-item>
								</el-carousel>
							</div>
							<div class="btn-box">
								<el-button v-show="listitem.typeNum==200" type="primary" round class="bill-btn">接单</el-button>
								<el-button v-show="listitem.typeNum==201" type="primary" round class="bill-btn">完成</el-button>
								<el-button v-show="listitem.typeNum==201" round class="bill-btn">拒接</el-button>
								<el-button v-show="listitem.typeNum==203" type="primary" round class="bill-btn">评价</el-button>
								
								<!--<el-button v-show="listitem.typeNum==200" type="primary" round class="bill-btn">修正订单</el-button>
								<el-button v-show="listitem.typeNum==200||listitem.typeNum==201" round class="bill-btn">取消订单</el-button>
								<el-button v-show="listitem.typeNum==203" type="primary" round class="bill-btn">评价</el-button>
								<el-button v-show="listitem.typeNum==102" type="primary" round class="bill-btn">编辑</el-button>-->
							</div>
						</div>

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
				billListFlag: true,
				billListData: [],
				localUrl: this.$localUrl,
				tabPosition: 'left'
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
			var pathTemp = this.$route.path.split('/');
			this.getBillList(pathTemp[3]);
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