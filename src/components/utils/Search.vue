<template>
  <div ref="sir-search" class="sir-search" :class="{ 'active': visible }">
    <transition name="sir-tx-fade" @after-enter="show = true" @enter="showSearch = true">
      <div v-if="visible" class="sir-utils-box">
        <div class="d-flex flex-col full-height">
          <div class="v-flex d-flex flex-col overflow container sir-search-cnt">
            <sir-search
              :visible="showSearch"
              inside
              @search="$emit('search', $event)"/>
            <!-- <cube-textarea
              v-model="address"
              indicator="indicator"
              :maxlength="42"
              placeholder="please input address here..."></cube-textarea> -->
            <!-- <input class="sir-search-input"
              ref="searchInput"
              v-model="address"
              type="text"
              placeholder="search for your address"
              maxlength="42"/>
            <p class="TTFontMedium sir-search-address" @click.stop="focus">{{ address }}</p> -->
            <!-- <button class="TTFontBold sir-search-btn" type="button" @click.stop="$emit('search', address)">Search</button> -->
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
import SirSearch from '@/components/Search'
export default {
  name: 'sir-utils-search',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      address: '',
      show: false,
      showSearch: false
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
        this.showSearch = false
      }
    }
  },
  components: {
    SirSearch
  }
}
</script>

<style lang="scss" scoped>
  .sir-tx-fade-enter-active, .sir-tx-fade-leave-active {
    opacity: 1;
    transition: all .3s ease-in-out;
  }
  .sir-tx-fade-enter, .sir-tx-fade-leave-to {
    opacity: 0;
    // transition-delay: 0s;
    // transition: opacity .15s cubic-bezier(0.4, 0, 0.2, 1), width 0s .15s, height 0s .15s;
  }

  .sir-search {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background-color: #151618;
    z-index: -1;
    transition: opacity .3s ease, width 0s .3s, height 0s .3s, z-index 0s .3s;
    &.active {
      // position: fixed;
      z-index: 9;
      @include viewport-unit('width', 100vw);
      @include viewport-unit('height', 100vh);
      transition: all .3s ease 0s;
    }
    /deep/ {
      .cube-textarea-wrapper {
        &::after {
          display: none;
        }
      }
      .cube-textarea_expanded {
        height: initial;
        min-height: 40px;
        // line-height: 40px;
      }
    }
  }

  .sir-search-input {
    padding: 5px 10px;
    border: 1px solid #555;
    font-size: 16px;
    line-height: 1.4;
    border-radius: 3px;
    // text-indent: 10px;
    &::placeholder {
      color: #aaa;
    }
  }
  .sir-search-address {
    padding: 5px 10px;
    border: 1px solid #555;
    font-size: 16px;
    color: #2D0EBD;
    background-color: #BDB9FD;
  }
  .sir-search-btn {
    margin-top: 15px;
    padding: 10px 0;
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
  // .container {
  //   height: 100%;
  // }
  .sir-search-cnt {
    padding-bottom: 50px;
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
