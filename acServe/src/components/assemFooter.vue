<template>
  <div class="footerPage">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'footerPage',
  data () {
    return {
      msg: 'Copy Right @2018'
    }
  }
}
</script>

<style scoped>
.footerPage {
	font-size: 10px;
	color: #aaa;
	margin: 1rem auto;
}
</style>
