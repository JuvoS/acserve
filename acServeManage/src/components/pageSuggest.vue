<template>
	<div class="deviceBrandList" v-loading="loading">	
		  <el-tabs :tab-position="tabPosition" style="min-height: 400px;background: #FFFFFF;padding: 10px;">
		    <el-tab-pane label="建议管理">
		    	<el-container class="wrapper-content" v-loading="loading">
			  <el-table :data="tableInfo" style="width: 100%;margin: 10px 0;" max-height="600">
			    <el-table-column prop="Id" label="ID" width="60"></el-table-column>
			    <el-table-column prop="flag" label="状态" width="80"></el-table-column>
			    <el-table-column prop="content" label="建议内容" width="360"></el-table-column>
			    <el-table-column prop="userName" label="称呼" width="120"></el-table-column>
			    <el-table-column prop="userTel" label="电话" width="120"></el-table-column>
			    <el-table-column fixed="right" label="操作" width="120">
			      <template slot-scope="scope">
			        <el-button @click.native.prevent="deleteRow(scope.$index)"
			          type="text" size="small">移除</el-button>
			        <el-button type="text" @click="editNow(scope.$index)">处理</el-button>
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
		  <el-dialog title="编辑建议" :visible.sync="dialogFormVisible">
		  	<el-form :model="suggestForm">
			  	<el-form-item label="建议内容" :label-width="formLabelWidth">
			      <el-input v-model="suggestForm.content" type="textarea"></el-input>
			    </el-form-item>
			    <el-form-item label="用户名" :label-width="formLabelWidth">
			      <el-input v-model="suggestForm.userName"></el-input>
			    </el-form-item>
			    <el-form-item label="电话" :label-width="formLabelWidth">
			      <el-input v-model="suggestForm.userTel"></el-input>
			    </el-form-item>
			    <el-form-item label="状态" :label-width="formLabelWidth">
			      	<el-select v-model="suggestForm.flag" placeholder="请选择状态">
				      <el-option label="待处理" value="1"></el-option>
				      <el-option label="已处理" value="2"></el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item label="留言" :label-width="formLabelWidth">
			      	<el-input v-model="suggestForm.message" type="textarea"></el-input>
			    </el-form-item>
			</el-form>
	
				    <el-button @click="resetForm()">取 消</el-button>
				    <el-button type="primary" @click="editForm()">确 定</el-button>
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
		name: 'deviceBrandList',
		data() {
			return {
				msg: 'deviceBrandList',
				tabPosition: 'top',
		        currentPage: 1,
		        pageSizesNum: [10, 20, 40],
		        pageSizeNum: 10,
		        totalNum: 10,
				tableInfo: [],
				dialogFormVisible: false,
				centerDialogVisible: false,
				loading: false,
				suggestForm: {},
		        formLabelWidth: '80px',
		        delInfo: ''
			}
		},
		methods: {
			handleSizeChange(val) {
		        this.pageSizeNum = val;
		        this.getBrandList();
		    },
		    handleCurrentChange(val) {
		    	this.currentPage = val;
		    	this.getBrandList();
		    },
		    deleteRow(index) {
		    	this.centerDialogVisible = true;
		        this.suggestForm = this.tableInfo[index];
		        this.delInfo = this.tableInfo[index].name;
		    },
		    doDelete() {
		        this.loading = true;
				this.suggestForm.serveCode = sessionStorage.userCode;
				var dataForm = this.suggestForm;
				this.$axios.post(this.$localUrl + 'device/del/brand', dataForm, {
					transformRequest: [function(data) {return JSON.stringify(dataForm);}]
				}).then((response) => {
					this.resetForm();
					this.$message({message: response.data.message,type: 'success'});
					this.getBrandList();
					this.loading = false;
					this.centerDialogVisible = false;
				}).catch((err) => {
					console.log(err);
				});
		    },
		    getBrandList: function() {
				this.$axios.get(this.$localUrl + 'suggest/page/'+this.currentPage+'/'+this.pageSizeNum).then((response) => {
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
				this.suggestForm = this.tableInfo[val];
				this.dialogFormVisible = true;
			},
			editForm: function(){
				this.loading = true;
				this.suggestForm.serveCode = sessionStorage.userCode;
				var dataForm = this.suggestForm;
				this.$axios.post(this.$localUrl + 'suggest/edit', dataForm, {
					transformRequest: [function(data) {return JSON.stringify(dataForm);}]
				}).then((response) => {
					this.resetForm();
					this.$message({message: response.data.message,type: 'success'});
					this.getBrandList();
					this.loading = false;
				}).catch((err) => {
					console.log(err);
				});
			},
			resetForm: function(){
				this.dialogFormVisible = false;
				this.centerDialogVisible = false;
				this.suggestForm = {};
			},
			submitForm: function(){
				this.loading = true;
				this.suggestForm.serveCode = sessionStorage.userCode;
				var dataForm = this.suggestForm;
				this.$axios.post(this.$localUrl + 'suggest/create', dataForm, {
					transformRequest: [function(data) {return JSON.stringify(dataForm);}]
				}).then((response) => {
					this.resetForm();
					this.$message({message: response.data.message,type: 'success'});
					this.getBrandList();
					this.loading = false;
				}).catch((err) => {
					console.log(err);
				});
			}
		},
		mounted: function() {
			var pathTemp = this.$route.path.split('/');
			this.getBrandList();
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
</style>