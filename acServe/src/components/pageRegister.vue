<template>
  <div class="login">
  	<div class="login-bg">
  		<img />
  		</div>
  	<div class="login-panel" v-loading="loading">
  		<el-card shadow="always">
	  		<el-row :gutter="20">
				  <el-col :span="20" :offset="2">
				      <el-form :model="regForm" :rules="rules" ref="regForm">
			          <el-form-item prop="usertel">
			            <el-input v-model="regForm.usertel" placeholder="请输入手机号"></el-input>
			          </el-form-item>
			          <el-form-item prop="userpass">
			            <el-input v-model="regForm.userpass" placeholder="请输入密码" type="password"></el-input>
			          </el-form-item>
			          <el-form-item prop="repass">
			            <el-input v-model="regForm.repass" placeholder="重复密码" type="password"></el-input>
			          </el-form-item>
			          <el-form-item>
			              <el-button @click="registerNow" round type="primary">立即注册</el-button>
			          </el-form-item>
			       </el-form>
				  </el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="20" :offset="2">
						<el-button @click="backLogin" round style="border: 0;">返回登录</el-button>
					</el-col>
				</el-row>
			</el-card>
  	</div>
  	
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to AC',
      regForm: {
      	usertel: '01213456789',
      	userpass: '132',
      	repass: ''
      },
      rules: {
      	usertel: [{required: true,message: '请填写手机号',trigger: 'blur'},
      	{ min: 11, max: 11, message: '长度为11 个字符', trigger: 'change' }
      	],
      	userpass: [
	        { required: true, message: '请填写密码', trigger: 'blur' }
	      ]
      },
      loading: false
    }
  },
  methods: {
    registerNow(){
//    this.$refs['loginForm'].validate((valid) => {
//				if(valid) {
//					var dataForm = this.loginForm;
//					this.$axios.post(this.$localUrl + 'entry/login', dataForm, {
//						transformRequest: [function(data) {return JSON.stringify(dataForm);}]
//					}).then((response) => {
//						var dataTemp = response.data;
//						console.log(dataTemp);
//						if(dataTemp.code == 200 && dataTemp.token){
//							sessionStorage.accessToken = response.data.token;
//							this.$router.push('/index');
//						}else{
//							this.open(dataTemp.message);
//						}
//					}).catch((err) => {
//						console.log(err);
//					});
//				} else {
//					alert();
//					return false;
//				}
//			});
			if(this.checkForm()){
				this.loading = true;
				
				var dataForm = this.regForm;
				this.$axios.post(this.$localUrl + 'entry/create', dataForm, {
					transformRequest: [function(data) {return JSON.stringify(dataForm);}]
				}).then((response) => {
					console.log(response.data);
					if(response.data.code == 200){
						this.$message({message: response.data.message,type: 'success'});
						this.$router.push('/index');
					}else{
						this.loading = false;
						this.openMessage(response.data.message);
					}
					
				}).catch((err) => {
					console.log(err);
				});
			}
    },
    checkForm(){
    	if(this.isStrEmpty(this.regForm.usertel)) {
    		this.openMessage('请填写手机号');
    		return false;
    	}
    	if(this.isStrEmpty(this.regForm.userpass)) {
    		this.openMessage('请填写密码');
    		return false;
    	}
    	if(this.isStrEmpty(this.regForm.repass)) {
    		this.openMessage('请重复密码');
    		return false;
    	}
    	if(this.regForm.repass != this.regForm.userpass) {
    		this.openMessage('两次密码不一致');
    		return false;
    	}
    	
    	return true;
    },
		openMessage(val) {
	    this.$message(val);
	  },
	  backLogin(){
	  	this.$router.push('/login');
	  }
  },
  mounted: function(){
//	this.currentToken = sessionStorage.userToken;
//		this.checkToken();
  }
  
}
</script>

<style scoped>
	.login{
		background: linear-gradient(to bottom right, blue, white);
	}
	.login-bg {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		background:url(../../static/img/404.gif);  
filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";  
-moz-background-size:100% 100%;  
    background-size:100% 100%;  
background-attachment: fixed;
overflow: hidden;
	}
	.login-panel {
		z-index: 10;
		min-height: 10rem;
	}
	@media only screen and (min-width: 100px) and (max-width: 320px) {
		.login-panel {
			position: absolute;
			width: 90%;
			left: 5%;
			top: 20%;
		}
	}
	@media only screen and (min-width:320px) and (max-width: 480px) {
		.login-panel {
			position: absolute;
			width: 90%;
			left: 5%;
			top: 20%;
		}
	}
	@media only screen and (min-width: 480px) {
		.login-panel {
			position: absolute;
			width: 90%;
			left: 5%;
			top: 15rem;
		}
	}

</style>
