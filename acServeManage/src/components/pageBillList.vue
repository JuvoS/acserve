<template>
	<div class="deviceBrandList" v-loading="loading">	
		<el-row class="nav-btn-panel" >
  			<div v-for="(navItem, index) in brandNavMenu">
  				<div class="nav-btn-item" @click="menuLink(navItem.link)">{{ navItem.name }}</div>
  			</div>
				
			</el-row>
		  <el-tabs :tab-position="tabPosition" v-model="activeTab" @tab-click="changeTab" style="min-height: 400px;background: #FFFFFF;padding: 10px;">
		    <el-tab-pane label="全部订单" prop="all" name="all">
		    	<el-container class="wrapper-content" v-loading="loading">
				  <el-table :data="tableWaitInfo" style="width: 100%;margin: 10px 0;" max-height="600">
				    <el-table-column prop="Id" label="ID" width="50"></el-table-column>
				    <el-table-column prop="describetion" label="订单需求" width="300"></el-table-column>
				    <el-table-column prop="address.info" label="订单位置" width="120"></el-table-column>
				    <el-table-column prop="personName" label="订单人" width="120"></el-table-column>
				    <el-table-column prop="address.tel" label="订单电话" width="120"></el-table-column>
				    <el-table-column prop="supplyInfo" label="其他留言" width="120"></el-table-column>
				    <el-table-column prop="type" label="状态" width="80"></el-table-column>
				    <el-table-column fixed="right" label="操作" width="120">
				      <template slot-scope="scope">
				        <el-button @click.native.prevent="showRow(scope.$index)"
				          type="text" size="small">查看</el-button>
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
		  
			<el-tab-pane label="待派订单" prop="wait" name="wait">
		    	<el-container class="wrapper-content" v-loading="loading">
				  <el-table :data="tableWaitInfo" style="width: 100%;margin: 10px 0;" max-height="600">
				    <el-table-column prop="Id" label="ID" width="50"></el-table-column>
				    <el-table-column prop="describetion" label="订单需求" width="300"></el-table-column>
				    <el-table-column prop="address.info" label="订单位置" width="120"></el-table-column>
				    <el-table-column prop="personName" label="订单人" width="120"></el-table-column>
				    <el-table-column prop="address.tel" label="订单电话" width="120"></el-table-column>
				    <el-table-column prop="supplyInfo" label="其他留言" width="120"></el-table-column>
				    <el-table-column prop="type" label="状态" width="80"></el-table-column>
				    <el-table-column fixed="right" label="操作" width="120">
				      <template slot-scope="scope">
				        <el-button @click.native.prevent="showRow(scope.$index)"
				          type="text" size="small">查看</el-button>
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
		    <el-tab-pane label="已派订单" prop="serve" name="serve">
		    	<el-container class="wrapper-content" v-loading="loading">
				  <el-table :data="tableWaitInfo" style="width: 100%;margin: 10px 0;" max-height="600">
				    <el-table-column prop="Id" label="ID" width="50"></el-table-column>
				    <el-table-column prop="describetion" label="订单需求" width="300"></el-table-column>
				    <el-table-column prop="address.info" label="订单位置" width="120"></el-table-column>
				    <el-table-column prop="personName" label="订单人" width="120"></el-table-column>
				    <el-table-column prop="address.tel" label="订单电话" width="120"></el-table-column>
				    <el-table-column prop="supplyInfo" label="其他留言" width="120"></el-table-column>
				    <el-table-column prop="type" label="状态" width="80"></el-table-column>
				    <el-table-column fixed="right" label="操作" width="120">
				      <template slot-scope="scope">
				        <el-button @click.native.prevent="showRow(scope.$index)"
				          type="text" size="small">查看</el-button>
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
		    <el-tab-pane label="待评价订单" prop="eval" name="eval">
		    	<el-container class="wrapper-content" v-loading="loading">
				  <el-table :data="tableWaitInfo" style="width: 100%;margin: 10px 0;" max-height="600">
				    <el-table-column prop="Id" label="ID" width="50"></el-table-column>
				    <el-table-column prop="describetion" label="订单需求" width="300"></el-table-column>
				    <el-table-column prop="address.info" label="订单位置" width="120"></el-table-column>
				    <el-table-column prop="personName" label="订单人" width="120"></el-table-column>
				    <el-table-column prop="address.tel" label="订单电话" width="120"></el-table-column>
				    <el-table-column prop="supplyInfo" label="其他留言" width="120"></el-table-column>
				    <el-table-column prop="type" label="状态" width="80"></el-table-column>
				    <el-table-column fixed="right" label="操作" width="120">
				      <template slot-scope="scope">
				        <el-button @click.native.prevent="showRow(scope.$index)"
				          type="text" size="small">查看</el-button>
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
		    <el-tab-pane label="异常订单" prop="abno" name="abno">
		    	<el-container class="wrapper-content" v-loading="loading">
				  <el-table :data="tableWaitInfo" style="width: 100%;margin: 10px 0;" max-height="600">
				    <el-table-column prop="Id" label="ID" width="50"></el-table-column>
				    <el-table-column prop="describetion" label="订单需求" width="300"></el-table-column>
				    <el-table-column prop="address.info" label="订单位置" width="120"></el-table-column>
				    <el-table-column prop="personName" label="订单人" width="120"></el-table-column>
				    <el-table-column prop="address.tel" label="订单电话" width="120"></el-table-column>
				    <el-table-column prop="supplyInfo" label="其他留言" width="120"></el-table-column>
				    <el-table-column prop="type" label="状态" width="80"></el-table-column>
				    <el-table-column fixed="right" label="操作" width="120">
				      <template slot-scope="scope">
				        <el-button @click.native.prevent="showRow(scope.$index)"
				          type="text" size="small">查看</el-button>
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
		    <el-tab-pane label="已取消" prop="cancel" name="cancel">
		    	<el-container class="wrapper-content" v-loading="loading">
				  <el-table :data="tableWaitInfo" style="width: 100%;margin: 10px 0;" max-height="600">
				    <el-table-column prop="Id" label="ID" width="50"></el-table-column>
				    <el-table-column prop="describetion" label="订单需求" width="300"></el-table-column>
				    <el-table-column prop="address.info" label="订单位置" width="120"></el-table-column>
				    <el-table-column prop="personName" label="订单人" width="120"></el-table-column>
				    <el-table-column prop="address.tel" label="订单电话" width="120"></el-table-column>
				    <el-table-column prop="supplyInfo" label="其他留言" width="120"></el-table-column>
				    <el-table-column prop="type" label="状态" width="80"></el-table-column>
				    <el-table-column fixed="right" label="操作" width="120">
				      <template slot-scope="scope">
				        <el-button @click.native.prevent="showRow(scope.$index)"
				          type="text" size="small">查看</el-button>
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
		    <el-tab-pane label="拒接订单" prop="cancel" name="refuse">
		    	<el-container class="wrapper-content" v-loading="loading">
				  <el-table :data="tableWaitInfo" style="width: 100%;margin: 10px 0;" max-height="600">
				    <el-table-column prop="Id" label="ID" width="50"></el-table-column>
				    <el-table-column prop="describetion" label="订单需求" width="300"></el-table-column>
				    <el-table-column prop="address.info" label="订单位置" width="120"></el-table-column>
				    <el-table-column prop="personName" label="订单人" width="120"></el-table-column>
				    <el-table-column prop="address.tel" label="订单电话" width="120"></el-table-column>
				    <el-table-column prop="supplyInfo" label="其他留言" width="120"></el-table-column>
				    <el-table-column prop="type" label="状态" width="80"></el-table-column>
				    <el-table-column fixed="right" label="操作" width="120">
				      <template slot-scope="scope">
				        <el-button @click.native.prevent="showRow(scope.$index)"
				          type="text" size="small">查看</el-button>
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
		  	<el-form :model="brandForm">
				   <el-form-item label="订单需求" :label-width="formLabelWidth">
				   	<el-input v-model="brandForm.describetion" autocomplete="off"></el-input>
				   </el-form-item>
				   <el-form-item label="订单地址" :label-width="formLabelWidth">
				   	<el-input v-model="addressInfo.tel" autocomplete="off" disabled="disabled" read-only></el-input>
				   </el-form-item>
				   <el-form-item label="订单电话" :label-width="formLabelWidth">
				   	<el-input v-model="addressInfo.tel" autocomplete="off" disabled="disabled" read-only></el-input>
				   </el-form-item>
				   <el-form-item label="其他留言" :label-width="formLabelWidth">
				   	<el-input v-model="brandForm.supplyInfo" autocomplete="off"></el-input>
				   </el-form-item>
				   <el-form-item label="状态" :label-width="formLabelWidth">
				   	<el-select v-model="brandForm.typeNum" placeholder="请选择状态">
				      <el-option label="待接单" value="200"></el-option>
				      <el-option label="已接单" value="201"></el-option>
				      <el-option label="待评价" value="203"></el-option>
				      <el-option label="已评价" value="204"></el-option>
				      <el-option label="异常订单" value="100"></el-option>
				      <el-option label="已取消" value="101"></el-option>
				      <el-option label="拒接" value="1200"></el-option>
				    </el-select>
				   </el-form-item>
				  </el-form>
	
				    <el-button @click="resetForm()">取 消</el-button>
				    <el-button type="primary" @click="editForm()">确 定</el-button>
		  </el-dialog>
		  <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
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
				tableWaitInfo: [],
				addressInfo:[],
				dialogFormVisible: false,
				centerDialogVisible: false,
				loading: false,
				brandForm: {},
		        formLabelWidth: '80px',
		        delInfo: '',
		        brandNavMenu: [{
			      	name: '添加品牌',
			      	link: '/device/brand/'
			      },{
			      	name: '添加类型',
			      	link: '/device/brand/'
			      },{
			      	name: '添加型号',
			      	link: '/device/brand/'
			      },{
			      	name: '添加服务期',
			      	link: '/device/brand/'
			      }],
			    billStatus: 'all',
			    activeTab: 'all'
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
		    showRow(index) {
		        return this.$router.push('/bill/list/info/'+this.tableWaitInfo[index].demandCode);
		    },
		    doDelete() {
		        this.loading = true;
				this.brandForm.serveCode = sessionStorage.userCode;
				var dataForm = this.brandForm;
				this.$axios.post(this.$localUrl + 'billServe/del', dataForm, {
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
				this.$axios.get(this.$localUrl + 'billServe/list/'+this.billStatus+'/'+this.currentPage+'/'+this.pageSizeNum).then((response) => {
					var temp = response.data.data;
					this.currentPage = parseInt(response.data.currentPage);
					this.pageSizeNum = parseInt(response.data.pageSizeNum);
					this.totalNum = parseInt(response.data.count);
					this.tableWaitInfo = response.data.data;
				}).catch((err) => {
					console.log(err);
				});
			},
			editNow: function(val){
				this.brandForm = this.tableWaitInfo[val];
				this.addressInfo = this.brandForm.address;
				console.log(this.brandForm.typeNum);
				this.dialogFormVisible = true;
			},
			editForm: function(){
				this.loading = true;
				this.brandForm.serveCode = sessionStorage.userCode;
				var dataForm = this.brandForm;
				delete dataForm.address;
				delete dataForm.img;
				delete dataForm.showImg;
				delete dataForm.type;
				dataForm.demandFlag = dataForm.typeNum;
				delete dataForm.typeNum;
				
				console.log(dataForm.demandFlag);
				this.$axios.post(this.$localUrl + 'billServe/edit', dataForm, {
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
				this.$axios.post(this.$localUrl + 'billServe/create', dataForm, {
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
			changeTab: function(tab, event) {
		        this.billStatus = event.target.getAttribute('id').slice(4);
		        this.getBrandList();
	      	}
		},
		mounted: function() {
			this.getBrandList();
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
	width: 100%;
}
.nav-btn-item {
	height: 20px;
	line-height: 20px;
	width: 80px;
	margin: 10px;
	border: 1px solid #409eff;
	border-radius: 20px;
	color: #409eff;
}
.brandNav {
	width: 100%;
}
.el-table th>.cell{
	text-align: center;
}
</style>