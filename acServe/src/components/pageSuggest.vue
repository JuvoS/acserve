<template>
  <div>
  	<el-header>
	  	<ass-Header class="header-panel"></ass-Header>
	  </el-header>
		<div class="suggest-list-panel" v-loading="loading">
				<ul class="suggest-list">
					<li class="list-item">
						<div class="item-add" @click="addsuggest()">
							<i class="el-icon-plus"></i>
							添加建议
						</div>
					</li>
					<li class="list-item"  v-for="item in suggestList">
						<div class="suggest-list-titless">
							<div class="suggest-list-name">{{ item.userName }}</div>
							<div class="suggest-list-tel">{{ item.userTel }}</div>
						</div>
						<div class="suggest-list-title-d">
							<div v-bind:class="item.isActive">{{ item.flag }}</div>
							<div class="suggest-list-btn" @click="deleteSuggest(item.Id)">取消</div>
						</div>
						<div class="suggest-list-content">
							{{ item.content }}
						</div>
					</li>
				</ul>
		</div>
		<div class="bgmask" v-show="bgmaskFlag"></div>
		<el-row class="suggest-form-panel" v-show="addPanelFlag">
			<el-col class="suggest-form-list">
				<div class="suggest-form-list-title"><div class="title-box">投诉建议</div><div class="title-icon" @click="closeAdd()"><i class="el-icon-close"></i></div></div>
				<hr style="margin: 10px 0;background-color:#eee;height:1px;border:none;">
				<el-form ref="suggestForm" :model="suggestForm" label-width="80px">
					<el-form-item label="姓名"><el-input v-model="suggestForm.userName"></el-input></el-form-item>
					<el-form-item label="手机号"><el-input v-model="suggestForm.userTel"></el-input></el-form-item>
					<el-form-item label="建议内容"><el-input v-model="suggestForm.content" type="textarea"></el-input></el-form-item>
					<input style="display: none;" v-model="suggestForm.userCode" />
					<el-form-item style="margin-left: -80px;">
						<el-button type="primary" @click="onSubmitsuggest()">提交</el-button>
    				<el-button @click="closeAdd()">取消</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
  </div>
</template>

<script>
export default {
  name: 'suggest-list',
  data () {
    return {
      msg: 'Welcome to AC',
	    userCode: '',
      suggestList: [{}],
      suggestForm: {
	      userName: '',
	      userTel: '',
	      content: '',
	      userCode: this.userCode
	    },
	    changesuggestCode: '',
	    bgmaskFlag: false,
	    addPanelFlag: false,
	    nosuggests: true,
	    loading: false
    }
  },
  methods: {
  	getsuggestList(){
  		this.$axios.get(this.$localUrl + 'suggest/list?code='+this.userCode).then((response) => {
				this.suggestList = response.data;
				console.log(this.suggestList);
				
				if(response.data !==null && response.data.length !==0){
					this.nosuggests = false;
				}
			}).catch((err) => {
				console.log(err);
			});
  	},
  	addsuggest(){
  		this.bgmaskFlag = true;
  		this.addPanelFlag = true;
  	},
	  closeAdd(){
	  	this.bgmaskFlag = false;
  		this.addPanelFlag = false;
	  },
	  onSubmitsuggest(){
	    this.$refs['suggestForm'].validate((valid) => {
				if(valid) {
					var dataForm = this.suggestForm;
					if(this.suggestForm.userCode){
						this.$axios.post(this.$localUrl + 'suggest/create', dataForm, {
							transformRequest: [function(data) {return JSON.stringify(dataForm);}]
						}).then((response) => {
							this.getsuggestList();
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
	  deleteSuggest: function(Id){
	  	console.log(Id);
	  	this.loading = true;
				var dataForm = {
					"Id": Id,
					"serveCode": sessionStorage.userCode
				};
				this.$axios.post(this.$localUrl + 'suggest/del', dataForm, {
					transformRequest: [function(data) {return JSON.stringify(dataForm);}]
				}).then((response) => {
					this.$message({message: response.data.message,type: 'success'});
					this.getsuggestList();
					this.loading = false;
				}).catch((err) => {
					console.log(err);
				});
	  }
  },
  mounted: function(){	
  	this.userCode = sessionStorage.userCode;
  	this.suggestForm.userCode = this.userCode;
  	this.getsuggestList();
  }
  
}
</script>

<style scoped>
.el-header {
	padding: 0;
}
	.suggest-list-panel {
		width: 100%;
		min-height: 100%;
		padding-top: 0.1rem;
	}
	.suggest-list-panel ul{
		list-style: none;
		margin: 0;
		padding-left: 0;
		font-size: 12px;
	}
.list-item {
	width: 96%;
	overflow: hidden;
	background: #FFFFFF;
	border-radius: 5px;
	margin: 10px auto;
	padding: 10px 0;
}
.list-item-row {
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
	line-height: 40px;
	font-size: 12px;
	display: flex;
	flex-direction: column;
}
.item-add .el-icon-plus{
	font-size: 40px;
	margin-top: 20px;
}
.suggest-list{
	z-index: 1;
}
.suggest-list-titless {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 0 10px;
	font-size: 14px;
	line-height: 16px;
	height: 16px;
}
.suggest-list-title-d {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 5px 10px;
	height: 16px;
	line-height: 16px;
}
.suggest-list-type {
	font-size: 8px;
	color: #FF9800;
}
.dealNoActive {
	color: #FF9800;
}
.dealActive {
	color: #42B983;
}
.suggest-list-btn{
	font-size: 8px;
	color: #409EFF;
}
.suggest-list-content {
	padding: 10px;
	padding-top: 0;
	min-height: 2rem;
	text-align: left;
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
.suggest-form-panel {
	width: 100%;
	position: fixed;
	top: 25%;
	z-index: 11;
}
.suggest-form-list {
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
.suggest-form-list-title {
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
