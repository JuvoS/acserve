<template>
  <div>
  	<el-header style="margin-bottom: -10px;">
	  	<ass-Header class="header-panel"></ass-Header>
	  </el-header>
		<div class="address-list-panel">
				<ul class="address-list">
							<li class="list-item">
								<div class="item-add" @click="addAddress()">
									<i class="el-icon-plus"></i>
								</div>
							</li>
							<li class="list-item" v-show="noAddresss">
								<div class="item-add" style="font-size: 12px;color: #CCCCCC;">
									暂无数据
								</div>
							</li>
							<li class="list-item"  v-for="item in addressList">
								<div class="list-item-row">
									<div class="item-row-left">地址名称:{{ item.name }}</div>
									<a class="item-row-right" @click="onChangeAddress(item.addressCode,'name',item.name)">修改名称</a>
								</div>
								<div class="list-item-row">
									<div class="item-row-left">地址信息:{{ item.info }}</div>
									<a class="item-row-right" @click="onChangeAddress(item.addressCode,'info',item.info)">修改地址</a>
								</div>
								<div class="list-item-row">
									<div class="item-row-left">联系电话:{{ item.tel }}</div>
									<a class="item-row-right" @click="onChangeAddress(item.addressCode,'tel',item.tel)">更换号码</a>
								</div>
							</li>
						</ul>
		</div>
		<div class="bgmask" v-show="bgmaskFlag"></div>
		<el-row class="address-form-panel" v-show="addPanelFlag">
			<el-col class="address-form-list">
				<div class="address-form-list-title"><div class="title-box">添加地址</div><div class="title-icon" @click="closeAdd()"><i class="el-icon-close"></i></div></div>
				<hr style="margin: 10px 0;background-color:#eee;height:1px;border:none;">
				<el-form ref="addressForm" :model="addressForm" label-width="80px">
					<el-form-item label="地址名称"><el-input v-model="addressForm.name"></el-input></el-form-item>
					<el-form-item label="地址信息"><el-input v-model="addressForm.info"></el-input></el-form-item>
					<el-form-item label="联系电话"><el-input v-model="addressForm.tel"></el-input></el-form-item>
					<input style="display: none;" v-model="addressForm.userCode" />
					<el-form-item style="margin-left: -80px;">
						<el-button type="primary" @click="onSubmitAddress()">添加</el-button>
    				<el-button @click="closeAdd()">取消</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row class="address-form-panel" v-show="changeNamePanelFlag">
			<el-col class="address-form-list">
				<div class="address-form-list-title"><div class="title-box">修改地址名称</div><div class="title-icon" @click="closeChange()"><i class="el-icon-close"></i></div></div>
				<hr style="margin: 10px 0;background-color:#eee;height:1px;border:none;">
				<el-form ref="changeForm" :model="changeForm" label-width="80px">
					<el-form-item label="地址名称"><el-input v-model="changeForm.name"></el-input></el-form-item>
					<el-form-item style="margin-left: -80px;">
						<el-button type="primary" @click="onChangeNow('name')">修改</el-button>
    				<el-button @click="closeChange()">取消</el-button>
					</el-form-item>
					<input v-model="changeAddressCode" style="display: none;" />
				</el-form>
			</el-col>
		</el-row>
		<el-row class="address-form-panel" v-show="changeInfoPanelFlag">
			<el-col class="address-form-list">
				<div class="address-form-list-title"><div class="title-box">修改地址信息</div><div class="title-icon" @click="closeChange()"><i class="el-icon-close"></i></div></div>
				<hr style="margin: 10px 0;background-color:#eee;height:1px;border:none;">
				<el-form ref="changeForm" :model="changeForm" label-width="80px">
					<el-form-item label="地址信息"><el-input v-model="changeForm.info"></el-input></el-form-item>
					<el-form-item style="margin-left: -80px;">
						<el-button type="primary" @click="onChangeNow('info')">修改</el-button>
    				<el-button @click="closeChange()">取消</el-button>
					</el-form-item>
					<input v-model="changeAddressCode" style="display: none;" />
				</el-form>
			</el-col>
		</el-row>
		<el-row class="address-form-panel" v-show="changeTelPanelFlag">
			<el-col class="address-form-list">
				<div class="address-form-list-title"><div class="title-box">修改联系电话</div><div class="title-icon" @click="closeChange()"><i class="el-icon-close"></i></div></div>
				<hr style="margin: 10px 0;background-color:#eee;height:1px;border:none;">
				<el-form ref="changeForm" :model="changeForm" label-width="80px">
					<el-form-item label="联系电话"><el-input v-model="changeForm.tel"></el-input></el-form-item>
					<el-form-item style="margin-left: -80px;">
						<el-button type="primary" @click="onChangeNow('tel')">修改</el-button>
    				<el-button @click="closeChange()">取消</el-button>
					</el-form-item>
					<input v-model="changeAddressCode" style="display: none;" />
				</el-form>
			</el-col>
		</el-row>
  
  </div>
