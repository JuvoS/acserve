<template>
  <div class="grid-panel">
    <div class="grid-wrapper">
	    <div class="grid-item" v-for="(item,index) in menu" :key="index" @click="menuLink(item.info,index)">
	    	<span v-bind:class="{ active: item.isActive }">{{ item.name }}</span>
	    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navBtnPage',
  data () {
    return {
      menu: []
    }
  },
  methods:{
  	getMenuInfo(){
    	this.$axios.get(this.$localUrl + 'bill/menu?code='+sessionStorage.userCode).then((response) => {
				this.menu = response.data.menu;
				this.menu[0].isActive = true;
			}).catch((err) => {
				console.log(err);
			});
    },
    menuLink(val,index){
			for(var i=0;i<this.menu.length;i++){
				this.menu[i].isActive = false;
			}
    	this.menu[index].isActive = true;
    	this.$emit('getBillList',val);
    }
  },
  mounted: function(){
  	this.getMenuInfo();
  }
}
</script>

<style scoped>
.grid-panel {
	width: 100%;
	margin: 0 auto;
	font-size: 12px;
	overflow: hidden;
	overflow-y: hidden;
}
.grid-wrapper {
	display: grid;
	grid-template-columns: 25% 25% 25% 25%;
}
.grid-item {
	background: #FFFFFF;
	margin: 1px;
	height: calc(2rem - 1px);
	line-height: 1.9rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
}
.active {
	color: #409EFF;
}
</style>
