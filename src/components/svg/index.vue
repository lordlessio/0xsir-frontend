<template>
  <div style="width: 0;height: 0;overflow: hidden;visibility: hidden;">
    <icon/>
    <logo/>
    <gradient/>
  </div>
</template>

<script>
import Icon from './Icon'
import Logo from './Logo'
import Gradient from './Gradient'
export default {
  name: 'sir-svg',
  components: {
    Icon,
    Logo,
    Gradient
  },
  mounted () {
    document.body.appendChild(this.$el)
  }
}
</script>
