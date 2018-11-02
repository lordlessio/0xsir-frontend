<template>
  <div
    ref="blockies"
    class="d-flex f-auto-center blockies"
    :style="`border-radius: ${radius}`">
  </div>
</template>

<script>
import Blockies from 'ethereum-blockies'
export default {
  name: 'sir-blockies',
  props: {
    autoInit: {
      type: Boolean,
      default: true
    },
    radius: {
      type: String,
      default: '20%'
    },
    seed: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 6
    },
    scale: {
      type: Number,
      default: 8
    },
    theme: {
      type: String,
      default: 'dark'
    }
  },
  data: () => {
    return {
      rendered: false,
      themes: {
        dark: {
          color: '#993399',
          bgcolor: '#ea4c88',
          spotcolor: '#fdadc7'
        },
        light: {
          color: '#fff',
          bgcolor: '#ea4c88',
          spotcolor: '#993399'
        }
      }
    }
  },
  watch: {
    seed (val) {
      if (val && this.rendered) this.reset()
    }
  },
  methods: {
    init () {
      const { color, bgcolor, spotcolor } = this.themes[this.theme]
      const { seed, size, scale } = this
      const icon = Blockies.create({
        seed,
        size,
        scale,
        color,
        bgcolor,
        spotcolor
      })
      this.$refs.blockies.appendChild(icon)
    },
    reset () {
      if (this.$refs.blockies.firstChild) this.$refs.blockies.removeChild(this.$refs.blockies.firstChild)
      this.init()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.rendered = true
      if (this.autoInit) this.init()
    })
  }
}
</script>

<style lang="scss" scoped>
  .blockies {
    // position: relative;
    width: inherit;
    height: inherit;
    opacity: .5;
    /deep/ canvas {
      border-radius: inherit;
    }
  }
</style>
