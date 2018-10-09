<template>
	<div class="deviceBrandList" v-loading="loading">	
		  <el-tabs :tab-position="tabPosition" style="min-height: 400px;background: #FFFFFF;padding: 10px;">
		    <el-tab-pane label="类型管理">
		    	<el-container class="wrapper-content" v-loading="loading">
			  <el-table :data="tableInfo" style="width: 100%;margin: 10px 0;" max-height="600">
			    <el-table-column prop="Id" label="ID" width="120"></el-table-column>
			    <el-table-column prop="name" label="类型名" width="120"></el-table-column>
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
		    <el-tab-pane label="添加类型">
		    	<el-form :model="brandForm">
				  	<el-form-item label="类型名" :label-width="formLabelWidth">
				      <el-input v-model="brandForm.name" autocomplete="off"></el-input>
				   </el-form-item>
				  </el-form>
	
				    <el-button @click="resetForm()">取 消</el-button>
				    <el-button type="primary" @click="submitForm()">确 定</el-button>

		    </el-tab-pane>
		  </el-tabs>
		  <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
		  	<el-form :model="brandForm">
				  	<el-form-item label="类型名" :label-width="formLabelWidth">
				      <el-input v-model="brandForm.name" autocomplete="off"></el-input>
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
				brandForm: {},
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
		        this.brandForm = this.tableInfo[index];
		        this.delInfo = this.tableInfo[index].name;
		    },
		    doDelete() {
		        this.loading = true;
				this.brandForm.serveCode = sessionStorage.userCode;
				var dataForm = this.brandForm;
				this.$axios.post(this.$localUrl + 'device/del/mold', dataForm, {
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
				this.$axios.get(this.$localUrl + 'device/list/mold/'+this.currentPage+'/'+this.pageSizeNum).then((response) => {
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
				this.brandForm = this.tableInfo[val];
				this.dialogFormVisible = true;
			},
			editForm: function(){
				this.loading = true;
				this.brandForm.serveCode = sessionStorage.userCode;
				var dataForm = this.brandForm;
				this.$axios.post(this.$localUrl + 'device/edit/mold', dataForm, {
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
				this.brandForm = {};
			},
			submitForm: function(){
				this.loading = true;
				this.brandForm.serveCode = sessionStorage.userCode;
				var dataForm = this.brandForm;
				this.$axios.post(this.$localUrl + 'device/create/mold', dataForm, {
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