<template>
	<div class="billList">

		<div class="bill-c-panelmm">
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
								<el-button @click="finishOrder(listitem.demandCode)" v-show="listitem.typeNum==201" type="primary" round class="bill-btn">完成</el-button>
								<el-button @click="refuseOrder(listitem.demandCode)" v-show="listitem.typeNum==201" round class="bill-btn">拒接</el-button>
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
				localUrl: this.$localUrl
			}
		},
		methods: {
			getBillList: function(type) {
				this.$axios.get(this.$localUrl + 'billserve/assignList?code=' + sessionStorage.userCode + '&type=' + type).then((response) => {
					var temp = response.data;
					this.billListFlag = true;
					if(!this.isOwnEmpty(temp)) this.billListFlag = false;
					this.billListData = temp;
				}).catch((err) => {
					console.log(err);
				});
			},
			finishOrder: function(val){
				var dataForm = {
					demandCode: val,
					serveCode: sessionStorage.userCode
				};
				console.log(dataForm);
				this.$axios.post(this.$localUrl + 'billserve/do/finish', dataForm, {
					transformRequest: [function(data) {return JSON.stringify(dataForm);}]
				}).then((response) => {
					this.$message({ message: response.data.message, type: 'success' });
					this.$router.go(0);
				}).catch((err) => {
					console.log(err);
				});
			},
			refuseOrder: function(val){
				var dataForm = {
					demandCode: val,
					serveCode: sessionStorage.userCode
				};
				console.log(dataForm);
				this.$axios.post(this.$localUrl + 'billserve/do/refuse', dataForm, {
					transformRequest: [function(data) {return JSON.stringify(dataForm);}]
				}).then((response) => {
					this.$message({ message: response.data.message, type: 'success' });
					this.$router.go(0);
				}).catch((err) => {
					console.log(err);
				});
			}
		},
		mounted: function() {
			var pathTemp = this.$route.path.split('/');
			this.getBillList(pathTemp[2]);
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
	
	.bill-c-panelmm {
		width: 100%;
		padding-top: 0.1rem;
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
		height: 40px;
		line-height: 40px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.bill-list-item-box-content .address {
		font-size: 10px;
		color: #AAAAAA;
		width: 90%;
		height: 20px;
		line-height: 20px;
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
		padding: 10px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		font-size: 12px;
		width: calc(100% - 20px);
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
		text-align: center;
	}
	
	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
		text-align: center;
	}
	
	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
		text-align: center;
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