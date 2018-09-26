<template>
	<div class="formPage">
			<div class="form-colmun-text" >
					<div>
			<button @click="upLoadClick()">选择图片</button>
			<form v-show="imgFormFlag">
			    <input id="upload-input" type="file" value="选择文件" @change="getFile($event)">
			    <button id="upload-btn" @click="submitForm($event)">提交</button>
			</form>
			<div class="upload-img-panel">
				<div class="upload-img-item" v-for="item in imglist">
					<img v-bind:src="item.url">
				</div>
			</div>
		</div>
			<div class="bill-form-img">
				<img src="../../static/img/header.jpg" />
				<img src="../../static/img/header.jpg" />
				<img src="../../static/img/header.jpg" />
				<img src="../../static/img/header.jpg" />
				<img src="../../static/img/header.jpg" />
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
	        	imgNum: 6,
	        	photoCode: '',
	        	imglist: [
		        {url: ''}
		        ]
	    	}
		},
		methods: {
	      	onSubBill(){
	      	 	console.log(this.billForm);
	      	},
	      	warningImgNum(){
	      		this.$message({
		          message: '警告哦，这是一条警告消息',
		          type: 'warning'
		        });
	      	},
	      	upLoadClick() {
				document.getElementById("upload-input").click();
			},
			getFile(event) {
				this.file = event.target.files[0];
				console.log(this.file);
				document.getElementById("upload-btn").click();
			},
			submitForm(event) {
				event.preventDefault();
				let formData = new FormData();
				formData.append('file', this.file);
				 
				let config = {
				    headers: {
				    'Content-Type': 'multipart/form-data'
				    }
				}
				 
				this.$axios.post(this.$localUrl+'upload/mul', formData, config).then(function (res) {
				console.log(res);
				if (res.status === 2000) {
				    /*这里做处理*/
//				   this.$emit('photoByNow', photoCode);
				    }
				})
			}
		},
		mounted: function(){
		      	
		}
	}
</script>
<style scoped="">
.bill-form-img {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.bill-form-img img{
	height: 4rem;
	width: 4rem;
}
.el-message {
	min-width: 80%!important;
}

</style>