<template>
	<el-container class="wrapper-content" v-loading="loading">
		<el-row class="nav-btn-panel">
			<div class="nav-btn-item">新增用户</div>
			<div class="nav-btn-item">新增用户</div>
			<div class="nav-btn-item">新增用户</div>
		</el-row>
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
			        <el-button
			          @click.native.prevent="deleteRow(scope.$index, tableData4)"
			          type="text"
			          size="small">
			          移除
			        </el-button>
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
	      
	      <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
			  <el-form :model="userInfoForm">
			  	<el-form-item label="用户名" :label-width="formLabelWidth">
			      <el-input v-model="userInfoForm.userName" autocomplete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="手机号" :label-width="formLabelWidth">
			      <el-input v-model="userInfoForm.userTel" autocomplete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="用户密码" :label-width="formLabelWidth">
			      <el-input v-model="userInfoForm.userPass" autocomplete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="用户状态" :label-width="formLabelWidth">
			      <el-input v-model="userInfoForm.userFlag" autocomplete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="账号类型" :label-width="formLabelWidth">
			      <el-input v-model="userInfoForm.userTypeCode" autocomplete="off"></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="resetForm()">取 消</el-button>
			    <el-button type="primary" @click="submitForm()">确 定</el-button>
			  </div>
			</el-dialog>
	</el-container>
</template>

<script>
	export default {
		name: 'userList',
		data() {
			return {
				msg: 'userList',
		        currentPage: 1,
		        pageSizesNum: [10, 20, 40],
		        pageSizeNum: 10,
		        totalNum: 10,
				tableInfo: [],
				dialogFormVisible: false,
				loading: false,
				userInfoForm: {},
		        formLabelWidth: '80px'
			}
		},
		methods: {
			handleSizeChange(val) {
		        this.pageSizeNum = val;
		        this.getBillList();
		    },
		    handleCurrentChange(val) {
		    	this.currentPage = val;
		    	this.getBillList();
		    },
		     deleteRow(index, rows) {
		        rows.splice(index, 1);
		    },
		    getBillList: function() {
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
			resetForm: function(){
				this.dialogFormVisible = false;
				this.userInfoForm = {};
			},
			submitForm: function(){
				this.loading = true;
				this.userInfoForm.serveCode = sessionStorage.userCode;
				delete this.userInfoForm.token;
				delete this.userInfoForm.wxToken;
				var dataForm = this.userInfoForm;
				this.$axios.post(this.$localUrl + 'manage/edit', dataForm, {
					transformRequest: [function(data) {return JSON.stringify(dataForm);}]
				}).then((response) => {
					this.resetForm();
					this.getBillList();
					this.loading = false;
				}).catch((err) => {
					console.log(err);
				});
			}
		},
		mounted: function() {
			var pathTemp = this.$route.path.split('/');
			this.getBillList();
		}
	}
</script>
<style scoped="">
.nav-btn-panel {
	background: #FFFFFF;
	font-size: 12px;
	height: 40px;
	line-height: 40px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
}
.nav-btn-item {
	height: 20px;
	line-height: 20px;
	width: 80px;
	margin: 10px;
	border: 1px solid #00B7FF;
	border-radius: 20px;
	color: #00B7FF;
}
</style>