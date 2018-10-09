<template>
	<div class="formPage">
		<div class="form-colmun-text" >
			<div>
				<el-button type="primary" @click="upLoadClick()" round class="form-get-btn">选择图片</el-button>
				<form v-show="imgFormFlag">
				    <input id="upload-input" type="file" value="选择文件" @change="getFile($event)">
				    <button id="upload-btn" @click="submitForm($event)">提交</button>
				</form>
			</div>
			<div class="bill-form-img">
				<div class="form-img-item" v-for="item in imglist">
					<img v-bind:src="item.url"/>
					<span @click="delImg(item.imgcode)"><i class="el-icon-close"></i></span>
				</div>
			</div>							
		</div>

	</div>
</template>

<script>
	export default {
		name: 'formPage',
		data() {
	      return {
	        	bgmaskFlag: false,
	        	adrPanelFlag: false,
	        	imgFormFlag: false,
	        	photoNum: 0,
	        	photoMaxNum: 5,
	        	photoCode: '',
	        	imglist: []
	    	}
		},
		methods: {
	      	warningMessage(val){
	      		this.$message({message: val,type: 'warning'});
	      	},
	      	upLoadClick() {
	      		this.$emit('photoByNow', this.photoCode);
	      		if(this.photoNum<this.photoMaxNum) return document.getElementById("upload-input").click();
	      		
	      		return this.warningMessage('只能上传5张图片');
			},
			getImgList() {
				this.$axios.get(this.$localUrl + 'bill/photoList?code='+this.photoCode+'&user='+sessionStorage.userCode).then((response) => {
					var temp = response.data;
					if(temp.code===200){
						var list = temp.data;
					    for(var item in list){
					      list[item].url = this.$localUrl+list[item].url;
					    }
					    this.imglist = list;
					}
				}).catch((err) => {
					console.log(err);
				});
			},
			getFile(event) {
				this.file = event.target.files[0];
				document.getElementById("upload-btn").click();
			},
			submitForm(event) {
				event.preventDefault();
				let formData = new FormData();
				formData.append('userCode', sessionStorage.userCode);
				formData.append('photoCode', this.photoCode);
				formData.append('file', this.file); 
				let config = {headers: {'Content-Type': 'multipart/form-data'}};
				 
				this.$axios.post(this.$localUrl+'upload/mul', formData, config).then((response) => {
//					console.log(response);
					if(response.data.status == 200){
						this.photoNum++;
						this.getImgList();
					}else{
						this.$message(response.data.message,'warning');
					}
					
				}).catch((err) => {
			        console.log(err);
			    });
			},
			delImg(cancelCode){
				this.$confirm('此操作将删除该图片, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	this.$axios.get(this.$localUrl + 'bill/photoDel?code='+this.photoCode+'&img='+cancelCode).then((response) => {
					var temp = response.data;
					if(temp.code===200){
						this.getImgList();
						this.photoNum--;
						this.$message(temp.message);
					}
				}).catch((err) => {
					console.log(err);
				});
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
			},
			getPhotoCode(){
				let formData = new FormData();
				formData.append('userCode', sessionStorage.userCode);
				this.$axios.post(this.$localUrl+'bill/photocode', formData,
				{headers: {'Content-Type': 'multipart/form-data'}}).then((res) => {
					this.photoCode = res.data.photoCode;
					this.$emit('photoByNow', this.photoCode);
				}).catch((err) => {
			        console.log(err);
			    });
			}
		},
		mounted: function(){
			this.getPhotoCode();
		}
	}
</script>
<style scoped="">
.bill-form-img {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	margin-top: 0.5rem;
}
.form-get-btn {
	font-size: 10px;
	padding: 5px 10px;
}
.bill-form-img img{
	height: 4rem;
	width: 4rem;
}
.el-message {
	min-width: 80%!important;
}
.form-img-item {
	position: relative;
}
.form-img-item span{
	position: absolute;
	background: #FF0000;
	border: 1px solid #ff0000;
	border-radius:10px;
	height: 12px;
	line-height: 12px;
	width: 12px;
	top: 0;
	right: 0;
}
.form-img-item span i{
	color: #FFFFFF;
	font-size: 10px;
}
</style>