<template>
  <div class="device">
  	<el-header>
	  	<ass-Header class="header-panel"></ass-Header>
	</el-header>
		<div class="device-list-panel">
			<ul class="address-list" v-loading="loading">
				<li class="list-item" v-show="noUserModel">
					<div class="item-add" style="font-size: 12px;color: #CCCCCC;">
						暂未添加设备
					</div>
				</li>
				<li class="list-item" v-for="item in userModelArr">
					<div class="list-item-row">
						<div class="item-row-left">当前型号:{{ item.modelName }}</div>
						<a class="item-row-right" @click="onChangeUserModel(item.Id,item.modelName,item.buyTime)">修改</a>
					</div>
					<div class="list-item-row">
						<div class="item-row-left">购买日期:{{ item.buyTime }}</div>
						<a class="item-row-right" @click="deleteRow(item.Id,item.modelName)">删除</a>
					</div>
				</li>
			</ul>
		</div>
		<div class="adddevice-btn">
			<div class="adddevice-btn-item" @click="addModelUser()">
				<i class="el-icon-plus"></i>
			</div>
		</div>
		<div class="bgmask" v-show="bgmaskFlag"></div>
		<el-row class="address-form-panel" v-show="addPanelFlag">
			<el-col class="address-form-list">
				<div class="address-form-list-title"><div class="title-box">添加设备</div><div class="title-icon" @click="closeAdd()"><i class="el-icon-close"></i></div></div>
				<hr style="margin: 10px 0;background-color:#eee;height:1px;border:none;">
				<el-form ref="deviceUserForm" :model="deviceUserForm" label-width="80px">
				    <el-form-item label="型号选择">
				      <el-select v-model="deviceUserForm.modelName" placeholder="请选择型号">
				    	<div v-for="item in modelArr">
				      	<el-option :label="item.name" :value="item.name"></el-option>
				      	</div>
				      </el-select>
				    </el-form-item>
					<el-form-item label="购买日期">
						 <el-date-picker type="date" placeholder="选择购买日期" v-model="deviceUserForm.buyTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
					</el-form-item>
					<input style="display: none;" v-model="deviceUserForm.userCode" />
					<el-form-item style="margin-left: -80px;">
						<el-button type="primary" @click="submitForm()">添加</el-button>
    				<el-button @click="closeAdd()">取消</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row class="address-form-panel" v-show="changePanelFlag">
			<el-col class="address-form-list">
				<div class="address-form-list-title"><div class="title-box">修改设备信息</div><div class="title-icon" @click="closeAdd()"><i class="el-icon-close"></i></div></div>
				<hr style="margin: 10px 0;background-color:#eee;height:1px;border:none;">
				<el-form ref="changeDeviceUserForm" :model="changeDeviceUserForm" label-width="80px">
				    <el-form-item label="型号选择">
				      <el-select v-model="changeDeviceUserForm.modelName" placeholder="请选择型号">
				    	<div v-for="item in modelArr">
				      	<el-option :label="item.name" :value="item.name"></el-option>
				      	</div>
				      </el-select>
				    </el-form-item>
					<el-form-item label="购买日期">
						 <el-date-picker type="date" placeholder="选择购买日期" v-model="changeDeviceUserForm.buyTime"
						 	 format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="changeDeviceUserForm.buyTime=$event"></el-date-picker>
					</el-form-item>
					<el-form-item style="margin-left: -80px;">
						<el-button type="primary" @click="submitChange()">修改</el-button>
    				<el-button @click="closeAdd()">取消</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-dialog
		  title="提示"
		  :visible.sync="delDialogVisible"
		  width="80%"
		  center>
		  <div>确认删除？</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="resetForm()">取 消</el-button>
		    <el-button type="primary" @click="onDelUserModel()">确 定</el-button>
		  </span>
		</el-dialog>
  </div>
</template>

