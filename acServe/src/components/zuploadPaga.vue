<template>
	<div class="zups">
		<form>
		    <input type="text" value="" v-model="name" placeholder="请输入用户名">
		    <input type="text" value="" v-model="age" placeholder="请输入年龄">
		    <input type="file" @change="getFile($event)">
		    <button @click="submitForm($event)">提交</button>
		</form>
	</div>
</template>

<script>
export default {
    data() {
      return {
        name: '',
	      age: '',
	      file: ''
      };
    },
    methods: {
      getFile(event) {
        this.file = event.target.files[0];
        console.log(this.file);
      },
      submitForm(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('name', this.name);
        formData.append('age', this.age);
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

</style>