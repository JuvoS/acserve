<template>
  <div class="login">
    <h1>{{ msg }}</h1>
    <el-row :gutter="20">
      <el-col :span="20" :offset="2">
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
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your login',
      loginForm: {
      	usertel: '01213456789',
      	userpass: '132'
      },
      rules: {
      	usertel: [{required: true,message: '请填写手机号',trigger: 'blur'},
      	{ min: 11, max: 11, message: '长度为11 个字符', trigger: 'change' }
      	],
      	userpass: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
      }
    }
  },
  methods: {
    onSubmit(){
      console.log('post now');
      this.$axios.get(this.$localUrl+'entry/page').then((response) => {
        console.log(response);
      }).catch((err) => {
        console.log(err);
      });
    },
    submitForm(formName) {
	    this.$refs[formName].validate((valid) => {
	      if (valid) {
	      	var daww = this.loginForm;
	      	this.$axios.post(this.$localUrl+'entry/create', daww, {
	      		transformRequest: [
	      			function(data){
	      				
	      				return JSON.stringify(daww);
	      			}
	      		]
	      	}).then((response) => {
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
	  getPage(){
      this.$axios.get(this.$localUrl+'entry/page').then((response) => {
        console.log(response);
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  mounted: function(){
  	this.$axios.get(this.$localUrl+'entry/page').then((response) => {
	    console.log(response.data);
	  }).catch((err) => {
	    console.log(err);
	  });
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
