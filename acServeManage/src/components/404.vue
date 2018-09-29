<template>
  <div class="lost">
  	<img src="../../static/img/404.gif" />
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'lost',
  data () {
    return {
      msg: '404'
    }
  }
}
</script>

<style scoped>

</style>
