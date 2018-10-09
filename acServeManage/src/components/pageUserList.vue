<template>
	<div class="userList">	
		  <el-tabs :tab-position="tabPosition" style="min-height: 400px;background: #FFFFFF;padding: 10px;">
		    <el-tab-pane label="用户管理">
		    	<el-container class="wrapper-content" v-loading="loading">
			  <el-table :data="tableInfo" style="width: 100%;margin: 10px 0;" max-height="600">
				<el-table-column prop="Id" label="用户ID" width="120"></el-table-column>
			    <el-table-column prop="userName" label="用户名" width="180"></el-table-column>
			    <el-table-column prop="userTel" label="用户手机号" width="180"></el-table-column>
			    <el-table-column prop="userCode" label="用户Code" width="120"></el-table-column>
			    <el-table-column prop="userFlag" label="用户状态" width="60"></el-table-column>
			    <el-table-column prop="userTypeCode" label="用户类型" width="60"></el-table-column>
			    <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
			    <el-table-column prop="updateTime" label="更新时间" width="180"></el-table-column>
			    <el-table-column fixed="right" label="操作" width="120">
			      <template slot-scope="scope">
			        <el-button @click.native.prevent="deleteRow(scope.$index)"
			          type="text" size="small">移除</el-button>
			        <el-button type="text" @click="editNow(scope.$index)">编辑</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
	 
		      <el-footer class="main-panel-footer" height="100px">
		      	<el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="currentPage"
			      :page-sizes="pageSizesNum"
			      :page-size="pageSizeNum"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="totalNum">
			    </el-pagination>
		      	<ass-Footer></ass-Footer>
		      </el-footer>
		      
		      
			</el-container>
		    </el-tab-pane>
		  </el-tabs>
		  
		  <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
		  		<el-form ref="userInfoForm" :model="userInfoForm" :rules="rules">
				    <el-form-item label="用户名" prop="userName">
				      <el-input v-model="userInfoForm.userName" autocomplete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="手机号" prop="userTel">
				      <el-input v-model="userInfoForm.userTel" v-model.number="userInfoForm.userTel" autocomplete="off" @change="telChange()"></el-input>
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
				    	<el-button @click="resetForm()">取 消</el-button>
				    	<el-button type="primary" @click="editForm()">确 定</el-button>
				    </el-form-item>
				    
				  </el-form>
	    
		  </el-dialog>
		  <el-dialog
  title="提示"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <span>确认删除<div v-model="delInfo"></div></span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="resetForm()">取 消</el-button>
    <el-button type="primary" @click="doDelete()">确 定</el-button>
  </span>
</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'userList',
		data() {
			return {
				msg: 'userList',
				tabPosition: 'top',
		        currentPage: 1,
		        pageSizesNum: [10, 20, 40],
		        pageSizeNum: 10,
		        totalNum: 10,
				tableInfo: [],
				dialogFormVisible: false,
				centerDialogVisible: false,
				loading: false,
		        formLabelWidth: '80px',
		        delInfo: '',
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
				telFlag: true
			}
		},
		methods: {
			init: function(){
				this.getModelList();
			},
			handleSizeChange(val) {
		        this.pageSizeNum = val;
		        this.getModelList();
		    },
		    handleCurrentChange(val) {
		    	this.currentPage = val;
		    	this.getModelList();
		    },
		    deleteRow(index) {
		    	this.centerDialogVisible = true;
		        this.userInfoForm = this.tableInfo[index];
		        this.delInfo = this.tableInfo[index].name;
		    },
		    doDelete() {
		        this.loading = true;
				this.userInfoForm.serveCode = sessionStorage.userCode;
				var dataForm = this.userInfoForm;
				delete dataForm.token;
				delete dataForm.wxToken;
				this.$axios.post(this.$localUrl + 'manage/del', dataForm, {
					transformRequest: [function(data) {return JSON.stringify(dataForm);}]
				}).then((response) => {
					this.resetForm();
					this.$message({message: response.data.message,type: 'success'});
					this.getModelList();
					this.loading = false;
					this.centerDialogVisible = false;
				}).catch((err) => {
					console.log(err);
				});
		    },
		    getModelList: function() {
				this.$axios.get(this.$localUrl + 'manage/page/'+this.currentPage+'/'+this.pageSizeNum).then((response) => {
					var temp = response.data.data;
					this.currentPage = parseInt(response.data.currentPage);
					this.pageSizeNum = parseInt(response.data.pageSizeNum);
					this.totalNum = parseInt(response.data.count);
					this.tableInfo = response.data.data;
				}).catch((err) => {
					console.log(err);
				});
			},
			editNow: function(val){
				this.userInfoForm = this.tableInfo[val];
				this.dialogFormVisible = true;
			},
			editForm: function(){
				this.loading = true;
				this.userInfoForm.serveCode = sessionStorage.userCode;
				var dataForm = this.userInfoForm;
				delete dataForm.token;
				delete dataForm.wxToken;
				this.$axios.post(this.$localUrl + 'manage/edit', dataForm, {
					transformRequest: [function(data) {return JSON.stringify(dataForm);}]
				}).then((response) => {
					this.resetForm();
					this.$message({message: response.data.message,type: 'success'});
					this.getModelList();
					this.loading = false;
				}).catch((err) => {
					console.log(err);
				});
			},
			resetForm: function(){
				this.dialogFormVisible = false;
				this.centerDialogVisible = false;
				this.userInfoForm = {};
			},
			linkPop: function(val){
				this.$router.push(val);
			}
		},
		mounted: function() {
			var pathTemp = this.$route.path.split('/');
			this.init();
		}
	}
</script>
<style scoped="">
	.brandNav {
		width: 100%;
	}
.el-table th>.cell{
	text-align: center;
}
.el-select {
	width: 100%;
}
</style>