<script>
export default {
  name: 'device',
  data () {
    return {
      	deviceUserForm: {
	      modelName: '',
	      userCode: '',
	      buyTime: ''
	    },
	    changeDeviceUserForm: {
	      Id	: '',
	      modelName: '',
	      userCode: '',
	      buyTime: ''
	    },
	    bgmaskFlag: false,
	    addPanelFlag: false,
	    changePanelFlag: false,
	    delDialogVisible: false,
	    noUserModel: true,
	    loading: false,
        modelArr:{},
        userModelArr:{}
    }
  },
  methods: {
  	init: function(){
		this.modelArrGet();
	},
	modelArrGet: function(){
		this.$axios.get(this.$localUrl + 'device/modelGet').then((response) => {
			this.modelArr = response.data;
		}).catch((err) => {
			console.log(err);
		});
	},
  	getModelList: function(){
		this.$axios.get(this.$localUrl + 'device/list/modelUser/'+sessionStorage.userCode).then((response) => {
			this.userModelArr = response.data;
			var modelArrTemp = response.data;
			for(var i=0;i<modelArrTemp.length;i++){
				modelArrTemp[i].buyTime = modelArrTemp[i].buyTime.substring(0,10);
			}
			if(response.data !==null && response.data.length !==0){
				this.noUserModel  = false;
			}
		}).catch((err) => {
			console.log(err);
		});
  	},
  	addModelUser: function(){
  		this.bgmaskFlag = true;    
  		this.addPanelFlag = true;
  	},
	resetForm: function(){
		this.deviceUserForm = {};
		this.changeDeviceUserForm = {};
		this.bgmaskFlag = false; 
		this.addPanelFlag = false;
		this.changePanelFlag = false;
		this.delDialogVisible = false;
	},
	submitForm: function(){
		this.loading = true;
		this.deviceUserForm.userCode = sessionStorage.userCode;
		var dataForm = this.deviceUserForm;
		this.$axios.post(this.$localUrl + 'device/create/user', dataForm, {
			transformRequest: [function(data) {return JSON.stringify(dataForm);}]
		}).then((response) => {
			this.resetForm();
			this.getModelList();
			this.loading = false;
		}).catch((err) => {
			console.log(err);
		});
	},
	onChangeUserModel: function(index, modelName,buyTime){
		this.changeDeviceUserForm.Id = index;
		this.changeDeviceUserForm.modelName = modelName;
		this.changeDeviceUserForm.buyTime = buyTime;
		this.bgmaskFlag = true; 
		this.changePanelFlag = true;
	},
	logTimeChange: function(val){
		return this.changeDeviceUserForm.buyTime = val;
	},
	submitChange: function(){
		this.loading = true;
		this.changeDeviceUserForm.userCode = sessionStorage.userCode;
		var dataForm = this.changeDeviceUserForm;
		this.$axios.post(this.$localUrl + 'device/edit/user', dataForm, {
			transformRequest: [function(data) {return JSON.stringify(dataForm);}]
		}).then((response) => {
			this.resetForm();
			this.getModelList();
			this.loading = false;
		}).catch((err) => {
			console.log(err);
		});
	},
	deleteRow: function(index,modelName) {
    	this.delDialogVisible = true;
		this.changeDeviceUserForm.userCode = sessionStorage.userCode;
		this.changeDeviceUserForm.Id = index;
   	},
	onDelUserModel: function(){
		var dataForm = this.changeDeviceUserForm;
		this.$axios.post(this.$localUrl + 'device/del/user', dataForm, {
			transformRequest: [function(data) {return JSON.stringify(dataForm);}]
		}).then((response) => {
			this.resetForm();
			this.getModelList();
		}).catch((err) => {
			console.log(err);
		});
	}
  },
  mounted: function(){	
  	this.deviceUserForm.userCode = sessionStorage.userCode;
  	this.getModelList();
  	this.init();
  }
  
}
</script>

<style scoped>
	.el-header{
		padding: 0;
	}
	.device-list-panel {
		width: 100%;
		min-height: 100%;
		padding-top: 0.1rem;
	}
	.device-list-panel ul{
		list-style: none;
		margin: 0;
		padding-left: 0;
		font-size: 12px;
	}
.list-item {
	width: 96%;
	height: 70px;
	overflow: hidden;
	background: #FFFFFF;
	border-radius: 5px;
	margin: 10px auto;
	padding: 10px 0;
}
.list-item-row {
	height: 30px;
	line-height: 30px;
	margin-top: 3px;
	display: flex;
	flex-direction: row;
	justify-content: initial;
}
.item-row-left {
	flex: 1;
	padding-left: 15px;
	text-align: left;
}
.item-row-right {
	text-align: right;
	padding-right: 15px;
	color: #409eff;
}
.item-add {
	text-align: center;
	width: 100%;
	line-height: 100px;
	font-size: 40px;
}
.address-list{
	z-index: 1;
}
.bgmask {
	background: rgba(0,0,0,0.5);
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 10;
	top: 0;
	left: 0;
}
.address-form-panel {
	width: 100%;
	position: fixed;
	top: 20%;
	z-index: 11;
}
.address-form-list {
	background: #FFFFFF;
	width: 90%;
	margin: 0 auto;
	position: relative;
	font-size: 12px;
	margin-left: 5%;
	padding: 20px 5px;
	padding-bottom: 0px;
	border-radius: 10px;
}
.address-form-list-title {
	display: flex;
	flex-direction: row;
	justify-content: center;
	text-align: center;
	margin-bottom: 15px;
	font-size: 16px;
	line-height: 20px;
}
.title-box {
	flex: 1;
}
.title-icon {
	padding-right: 10px;
}
.el-form-item {
	margin-left: 20px;
	margin-right: 20px;
}

.adddevice-btn {
	position: fixed;
	bottom: 2rem;
	left: calc(50% - 1.725rem);
}
.adddevice-btn-item {
	background: #FFFFFF;
	border-radius: 10rem;
	-moz-box-shadow:2px 2px 9px #D4D4D4; -webkit-box-shadow:2px 2px 9px #D4D4D4; box-shadow:2px 2px 9px #D4D4D4;
	width: 3.5rem;
	height: 3.5rem;
	line-height: 3.5rem;
	font-size: 2rem;
}
</style>
