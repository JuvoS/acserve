<template>
	<div class="deviceBrandList">	
		  <el-tabs :tab-position="tabPosition" style="min-height: 400px;background: #FFFFFF;padding: 10px;">
		    <el-tab-pane label="型号管理">
		    	<el-container class="wrapper-content" v-loading="loading">
			  <el-table :data="tableInfo" style="width: 100%;margin: 10px 0;" max-height="600">
			    <el-table-column prop="Id" label="型号ID" width="120"></el-table-column>
			    <el-table-column prop="name" label="型号" width="180"></el-table-column>
			    <el-table-column prop="moldname" label="类型" width="180"></el-table-column>
			    <el-table-column prop="brandname" label="品牌" width="120"></el-table-column>
			    <el-table-column prop="timename" label="服务期" width="120"></el-table-column>
			    <el-table-column fixed="right" label="操作" width="120">
			      <template slot-scope="scope">
			        <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)"
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
		    <el-tab-pane label="添加型号">
		    	<el-form :model="modelForm">
				    <el-form-item label="品牌" :label-width="formLabelWidth">
					    <el-select v-model="modelForm.brandname" placeholder="请选择品牌">
					    	<div v-for="branditem in brandArr">
					      <el-option :label="branditem.name" :value="branditem.name"></el-option>
					      </div>
					    </el-select>
				    </el-form-item>
				    <el-form-item label="类型" :label-width="formLabelWidth">
					    <el-select v-model="modelForm.moldname" placeholder="请选择类型">
					    	<div v-for="branditem in moldArr">
					      <el-option :label="branditem.name" :value="branditem.name"></el-option>
					      </div>
					    </el-select>
				    </el-form-item>
				    <el-form-item label="服务期" :label-width="formLabelWidth">
					    <el-select v-model="modelForm.timename" placeholder="请选择服务期">
					    	<div v-for="branditem in timeArr">
					      <el-option :label="branditem.name" :value="branditem.name"></el-option>
					      </div>
					    </el-select>
				    </el-form-item>
				    <el-form-item label="型号" :label-width="formLabelWidth">
				      <el-input v-model="modelForm.name" autocomplete="off"></el-input>
				    </el-form-item>
				    
				  </el-form>
	
				    <el-button @click="resetForm()">取 消</el-button>
				    <el-button type="primary" @click="submitForm()">确 定</el-button>

		    </el-tab-pane>
		  </el-tabs>
		  
		  <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
		  		<el-form :model="modelForm">
				    <el-form-item label="品牌" :label-width="formLabelWidth">
					    <el-select v-model="modelForm.brandname" placeholder="请选择品牌">
					    	<div v-for="branditem in brandArr">
					      <el-option :label="branditem.name" :value="branditem.name"></el-option>
					      </div>
					    </el-select>
				    </el-form-item>
				    <el-form-item label="类型" :label-width="formLabelWidth">
					    <el-select v-model="modelForm.moldname" placeholder="请选择类型">
					    	<div v-for="branditem in moldArr">
					      <el-option :label="branditem.name" :value="branditem.name"></el-option>
					      </div>
					    </el-select>
				    </el-form-item>
				    <el-form-item label="服务期" :label-width="formLabelWidth">
					    <el-select v-model="modelForm.timename" placeholder="请选择服务期">
					    	<div v-for="branditem in timeArr">
					      <el-option :label="branditem.name" :value="branditem.name"></el-option>
					      </div>
					    </el-select>
				    </el-form-item>
				    <el-form-item label="型号" :label-width="formLabelWidth">
				      <el-input v-model="modelForm.name" autocomplete="off"></el-input>
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
				tabPosition: 'left',
		        currentPage: 1,
		        pageSizesNum: [10, 20, 40],
		        pageSizeNum: 10,
		        totalNum: 10,
				tableInfo: [],
				dialogFormVisible: false,
				centerDialogVisible: false,
				loading: false,
				modelForm: {},
		        formLabelWidth: '80px',
		        brandArr: {},
		        moldArr: {},
		        timeArr:{},
		        delInfo: ''
			}
		},
		methods: {
			init: function(){
				this.getModelList();
				this.brandArrGet();
				this.moldArrGet();
				this.timeArrGet();
			},
			brandArrGet: function(){
				this.$axios.get(this.$localUrl + 'device/alllist/brand').then((response) => {
					this.brandArr = response.data;
				}).catch((err) => {
					console.log(err);
				});
			},
			moldArrGet: function(){
				this.$axios.get(this.$localUrl + 'device/alllist/mold').then((response) => {
					this.moldArr = response.data;
				}).catch((err) => {
					console.log(err);
				});
			},
			timeArrGet: function(){
				this.$axios.get(this.$localUrl + 'device/alllist/time').then((response) => {
					this.timeArr = response.data;
				}).catch((err) => {
					console.log(err);
				});
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
		        this.modelForm = this.tableInfo[index];
		        this.delInfo = this.tableInfo[index].name;
		    },
		    doDelete() {
		        this.loading = true;
				this.modelForm.serveCode = sessionStorage.userCode;
				var dataForm = this.modelForm;
				this.$axios.post(this.$localUrl + 'device/del/model', dataForm, {
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
				this.$axios.get(this.$localUrl + 'device/list/model/'+this.currentPage+'/'+this.pageSizeNum).then((response) => {
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
				this.modelForm = this.tableInfo[val];
				this.dialogFormVisible = true;
			},
			editForm: function(){
				this.loading = true;
				this.modelForm.serveCode = sessionStorage.userCode;
				var dataForm = this.modelForm;
				console.log(this.modelForm);
				this.$axios.post(this.$localUrl + 'device/edit/model', dataForm, {
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
				this.modelForm = {};
			},
			submitForm: function(){
				this.loading = true;
				this.modelForm.serveCode = sessionStorage.userCode;
				var dataForm = this.modelForm;
				this.$axios.post(this.$localUrl + 'device/create/model', dataForm, {
					transformRequest: [function(data) {return JSON.stringify(dataForm);}]
				}).then((response) => {
					this.resetForm();
					this.getModelList();
					this.loading = false;
				}).catch((err) => {
					console.log(err);
				});
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