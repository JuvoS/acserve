<template>
  <div class="login">
  	<div class="login-bg">
  		<img />
  		</div>
  	<div class="login-panel">
  		<el-row :gutter="20">
			  <el-col :span="8" :offset="8">
			    <el-card shadow="always">
			      <el-form :model="loginForm" :rules="rules" ref="loginForm">
		          <el-form-item prop="usertel">
		            <el-input v-model="loginForm.usertel" placeholder="请输入手机号"></el-input>
		          </el-form-item>
		          <el-form-item prop="userpass">
		            <el-input v-model="loginForm.userpass" placeholder="请输入密码"></el-input>
		          </el-form-item>
		          <el-form-item>
		              <el-button type="primary" @click="onSubmit">立即登录</el-button>
		          </el-form-item>
		          <el-form-item>
		              <el-button @click="registerNow">注册</el-button>
		          </el-form-item>
		        </el-form>
			    </el-card>
			  </el-col>
			</el-row>
  	</div>
  	
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to AC',
      loginForm: {
      	usertel: '01213456788',
      	userpass: '132'
      },
      rules: {
      	usertel: [{required: true,message: '请填写手机号',trigger: 'blur'},
      	{ min: 11, max: 11, message: '长度为11 个字符', trigger: 'change' }
      	],
      	userpass: [
	        { required: true, message: '请填写密码', trigger: 'blur' }
	      ]
      }
    }
  },
  methods: {
    onSubmit(){
      this.$refs['loginForm'].validate((valid) => {
				if(valid) {
					var dataForm = this.loginForm;
					console.log(dataForm);
					this.$axios.post(this.$localUrl + 'manage/login', dataForm, {
						transformRequest: [function(data) {return JSON.stringify(dataForm);}]
					}).then((response) => {
						var dataTemp = response.data;
						console.log(dataTemp);
						if(dataTemp.code == 200 && dataTemp.token){
							sessionStorage.userCode = response.data.userCode;
							sessionStorage.accessToken = response.data.token;
							sessionStorage.headerFlag = true;
							this.$router.push('/index');
							window.location.reload();
						}else{
							this.open(dataTemp.message);
						}
					}).catch((err) => {
						console.log(err);
					});
				} else {
					alert();
					return false;
				}
			});
    },
		checkToken() {
			this.$axios.get(this.$localUrl + 'manage/checkToken?token='+this.currentToken).then((response) => {
				var temp = response.data;
				if(temp.code == 200){
					this.tokenFlag = true;
				}
			}).catch((err) => {
				console.log(err);
			});
		},
		open(val) {
	    this.$message(val);
	  },
	  registerNow(){
	  	this.$router.push('/reg');
	  }
  },
  mounted: function(){
  	this.currentToken = sessionStorage.userToken;
		this.checkToken();
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
	}
	@media only screen and (min-width: 100px) and (max-width: 320px) {
		.login-panel {
			position: absolute;
			width: 90%;
			left: 5%;
			top: 8rem;
		}
	}
	@media only screen and (min-width:320px) and (max-width: 480px) {
		.login-panel {
			position: absolute;
			width: 90%;
			left: 5%;
			top: 10rem;
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
