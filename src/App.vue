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
  height: 100%;
  @include overflow();
  // overflow: auto;
  &::before {
    content: '';
    font-family: Impact;
  }
}
</style>
