<template>
	<div class="userCreate">
		
		<el-container v-loading="loading">
			<el-card class="box-card">
				<h3>创建用户</h3>
				<hr>
				<el-form ref="userInfoForm" :model="userInfoForm" :label-width="formLabelWidth">
				  	<el-form-item label="用户名">
				      <el-input v-model="userInfoForm.userName" autocomplete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="手机号">
				      <el-input v-model="userInfoForm.userTel" autocomplete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="手机号检验">
				      <el-button>检验</el-button>
				      <el-switch v-model="telFlag" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
				    </el-form-item>
				    <el-form-item label="用户密码" >
				      <el-input v-model="userInfoForm.userPass" autocomplete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="用户状态">
				      <el-input v-model="userInfoForm.userFlag" autocomplete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="账号类型">
				      <el-input v-model="userInfoForm.userTypeCode" autocomplete="off"></el-input>
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
					userName: 'AC',
					userTel: '',
					userPass: '',
					userFlag: '',
					userTypeCode: ''
				},
				formLabelWidth: '120px',
				loading: false,
				telFlag: false
			}
		},
		methods: {
			onSubmit() {
				console.log(this.userInfoForm);
//		        this.loading = true;
//				this.userInfoForm.serveCode = sessionStorage.userCode;
//				
//				if(this.checkInfo){
//					var dataForm = this.userInfoForm;
//					this.$axios.post(this.$localUrl + 'manage/edit', dataForm, {
//						transformRequest: [function(data) {return JSON.stringify(dataForm);}]
//					}).then((response) => {
//						this.resetForm();
//						this.getBillList();
//						this.loading = false;
//					}).catch((err) => {
//						console.log(err);
//					});
//				}
				
			},
			checkInfo: function(){
				if(this.isEmpty(this.userInfoForm.userName)) return this.messageVal('请填写用户名');
				if(this.isEmpty(this.userInfoForm.userTel)) return this.messageVal('请填写手机号');
				if(this.isEmpty(this.userInfoForm.userPass)) return this.messageVal('请填写手机号');
			},
			messageVal: function(val){
				this.$message({message: val,type: 'warning'});
				return false;
			}
		},
		mounted: function() {
			
		}
	}
</script>
<style scoped>
.box-card {
	width: 100%;
}
.box-card hr {
	margin: 10px 0;
	background-color:#eee;
	height:1px;
	border:none;
}
</style>