<template>
	<div class="billListInfo">	
		<div class="billListInfo-panel" v-loading="loading">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/bill/list' }">订单列表</el-breadcrumb-item>
			  <el-breadcrumb-item>订单详情</el-breadcrumb-item>
			</el-breadcrumb>
		<el-row class="listinfo-item">
		  <el-col :span="4">编号：</el-col>
		  <el-col :span="20">{{ demandInfo.demandCode }}</el-col>
		</el-row>
		<el-row class="listinfo-item">
		  <el-col :span="4">地址：</el-col>
		  <el-col :span="8">{{ addressInfo.info }}</el-col>
		  <el-col :span="4">电话：</el-col>
		  <el-col :span="8">{{ addressInfo.tel }}</el-col>
		</el-row>
		<el-row class="listinfo-item">
		  <el-col :span="4">状态：</el-col>
		  <el-col :span="16">{{ demandInfo.type }}</el-col>
		  <el-col :span="4"><a class="type-btn" @click="popUser">指派</a></el-col>
		</el-row>
		<el-row class="listinfo-item">
		  <el-col :span="4">描述：</el-col>
		  <el-col :span="20">{{ demandInfo.describetion }}</el-col>
		</el-row>
		<el-row class="listinfo-item">
		  <el-col :span="4">其他留言：</el-col>
		  <el-col :span="20">{{ demandInfo.supplyInfo }}</el-col>
		</el-row>
		<el-row class="listinfo-item">
		  <el-col :span="24">
				<el-carousel :interval="5000" arrow="always">
					<el-carousel-item v-for="imgitem in demandInfo.img" :key="imgitem.Id" class="img-panel">
						<img :src="localUrl+imgitem.photoUrl" style="text-align: center;height: 100%;"/>
					</el-carousel-item>
				</el-carousel>
		  </el-col>
		</el-row>
		</div>
		
		<el-dialog title="指派维修人员" :visible.sync="userPanelFlag">
			  <el-form :model="userInfo">
			    <el-radio-group v-model="userInfo.repairCode">
			      <el-radio v-for="(useritem) in userlist" :key="useritem.id" :label="useritem.userCode">{{ useritem.userName }}</el-radio>
			    </el-radio-group>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="userPanelFlag = false">取 消</el-button>
			    <el-button type="primary" @click="checkWho">确 定</el-button>
			  </div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'billListInfo',
		data() {
			return {
				demandInfo: [],
				addressInfo: [],
				localUrl: this.$localUrl,
				userPanelFlag: false,
				loading: false,
				userInfo: {
					demandCode: '',
					repairCode: ''
				},
				userlist: []
			}
		},
		methods: {
			getInfoByDemandCode: function(){
				var pathTemp = this.$route.path.split('/');

				this.$axios.get(this.$localUrl + 'billserve/getone/'+pathTemp[4]).then((response) => {
					var temp = response.data;
					this.demandInfo = temp[0];
					this.addressInfo = this.demandInfo.address;
					this.userInfo.demandCode = this.demandInfo.demandCode;
				}).catch((err) => {
					console.log(err);
				});
			},
			popUser: function(){
				this.userPanelFlag = true;
				this.$axios.get(this.$localUrl + 'billserve/getuser').then((response) => {
					var temp = response.data;
					this.userlist = temp;
				}).catch((err) => {
					console.log(err);
				});
			},
			checkWho: function(){
				this.loading = true;
				this.userInfo.serveCode = sessionStorage.userCode;
				var dataForm = this.userInfo;
				this.$axios.post(this.$localUrl + 'billserve/assign', dataForm, {
					transformRequest: [function(data) {return JSON.stringify(dataForm);}]
				}).then((response) => {
					this.resetForm();
					this.$message({message: response.data.message,type: 'success'});
					this.getInfoByDemandCode();
					this.loading = false;
					this.userPanelFlag = false;
				}).catch((err) => {
					console.log(err);
				});
			},
			resetForm: function(){
				this.userInfo.repairCode = '';
			}
		},
		mounted: function() {
			this.getInfoByDemandCode();
		}
	}
</script>
<style scoped="">
	.nav-btn-panel {
	background: #FFFFFF;
	font-size: 12px;
	height: 40px;
	line-height: 40px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	width: 100%;
}
.nav-btn-item {
	height: 20px;
	line-height: 20px;
	width: 80px;
	margin: 10px;
	border: 1px solid #409eff;
	border-radius: 20px;
	color: #409eff;
}
.brandNav {
	width: 100%;
}
.el-table th>.cell{
	text-align: center;
}
.billListInfo-panel {
	background: #FFFFFF;
	padding: 20px 10px;
}
.listinfo-item {
	padding: 5px 10px;
	background: #FFFFFF;
	font-size: 12px;
	text-align: left;
}
.img-panel {
	text-align: center;
}
.type-btn {
	color: #409EFF;
	border: 1px solid #409EFF;
	padding: 2px 10px;
}
.el-breadcrumb {
	margin-bottom: 10px;
}
</style>