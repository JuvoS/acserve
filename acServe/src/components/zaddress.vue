<template>
	<div class="formPage">
		<el-row :gutter="20">
			<el-col :span="10" :offset="2">
				<el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="80px">
					<el-form-item label="手机号" prop="usertel">
						<el-input v-model="loginForm.usertel" placeholder="请输入手机号"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="userpass">
						<el-input v-model="loginForm.userpass" placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-form-item style="margin-left:-80px;">
						<el-button type="primary" @click="onSubmit">立即登录</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('loginForm')">立即创建</el-button>
						<el-button @click="resetForm('loginForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="10" :offset="2">

			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="20" :offset="2">
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column prop="Id" label="Id" width="50"></el-table-column>
					<el-table-column prop="userName" label="用户名" width="120"></el-table-column>
					<el-table-column prop="userTel" label="用户手机号" width="180"></el-table-column>
					<el-table-column prop="userPass" label="用户密码" width="180"></el-table-column>
					<el-table-column prop="userCode" label="用户编号" width="180"></el-table-column>
					<el-table-column prop="userWx" label="用户微信号" width="180"></el-table-column>
				</el-table>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'formPage',
		data() {
			return {
				msg: 'Welcome to Your login',
				loginForm: {
					usertel: '12213456789',
					userpass: '132'
				},
				rules: {
					usertel: [{
							required: true,
							message: '请填写手机号',
							trigger: 'blur'
						},
						{
							min: 11,
							max: 11,
							message: '长度为11 个字符',
							trigger: 'change'
						}
					],
					userpass: [{
						required: true,
						message: '请填写活动形式',
						trigger: 'blur'
					}]
				},
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}]
			}
		},
		methods: {
			onSubmit() {
				this.$refs['loginForm'].validate((valid) => {
					if(valid) {
						var dataForm = this.loginForm;
						this.$axios.post(this.$localUrl + 'entry/login', dataForm, {
							transformRequest: [function(data) {
								return JSON.stringify(dataForm);
							}]
						}).then((response) => {
							this.getPage();
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
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						var dataForm = this.loginForm;
						this.$axios.post(this.$localUrl + 'entry/create', dataForm, {
							transformRequest: [function(data) {
								return JSON.stringify(dataForm);
							}]
						}).then((response) => {
							this.getPage();
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
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			getPage() {
				this.$axios.get(this.$localUrl + 'entry/page').then((response) => {
					this.tableData = response.data;
				}).catch((err) => {
					console.log(err);
				});
			}
		},
		mounted: function() {
			this.$axios.get(this.$localUrl + 'entry/page').then((response) => {
				this.tableData = response.data;
			}).catch((err) => {
				console.log(err);
			});
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