<template>
	<div class="upload-panel">
		<!--<form>
		    <input type="text" value="" v-model="name" placeholder="请输入用户名">
		    <input type="text" value="" v-model="age" placeholder="请输入年龄">
		    <input type="file" @change="getFile($event)">
		    <button @click="submitForm($event)">提交</button>
		</form>-->
		<div>
			<button @click="upLoadClick()">选择文件</button>
			<form>
			    <input style="display: none;" id="upload-input" type="file" value="选择文件" @change="getFile($event)">
			    <button style="display: none;" id="upload-btn" @click="submitForm($event)">提交</button>
			</form>
			<div class="upload-img-panel">
				<div class="upload-img-item" v-for="item in imglist">
					<img v-bind:src="item.url">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    data() {
      return {
        file: '',
        imglist: [
        {url: ''}
        ],
      };
    },
    methods: {
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
		        }
        	})
      	}
    },
    mounted: function(){
//  	this.uploadUrl = this.$localUrl+'upload/mul';
    }
  }
</script>

<style scoped>
.upload-img-item {
	width: 120px;
	height: 120px;
	margin-right: 10px;
	overflow: hidden;
	border: 1px solid #ccc;
	border-radius: 5px;
}
</style>