<template>
	<div class="tokenPage">
		<el-row :gutter="20">
			<el-col :span="20" :offset="2">
				<el-form :model="currentForm" :rules="rules" ref="currentForm" label-width="80px">
					<el-form-item>
						<el-input v-model="currentForm.usertel" placeholder="请输入手机号"></el-input>
					</el-form-item>
					<el-form-item>
						<el-input v-model="currentForm.userpass" placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">立即登录</el-button>
					</el-form-item>	
				</el-form>				
			</el-col>
			<el-col :span="20" :offset="2">
				当前Token:<el-input v-model="currentToken" placeholder="请输入内容"></el-input>
			</el-col>
			<el-col :span="20" :offset="2">
				<el-switch v-model="tokenFlag" active-color="#13ce66" inactive-color="#ff4949"></el-switch>		
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'tokenPage',
		data() {
			return {
				currentForm: {
					usertel: '12213456789',
					userpass: '132',
				},
				currentToken: '',
				rules: {
					usertel: [{required: true,message: '请填写手机号',trigger: 'blur'},
						{min: 11,max: 11,message: '长度为11 个字符',trigger: 'change'}],
					userpass: [{required: true,message: '请填写活动形式',trigger: 'blur'}]
				},
				tokenFlag: false
			}
		},
		methods: {
			onSubmit() {
				this.$refs['currentForm'].validate((valid) => {
					if(valid) {
						var dataForm = this.currentForm;
						this.$axios.post(this.$localUrl + 'entry/login', dataForm, {
							transformRequest: [function(data) {return JSON.stringify(dataForm);}]
						}).then((response) => {
							sessionStorage.userCode = response.data.userCode;
							sessionStorage.accessToken = response.data.token;
							this.currentToken = sessionStorage.accessToken;
							this.checkToken();
							console.log(response.data);
						}).catch((err) => {
							console.log(err);
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			checkToken() {
				this.$axios.get(this.$localUrl + 'entry/checkToken?token='+this.currentToken).then((response) => {
					var temp = response.data;
					console.log(response.data);
					if(temp.code == 200){
						this.tokenFlag = true;
					}
				}).catch((err) => {
					console.log(err);
				});
			}
		},
		mounted: function() {
			this.currentToken = sessionStorage.accessToken;
			this.checkToken();
		}
	}
</script>
<style>
	.el-row {
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}
</style>