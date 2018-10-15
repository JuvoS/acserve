<template>
  <div class="index">

  	<div class="grid-panel">
  		<div class="grid-wrapper">
			  <div class="grid-item" v-for="item in menu" @click="menuLink(item.info)">
  				<div style="line-height: 1rem;">
  					<div>{{ item.name }}</div>
  					<div style="font-size: 8px;">{{ item.nameEn }}</div>
  				</div>
			  </div>
			</div>
			<div class="suggest-wrapper">
			  <div class="suggest-item" @click="menuLink('/serve/wait')">
  				<div style="line-height: 1rem;">
  					<div>需要完成</div>
  					<div style="font-size: 8px;">need Finish</div>
  				</div>
			  </div>
			</div>
  	</div>
  	
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      menu: [{
      	name: '已完成订单',
      	info: 'serve/finish',
      	nameEn: 'order finish'
      },{
      	name: '订单进度',
      	info: 'bill/list/all',
      	nameEn: 'order progress'
      }]
    }
  },
  methods: {
    menuLink(val){
    	this.$router.push(val);
    }
  },
  mounted: function(){

  }
  
}
</script>
<style scoped>
.grid-panel {
	min-height: 10rem;
	width: 100%;
	margin: 0 auto;
	font-size: 12px;
	overflow: hidden;
	overflow-y: hidden;
}
.grid-wrapper {
	/*height: 10rem;*/
	display: grid;
	grid-template-columns: 50% 50%;
  /*grid-template-rows: 6rem 6rem;*/
}
.grid-item {
	background: #FFFFFF;
	margin: 1px;
	height: calc(5rem - 1px);
	line-height: 4.9rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
}
.suggest-item {
	background: #FFFFFF;
	margin: 1px;
	height: calc(5rem - 1px);
	line-height: 4.9rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
}
</style>
