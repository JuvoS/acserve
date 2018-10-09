<template>
	<div class="userCreate">
		
		<el-container v-loading="loading">
			<el-card class="box-card">
				<h3>创建用户</h3>
				<hr>
				<el-form ref="userInfoForm" :model="userInfoForm" :rules="rules" :label-width="formLabelWidth">
				  	<el-form-item label="用户名" prop="userName">
				      <el-input v-model="userInfoForm.userName" autocomplete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="手机号" prop="userTel">
				      <el-input v-model="userInfoForm.userTel" v-model.number="userInfoForm.userTel" autocomplete="off" @change="telChange()"></el-input>
				    </el-form-item>
				    <el-form-item label="手机号检验">
				      <el-button @click="checkTelState()">检验</el-button>
				      <el-switch v-model="telFlag" active-color="#13ce66" inactive-color="#ff4949" disabled="disabled" readonly="readonly"></el-switch>
				    </el-form-item>
				    <el-form-item label="用户密码" >
				      <el-input v-model="userInfoForm.userPass" autocomplete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="用户状态">
				      <el-select v-model="userInfoForm.userFlag" placeholder="请选择用户状态">
					      <el-option label="可用" value="0"></el-option>
					      <el-option label="冻结" value="101"></el-option>
						</el-select>
				    </el-form-item>
				    <el-form-item label="账号类型">
				    	<el-select v-model="userInfoForm.userTypeCode" placeholder="请选择账号类型">
					      <el-option label="普通用户" value="0"></el-option>
					      <el-option label="售后服务人员" value="101"></el-option>
					      <el-option label="其他服务人员" value="111"></el-option>
						</el-select>
				    </el-form-item>
				    <el-form-item>
					    <el-button type="primary" @click="onSubmit">立即创建</el-button>
					    <el-button>取消</el-button>
					</el-form-item>
				</el-form>
			</el-card>
			
		</el-container>
	</div>
</template>

<script>
	export default {
		name: 'userCreate',
		data() {
			return {
				msg: 'userCreate',
				userInfoForm: {
					userName: 'AC5',
					userTel: '17852600210',
					userPass: '',
					userFlag: '0',
					userTypeCode: '0'
				},
				rules: {
					userName: [
						{ required: true, message: '请输入活动名称', trigger: 'blur' },
	            		{ min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }],
            		userTel: [
            			{validator: this.checkPhone, trigger: 'blur'}],
        			userPass: [
        				{ required: true, message: '请输入密码', trigger: 'blur' },
	            		{ min: 6, max: 12, message: '长度在 6 到 20 个字符', trigger: 'blur' }]
				},
				formLabelWidth: '120px',
				loading: false,
				telFlag: false
			}
		},
		methods: {
			checkPhone: function(rule, value, callback){
				if (!value) {
					return callback(new Error('手机号不能为空'));
				} else {
					const reg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;	
					console.log(reg.test(value));
					if (reg.test(value)) {
						callback();
					} else {
						return callback(new Error('请输入正确的手机号'));
					}        
				}
			},
			onSubmit() {  
				if(this.checkInfo()){
					this.loading = true;
					this.userInfoForm.serveCode = sessionStorage.userCode;
					var dataForm = this.userInfoForm;
					this.$axios.post(this.$localUrl + 'manage/create', dataForm, {
						transformRequest: [function(data) {return JSON.stringify(dataForm);}]
					}).then((response) => {
						this.messageVal(response.data.message,response.data.code);
						this.$router.push('/user/list');
						this.loading = false;
					}).catch((err) => {
						console.log(err);
					});
				}
				
			},
			checkInfo: function(){
				if(this.isStrEmpty(this.userInfoForm.userName)){ this.messageVal('请填写用户名');return false;}
				if(this.isStrEmpty(this.userInfoForm.userTel)) { this.messageVal('请填写手机号');return false;}
				if(!this.isPhoneNum(this.userInfoForm.userTel)) { this.messageVal('请输入有效的手机号码!');return false;}
				if(this.isStrEmpty(this.userInfoForm.userPass)) {this.messageVal('请填写密码');return false;}
				if(this.isStrEmpty(this.userInfoForm.userFlag)) {this.messageVal('请选择用户状态');return false;}
				if(this.isStrEmpty(this.userInfoForm.userTypeCode)) {this.messageVal('请选择账号类型');return false;}
				if(!this.telFlag) {this.messageVal('请检验手机号是否注册');return false;}
				
				return true;
			},
			messageVal: function(val, typeCode = '101'){
				if(typeCode == '101') {
					this.$message({message: val,type: 'warning'});
					return false;
				}
				if(typeCode == '200') {
					this.$message({message: val,type: 'success'});
					return true;
				}
			},
			telChange: function(){
				this.telFlag = false;
			},
			checkTelState: function(){
				console.log(this.userInfoForm.userTel);
				this.telFlag = false;
				if(!this.isStrEmpty(this.userInfoForm.userTel)){
					var dataForm = {userTel: this.userInfoForm.userTel};
					this.$axios.post(this.$localUrl + 'manage/telcheck', dataForm, {
						transformRequest: [function(data) {return JSON.stringify(dataForm);}]
					}).then((response) => {
						if(this.messageVal(response.data.message,response.data.code)){
							this.telFlag = true;
						}
					}).catch((err) => {
						console.log(err);
					});
				}
			}
		},
		mounted: function() {
			
		}
	}
</script>
<style scoped>
.box-card {
	width: 460px;
	margin: 0 auto;
}
.box-card hr {
	margin: 10px 0;
	background-color: #eee;
	height: 1px;
	border: none;
}
.el-form-item {
	text-align: left;
}
</style>