</template>

<script>
export default {
  name: 'address-list',
  data () {
    return {
      msg: 'Welcome to AC',
	    userCode: '',
      addressList: [{}],
      addressForm: {
	      name: '',
	      info: '',
	      tel: '',
	      userCode: this.userCode
	    },
	    changeForm: {
	      name: '',
	      info: '',
	      tel: ''
	    },
	    changeAddressCode: '',
	    bgmaskFlag: false,
	    addPanelFlag: false,
	    changeNamePanelFlag: false,
	    changeInfoPanelFlag: false,
	    changeTelPanelFlag: false,
	    noAddresss: true
    }
  },
  methods: {
  	getAddressList(){
  		this.$axios.get(this.$localUrl + 'address/list?code='+this.userCode).then((response) => {
				this.addressList = response.data;
				
				if(response.data !==null && response.data.length !==0){
					this.noAddresss = false;
				}
			}).catch((err) => {
				console.log(err);
			});
  	},
  	addAddress(){
  		this.bgmaskFlag = true;
  		this.addPanelFlag = true;
  	},
	  closeAdd(){
	  	this.bgmaskFlag = false;
  		this.addPanelFlag = false;
	  },
	  closeChange(){
	  	this.changeAddressCode = '';
	  	this.bgmaskFlag = false;
	  	this.changeNamePanelFlag = false;
	  	this.changeInfoPanelFlag = false;
	  	this.changeTelPanelFlag = false;
	  },
	  onSubmitAddress(){
	    this.$refs['addressForm'].validate((valid) => {
				if(valid) {
					var dataForm = this.addressForm;
					if(this.addressForm.userCode){
						this.$axios.post(this.$localUrl + 'address/create', dataForm, {
							transformRequest: [function(data) {return JSON.stringify(dataForm);}]
						}).then((response) => {
							this.getAddressList();
							this.closeAdd();
						}).catch((err) => {
							console.log(err);
						});
					}
				} else {
					console.log('error submit!!');
					return false;
				}
			});
	  },
	  onChangeAddress(code,which,val){
	  	this.changeAddressCode = code;
	  	this.bgmaskFlag = true;
	  	if(which == 'name') {
	  		this.changeNamePanelFlag = true;
	  		this.changeForm.name = val;
	  	}
	  	if(which == 'info') {
	  		this.changeInfoPanelFlag = true;
	  		this.changeForm.info = val;
	  	}
	  	if(which == 'tel') {
	  		this.changeTelPanelFlag = true;
	  		this.changeForm.tel = val;
	  	}
	  },
	  onChangeNow(which){  	
	  	var obj = {
	  		'addressCode': this.changeAddressCode
	  	}
      if(which == 'name') obj.name = this.changeForm.name;
	  	if(which == 'info') obj.info = this.changeForm.info;
	  	if(which == 'tel') obj.tel = this.changeForm.tel;

			this.$axios.post(this.$localUrl + 'address/update', obj, {
				transformRequest: [function(data) {return JSON.stringify(obj);}]
			}).then((response) => {
				if(response.data.code == 200){
					this.getAddressList();
					this.closeChange();
					this.resetChangeForm(which);
				}
			}).catch((err) => {
				console.log(err);
			});
	  },
	  resetChangeForm(which){
	  	if(which == 'name') this.changeForm.name = '';
	  	if(which == 'info') this.changeForm.info = '';
	  	if(which == 'tel') this.changeForm.tel = '';
	  	this.changeAddressCode = '';
	  }
  },
  mounted: function(){	
  	this.userCode = sessionStorage.userCode;
  	this.addressForm.userCode = this.userCode;
  	this.getAddressList();
  }
  
}
</script>

<style scoped>
	.el-header{
		padding: 0;
	}
	.address-list-panel {
		width: 100%;
		min-height: 100%;
	}
	.address-list-panel ul{
		list-style: none;
		margin: 0;
		padding-left: 0;
		font-size: 12px;
	}
.list-item {
	width: 96%;
	height: 100px;
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
	top: 25%;
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
</style>
