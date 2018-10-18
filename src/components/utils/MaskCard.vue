<template>
  <div ref="sir-mask-card" class="sir-mask-card" :class="{ 'active': visible }">
    <transition name="sir-tx-fade" @after-enter="show = true">
      <div v-if="visible" class="sir-utils-box" :class="{ 'show': show }" @click.stop="$emit('update:visible', false)">
        <div class="d-flex flex-col container">
          <!-- <slot name="title"></slot> -->
          <!-- <h2 class="text-center">Recent transactions</h2> -->
          <!-- <cube-scroll
            ref="scroll"
            :data="list"
            class="v-flex horizontal-scroll-list-wrap"
            :options="scrollOpts"
            @pulling-down="pullDown"
            @pulling-up="pullUp">
            <ul class="NFTs-assets-ul" :class="{ 'show': show }">
              <slot/>
            </ul>
          </cube-scroll> -->
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { addClass, removeClass } from 'utils'
export default {
  name: 'sir-mask-card',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    },
    scrollEvents: {
      type: Array,
      default: () => []
    }
  },
  data: () => {
    return {
      show: false,
      scrollOpts: {
        scrollbar: true,
        pullDownRefresh: {
          threshold: 50,
          stop: 35,
          txt: 'Refresh Success'
        },
        pullUpLoad: {
          txt: {
            noMore: 'No More Data'
          }
        }
      }
    }
  },
  watch: {
    visible (val) {
      const dom = this.$refs['sir-mask-card']
      if (val) {
        const rect = dom.getBoundingClientRect()
        console.log('rect', rect)
        dom.style.transform = `translate(${rect.left * -1}px, ${rect.top * -1}px)`

        addClass('overflow-hidden', document.body)
      } else {
        dom.style.transform = ''

        removeClass('overflow-hidden', document.body)
        this.show = false
      }
    }
  },
  methods: {
    // scrollEndListen () {
    //   console.log('scrollEndListen')
    // },
    pullDown () {
      console.log('pullDown')
      this.$emit('refresh', () => {
        this.$refs.scroll.forceUpdate()
      })
    },
    pullUp () {
      console.log('pullUp')
      this.$emit('loadmore', () => {
        this.$refs.scroll.forceUpdate()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .sir-tx-fade-enter-active, .sir-tx-fade-leave-active {
    opacity: 1;
    transition: opacity .3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .sir-tx-fade-enter, .sir-tx-fade-leave-to {
    opacity: 0;
  }

  .sir-mask-card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #151618;
    transition: all .3s;
    z-index: -1;
    &.active {
      // position: fixed;
      z-index: 9;
      @include viewport-unit('width', 100vw);
      @include viewport-unit('height', 100vh);
    }
  }

  .sir-utils-box {
    width: 100%;
    height: 100%;
    padding-top: 30px;
    padding-bottom: 30px;
    box-sizing: border-box;
    h2 {
      margin-bottom: 20px;
      font-size: 20px;
    }
  }
  .container {
    height: 100%;
  }

  /deep/ {
    .NFTs-assets-ul {
      >li {
        opacity: 0;
        transform: translateY(5px);
        transition: all .15s ease-in-out;
      }
      &.show {
        >li {
          opacity: 1;
          transform: translateY(0px);
        }
      }
    }
  }

</style>
