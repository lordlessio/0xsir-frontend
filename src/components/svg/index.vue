<template>
  <div style="width: 0;height: 0;overflow: hidden;visibility: hidden;">
    <icon/>
    <logo/>
  </div>
</template>

<script>
import Icon from './Icon'
import Logo from './Logo'
export default {
  name: 'sir-svg',
  components: {
    Icon,
    Logo
  },
  mounted () {
    document.body.appendChild(this.$el)
  }
}
</script>
