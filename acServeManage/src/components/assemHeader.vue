<template>
  <div class="headerPage" v-show="headerFlag">
    <div class="header-panel">
    	<div class="header-logo">
    		<img src="../assets/logo.png">
    	</div>
    	<div class="header-content">
    		<div class="header-content-panel"></div>
    		<div class="header-user">
    			<img src="../../static/img/header.jpg" />
    		</div>
    	</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headerPage',
  data () {
    return {
      headerFlag: true
    }
  },
  methods: {
  	checkLoginPage: function(){
  		var pathTemp = this.$route.path.split('/');
			if(pathTemp[1] == 'login') return this.headerFlag = false;
			if(pathTemp[1] == 'reg') return this.headerFlag = false;
			
			return this.headerFlag = true;
  	}
  },
  mounted: function(){
  	this.checkLoginPage();
  }
}
</script>

<style scoped>
.headerPage {
	height: 60px;
	width: 100%;
	background: #FFFFFF;
	margin: 0;
	color: #333;
}
.header-panel {
	height: 60px;
	line-height: 60px;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	overflow: hidden;
	color: #333!important;
}
.header-logo {
	width: 240px;
	height: 60px;
	line-height: 60px;
	text-align: left;
	padding-left: 20px;
}
.header-logo img {
	height: 50px;
	width: 50px;
	margin: 5px;
	
}
.header-content {
	flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}
.header-user {
	width: 100px;
	height: 60px;
	line-height: 60px;
	text-align: right;
	padding-right: 20px;
}
.header-user img {
	height: 50px;
	width: 50px;
	margin: 5px;
	border-radius: 25px;
	
}
</style>
