<template>
	<div class="formPage">
		<div>
			父传子-A：
			<input type="text" v-model="name">
			<zchild :inputName="name" v-on:childByValue="childByValue"></zchild>
			
		</div>
		<div>
			子传父-A:<span>{{name}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'formPage',
		data() {
	      return {
	        	name: ''
	    	}
      },
      methods: {
	      childByValue: function (childValue) {
	        // childValue就是子组件传过来的值
	        this.name = childValue
	      }
      },
      mounted: function(){
      	
      }
	}
</script>
<style scoped="">

</style>