<template>
  <div>
    <sir-mask-tool
      :visible="visible"
      @close="closeModel"/>
    <sir-popup-tool
      :visible="visible"
      :list="list"
      :title="title"
      :scrollbar="scrollbar"
      :pullDownRefresh="pullDownRefresh"
      :pullUpLoad="pullUpLoad"
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
import SirMaskTool from './tool/Mask'
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
      type: Number,
      default: 450
    },
    appendToBody: {
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
    SirMaskTool,
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
  destroyed () {
    removeClass('overflow-hidden', document.body)
  }
}
</script>

<style lang="scss" scoped>

</style>
