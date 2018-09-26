<template>
  <div class="headerPage">
    <p>{{ msg }}</p>
    <router-link to="/">index</router-link>
    <router-link to="/login">login</router-link>
    <router-link to="/form">form</router-link>
    <router-link to="/zlogin">login</router-link>
    <router-link to="/ztoken">token</router-link>
  </div>
</template>

<script>
export default {
  name: 'headerPage',
  data () {
    return {
      msg: 'Welcome to Your header'
    }
  }
}
</script>

<style scoped>

</style>
