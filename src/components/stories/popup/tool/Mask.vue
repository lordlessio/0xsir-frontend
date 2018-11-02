<template>
  <transition name="sir-hide-fade">
    <div
      v-if="visible"
      class="sir-ldb-dialog"
      :style="`z-index: ${zIndex};`"
      @click.stop="closeModel"
      @touchmove.prevent>
    </div>
  </transition>
</template>

<script>
import { addClass, removeClass } from 'utils'
export default {
  name: 'sir-mask-tool',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    single: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 100
    }
  },
  watch: {
    visible (val) {
      if (val) {
        document.body.appendChild(this.$el)
        if (this.single) {
          addClass('overflow-hidden', document.body)
        }
      } else {
        if (this.single) {
          removeClass('overflow-hidden', document.body)
        }
      }
    }
  },
  methods: {
    closeModel () {
      if (this.single) {
        this.$emit('update:visible', false)
      }
      this.$emit('close')
    },
    destroy () {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  },
  destroyed () {
    this.destroy()
  }
}
</script>

<style lang="scss" scoped>
  .sir-ldb-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
  }
</style>
