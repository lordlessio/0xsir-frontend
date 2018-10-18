<template>
  <div ref="sir-search" class="sir-search" :class="{ 'active': visible }">
    <transition name="sir-tx-fade" @after-enter="show = true">
      <div v-if="visible" class="sir-utils-box">
        <div class="d-flex flex-col container">
          <div class="v-flex d-flex flex-col">
            <input class="sir-search-input" v-model="address" type="text" placeholder="search for your address"/>
            <button class="sir-search-btn" type="button" @click.stop="$emit('search', address)">Search</button>
          </div>
          <div class="text-center sir-search-bottom" :class="{ 'show': show }">
            <span class="i-block" @click.stop="$emit('update:visible', false)">Close</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { addClass, removeClass } from 'utils'
export default {
  name: 'sir-search',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      address: '',
      show: false
    }
  },
  watch: {
    visible (val) {
      const dom = this.$refs['sir-search']
      if (val) {
        const rect = dom.getBoundingClientRect()
        dom.style.transform = `translate(${rect.left * -1}px, ${rect.top * -1}px)`

        addClass('overflow-hidden', document.body)
      } else {
        dom.style.transform = ''

        removeClass('overflow-hidden', document.body)
        this.show = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .sir-tx-fade-enter-active, .sir-tx-fade-leave-active {
    opacity: 1;
    transition: all .15s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .sir-tx-fade-enter, .sir-tx-fade-leave-to {
    opacity: 0;
  }

  .sir-search {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background-color: #151618;
    transition: all .3s;
    z-index: -1;
    &.active {
      // position: fixed;
      z-index: 9;
      @include viewport-unit('width', 100vw);
      @include viewport-unit('height', 100vh);
    }
  }

  .sir-search-input {
    border: 1px solid #555;
    font-size: 16px;
    line-height: 32px;
    border-radius: 5px;
    text-indent: 10px;
    &::placeholder {
      color: #aaa;
    }
  }
  .sir-search-btn {
    padding: 15px 0;
    width: 100px;
    font-size: 16px;
    color: #fff;
    background-color: #7D72F0;
    border-radius: 5px;
    border: none;
  }

  .sir-utils-box {
    width: 100%;
    height: 100%;
    padding-top: 30px;
    // padding-bottom: 30px;
    box-sizing: border-box;
    background-color: #151618;
    h2 {
      margin-bottom: 20px;
      font-size: 20px;
    }
  }
  .container {
    height: 100%;
  }
  .sir-search-bottom {
    padding-top: 6px;
    padding-bottom: 20px;
    width: 100%;
    background-color: #151618;
    border-top: 1px solid #555;
    opacity: 0;
    z-index: 1;
    transform: translateY(100%);
    transition: all .3s ease-in-out;
    >span {
      padding: 10px 0;
      width: 200px;
      font-size: 16px;
      color: #fff;
      background-color: #7D72F0;
      border-radius: 5px;
    }
    &.show {
      opacity: 1;
      transform: translateY(0);
    }
  }

</style>
