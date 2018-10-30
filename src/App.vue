<template>
  <div id="app" @touchmove.stop>
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
  // height: 100%;
  // overflow: auto;
  // -webkit-overflow-scrolling: touch;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
