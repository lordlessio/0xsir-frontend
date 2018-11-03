<template>
  <transition name="sir-popup-fade"
    @after-enter="afterEnter"
    @after-leave="$emit('closed')">
    <div
      v-if="visible"
      ref="slide"
      class="TTFontBold sir-dialog-slide"
      :style="`height: 70%;`"
      @click.stop>
      <div v-if="rendered" class="d-flex flex-col container sir-slide-container">
        <p v-if="title" class="sir-popup-title">{{ title }}</p>
        <cube-scroll
          v-if="scroll"
          ref="scroll"
          :data="list"
          class="v-flex popup-scroll-list-wrap"
          :options="scrollOpts"
          @pulling-down="pullDown"
          @pulling-up="pullUp">
          <ul class="sir-popup-ul" :class="{ 'show': show }">
            <slot/>
          </ul>
        </cube-scroll>
        <slot v-if="!scroll"/>
        <div class="text-center sir-popup-bottom">
          <span class="i-block" @click.stop="$emit('close')">Close</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'sir-popup-tool',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: String,
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
  data: () => {
    return {
      show: false,
      rendered: false
    }
  },
  computed: {
    scrollOpts () {
      const { scrollbar, pullDownRefresh, pullUpLoad } = this
      console.log('pullUpLoad', pullUpLoad === true ? { txt: { noMore: 'No More Data' } } : pullUpLoad)
      return {
        scrollbar, pullDownRefresh, pullUpLoad: pullUpLoad === true ? { txt: { noMore: 'No More Data' } } : pullUpLoad
      }
    }
  },
  watch: {
    visible (val) {
      if (val) {
        if (!this.rendered) this.rendered = true
        this.$emit('open')
        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
      } else {
        this.show = false
        this.$emit('close')
      }
    }
  },
  methods: {
    pullDown () {
      this.$emit('refresh', () => {
        console.log('rendered', this.rendered)
        if (!this.rendered) return
        this.$refs.scroll.forceUpdate()
      })
    },
    pullUp () {
      this.$emit('loadmore', () => {
        console.log('rendered', this.rendered)
        if (!this.rendered) return
        this.$refs.scroll.forceUpdate()
      })
    },
    afterEnter () {
      this.show = true
      this.$emit('opened')
    },
    destroy () {
      console.log('-----------destroyed')
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.rendered = false
        if (this.$refs.scroll) this.$refs.scroll.forceUpdate()
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  },

  mounted () {
    if (this.visible) {
      this.rendered = true
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
        if (this.$refs.scroll) this.$refs.scroll.refresh()
      }
    }
  },

  destroyed () {
    this.destroy()
  }
}
</script>

<style lang="scss" scoped>

  .sir-popup-fade-enter-active, .sir-popup-fade-leave-active {
    // opacity: 1;
    transform: translateY(0);
    transition: all .25s ease;
  }
  .sir-popup-fade-enter, .sir-popup-fade-leave-to {
    // opacity: 0;
    transform: translateY(100%);
  }

  .sir-dialog-slide {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    color: #fff;
    background-color: #181818;
    z-index: 101;
    will-change: transform;
  }
  .sir-slide-container {
    position: relative;
    padding-top: 20px;
    // padding-bottom: 50px;
    width: 100%;
    height: 100%;
  }

  .sir-popup-title {
    margin-bottom: 20px;
    font-size: 16px;
  }
  .popup-scroll-list-wrap {
    margin: 0 -35px;
    padding: 0 35px;
  }

  /deep/ {
    .sir-popup-ul {
      >li {
        opacity: 0;
        transform: translateY(5px);
        transition: opacity .35s ease-in-out, transform .35s ease-in-out;
      }
      &.show {
        >li {
          opacity: 1;
          transform: translateY(0px);
        }
      }
    }
  }

  .sir-popup-bottom {
    padding-top: 6px;
    padding-bottom: 20px;
    // position: absolute;
    // bottom: 0;
    // left: 0;
    width: 100%;
    background-color: #151618;
    border-top: 1px solid #555;
    z-index: 1;
    >span {
      padding: 10px 0;
      width: 200px;
      font-size: 16px;
      color: #fff;
      background-color: #7D72F0;
      border-radius: 5px;
    }
  }

  // .dialog-ldb-close {
  //   position: fixed;
  //   left: 30px;
  //   top: 15px;
  //   color: #555;
  //   line-height: 1;
  //   z-index: 2009;
  //   cursor: pointer;
  // }
</style>
