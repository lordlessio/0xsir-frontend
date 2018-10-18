<template>
  <div id="app">
    <sir-svg/>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: $--font-TTNormsMedium;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
