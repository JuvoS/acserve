<template>
  <div id="app">
    <router-view class="app-panel"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
  	checkTokenState: function(){
  		if(this.$route.path != '/login' && (this.$route.path!= '/reg')){
  			console.log(sessionStorage.accessToken);
  			if(this.isStrEmpty(sessionStorage.accessToken)) return this.$router.push('/login');
	  		this.$axios.get(this.$localUrl + 'entry/checkToken?token='+sessionStorage.accessToken).then((response) => {
					var temp = response.data;
					if(temp.code != 200){
						return this.$router.push('/login');
					}
				}).catch((err) => {
					console.log(err);
				});
			}
  	}
  },
  mounted: function(){
	this.checkTokenState();
  }
}
</script>

<style>
.el-message{
	min-width: 80%!important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  margin: 0;
  padding: 0;
}
html,body {
	margin: 0;
	padding: 0;
	background: #f7f7f7;
}
.el-header {
	position: fixed;
	top: 0;
	height: 3rem;
	width: 100%;
	z-index: 8;
}
.app-panel {
	margin-top: 3rem;
}
</style>
