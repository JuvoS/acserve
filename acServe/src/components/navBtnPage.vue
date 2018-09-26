<template>
  <div class="navBtnPage">
    <div class="nav-box">
    	<i class="el-icon-menu"></i>
    	<i class="el-icon-setting"></i>
    	<i class="el-icon-time"></i>
    	<i class="el-icon-time"></i>
    	<i class="el-icon-close"></i>
    	<i class="el-icon-menu"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navBtnPage',
  data () {
    return {
      msg: 'Welcome to Your header'
    }
  }
}
</script>

<style scoped>
.navBtnPage {
	height: 2rem;
	line-height: 2rem;
	width: 100%;
	background: #FFFFFF;
	margin: 0;
}
.nav-box {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	padding-top: 0.5rem;
}
</style>
