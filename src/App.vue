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
  position: relative;
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: $--font-TTNormsMedium;
  background-color: #151618;
  @include overflow();
  // overflow: auto;
  margin-top: 60px;
}
</style>
