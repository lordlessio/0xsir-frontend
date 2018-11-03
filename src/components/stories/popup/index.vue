<template>
  <div>
    <sir-mask-tool
      ref="sirMask"
      :visible="visible"
      @close="closeModel"/>
    <sir-popup-tool
      ref="sirPopup"
      v-bind="$props"
      @open="openModel"
      @close="closeModel"
      @opened="$emit('opened')"
      @closed="$emit('closed')"
      @refresh="$emit('refresh', $event)"
      @loadmore="$emit('loadmore', $event)">
      <slot/>
    </sir-popup-tool>
  </div>
</template>

<script>
import SirPopupTool from './tool/Popup'

import { addClass, removeClass } from 'utils'
export default {
  name: 'sir-popup',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: String,
    height: {
      type: String,
      default: '80%'
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    scroll: {
      type: Boolean,
      default: true
    },
    scrollbar: {
      type: Boolean,
      default: true
    },
    pullDownRefresh: {
      type: null,
      default: true
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  // data: (vm) => {
  //   return {
  //     popupModel: vm.visible
  //   }
  // },
  watch: {
    visible (val) {
      removeClass('overflow-hidden', document.body)
    }
  },
  components: {
    SirPopupTool
  },
  methods: {
    openModel () {
      this.$emit('open')
      addClass('overflow-hidden', document.body)
    },
    closeModel () {
      this.$emit('close')
      this.$emit('update:visible', false)
      removeClass('overflow-hidden', document.body)
    }
  },
  beforeDestroy () {
    console.log('beforeDestroy')
    removeClass('overflow-hidden', document.body)
    // this.$refs.sirPopup.destroy()
  }
}
</script>

<style lang="scss" scoped>

</style>
