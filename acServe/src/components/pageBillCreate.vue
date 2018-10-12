<template>
	<div class="formPage">
		<el-header>
		  	<ass-Header class="header-panel"></ass-Header>
		</el-header>
		<div class="bill-c-panel">
			<div class="bill-panel">
				<div class="legend-title">需求表单</div>
				<hr>
				<form class="bill-panel-form">
					<div class="bill-form-item-row">
						<div class="left-flex-box">
							<span>联系地址</span>
							<input v-model="address.info" disabled="true" readOnly="true"/>
						</div>
						<a @click="addressGet()" style="text-align: center;color: #00B7FF;">选择</a>
					</div>
					<div class="bill-form-item-row">
						<div class="left-flex-box">
							<span>联系电话</span>
							<input v-model="address.tel" disabled="true"　readOnly="true"/>
						</div>
						<div></div>
					</div>
					<div class="bill-form-item-row">
						<div class="left-flex-box">
							<span>怎么称呼</span>
							<input v-model="billForm.personName" />
						</div>
						<div></div>
					</div>
					<div class="bill-form-item-colmun">
						<div class="form-title">需求描述</div>
						<div class="form-colmun-text">
							<textarea v-model="billForm.describetion"></textarea>
						</div>
					</div>
					<div class="bill-form-item-colmun">
						<div class="form-title">现场情况</div>
						<div class="form-colmun-text" >
							<ass-imgup v-on:photoByNow="photoByNow"></ass-imgup>					
						</div>
					</div>
					<div class="bill-form-item-colmun">
						<div class="form-title">其他留言</div>
						<div class="form-colmun-text">
							<textarea v-model="billForm.supplyInfo"></textarea>
						</div>
					</div>
					<div class="form-item-sub">
						<el-button type="primary" @click="onSubBill()" round style="text-align: center;">发布需求</el-button>
					</div>
				</form>
			</div>
		</div>
		
		<div class="bgmask" v-show="bgmaskFlag"></div>
		<el-row class="address-form-panel" v-show="adrPanelFlag">
			<el-col class="address-form-list">
				<div class="address-form-list-title"><div class="title-box">添加地址</div><div class="title-icon" @click="closeAdrGet()"><i class="el-icon-close"></i></div></div>
				<hr style="margin: 10px 0;background-color:#eee;height:1px;border:none;">
				<div class="address-list">
					<ass-adrlist v-on:adrByNow="adrByNow"></ass-adrlist>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'formPage',
		data() {
	      return {
	        	bgmaskFlag: false,
	        	adrPanelFlag: false,
	        	name: '',
	        	address: {
	        		addressCode: '',
	        		info: '',
	        		tel: ''
	        	},
	        	billForm: {
	        		addressCode: '',
	        		describetion: '',
	        		photoCode: '1111',
	        		supplyInfo: '',
	        		userCode: '',
	        		personName: ''
	        	}
	    	}
      },
      methods: {
      	onSubBill(){
      		console.log(this.billForm);
			if(!this.billForm.addressCode) return this.warningNow('请选择地址');
			if(!this.billForm.personName) return this.warningNow('请填写称呼');
			if(!this.billForm.describetion) return this.warningNow('请填写需求');
			
			this.billForm.userCode = sessionStorage.userCode;
			var dataForm = this.billForm;
			this.$axios.post(this.$localUrl + 'bill/create', dataForm, {
				transformRequest: [function(data) {return JSON.stringify(dataForm);}]
			}).then((response) => {
				this.$router.push('/bill/list/wait');
			}).catch((err) => {
				console.log(err);
			});
				
      	},
      	warningNow(val){
      		this.$message({message: val,type: 'warning'});
      	},
      	addressGet(){
      		this.bgmaskFlag = true;
      		this.adrPanelFlag = true;
      	},
      	adrByNow(obj){
	        this.address = obj;
	        this.billForm.addressCode = this.address.addressCode;
	        this.closeAdrGet();
      	},
      	closeAdrGet(){
      		this.bgmaskFlag = false;
      		this.adrPanelFlag = false;
      	},
      	photoByNow(photoCode){
      		this.billForm.photoCode = photoCode;
      	}
      },
      mounted: function(){
      	
      }
	}
</script>
<style scoped="">
.el-header {
	padding: 0;
}
.bill-c-panel {
	width: 100%;
	margin-top: 3.4rem;
}
.bill-panel {
	width: 96%;
	min-height: 300px;
	background: #FFFFFF;
	border-radius: 5px;
	margin: 10px auto;
	padding: 10px 0;
	font-size: 12px;
}
.bill-panel hr {
	margin: 10px 0;
	background-color:#eee;
	height:1px;
	border:none;
}
.legend-title {
	padding-left: 10px;
	font-size: 14px;
}
.bill-panel-form {
	padding: 10px;
	padding-top: 0;
	padding-bottom: 5px;
}
.bill-form-item-colmun {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin: 0.3rem auto;
	text-align: left;
}
.bill-form-item-colmun textarea {
	width: 98%;
	min-height: 5rem;
	background: #EEEEEE;
	border: none;
	padding: 5px;
}
.bill-form-item-row {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 0.8rem auto;
	height: 1.5rem;
}
.left-flex-box {
	flex: 1;
	text-align: left;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	max-width: 85%;
	height: 1.5rem;
	line-height: 1.5rem;
}
.left-flex-box span{
	margin: 0 10px;
	margin-left: 0;
}
.left-flex-box input{
	flex: 1;
	width: 80%;
	border: none;
	background: #EEEEEE;
	border-radius: 0.25rem;
	padding: 0 5px;
}
.form-colmun-text {
	width: 100%;
	min-height: 5rem;
}
.form-title {
	height: 1.5rem;
}
.form-item-sub {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
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
	top: 10%;
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

.address-list {
	height: 20rem;
	overflow: hidden;
	overflow-y: auto;
	overflow-x: 0;
	margin-bottom: 1rem;
}
.address-list::-webkit-scrollbar {/*滚动条整体样式*/
        width: 0.25rem;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
.address-list::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 0.2rem;
         -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #535353;
    }
.address-list::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0.2rem;
        background: #EDEDED;
    }
</style>