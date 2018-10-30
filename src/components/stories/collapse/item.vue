<template>
  <div class="sir-collapse-item TTFontBold" :class="{ 'is-active': isActive }">
    <div
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`sir-collapse-content-${id}`"
      :aria-describedby ="`sir-collapse-content-${id}`">
      <div
        class="sir-collapse-item__header"
        @click="handleHeaderClick"
        role="button"
        :id="`sir-collapse-head-${id}`"
        tabindex="0"
        @keyup.space.enter.stop="handleEnterClick"
        :class="{
          'focusing': focusing,
          'is-active': isActive
        }"
        @focus="handleFocus"
        @blur="focusing = false">
        <slot name="title">{{title}}</slot>
      </div>
    </div>
    <sir-collapse-transition>
      <div
        class="sir-collapse-item__wrap"
        v-show="isActive"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`sir-collapse-head-${id}`"
        :id="`sir-collapse-content-${id}`">
        <div class="sir-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </sir-collapse-transition>
  </div>
</template>
<script>
import SirCollapseTransition from 'utils/collapse-transition'
import Emitter from '@/mixins/emitter'
import { generateId } from 'utils'

export default {
  name: 'SirCollapseItem',

  componentName: 'SirCollapseItem',

  mixins: [Emitter],

  inject: ['collapse'],

  components: { SirCollapseTransition },

  data () {
    return {
      contentWrapStyle: {
        height: 'auto',
        display: 'block'
      },
      contentHeight: 0,
      focusing: false,
      isClick: false,
      showCnt: false
    }
  },
  props: {
    title: String,
    name: {
      type: [String, Number],
      default () {
        return this._uid
      }
    }
  },

  computed: {
    isActive () {
      return this.collapse.activeNames.indexOf(this.name) > -1
    },
    id () {
      return generateId()
    }
  },

  methods: {

    // collapseHook (type) {
    //   this.showCnt = this.isActive
    // },

    handleFocus () {
      setTimeout(() => {
        if (!this.isClick) {
          this.focusing = true
        } else {
          this.isClick = false
        }
      }, 50)
    },
    handleHeaderClick () {
      this.dispatch('SirCollapse', 'item-click', this)
      this.focusing = false
      this.isClick = true
    },
    handleEnterClick () {
      this.dispatch('SirCollapse', 'item-click', this)
    }
  }
}
</script>

<style lang="scss">
  .sir-collapse-item {
    &:not(:first-of-type) {
      margin-top: 18px;
    }
  }

  .collapse-transition {
    -webkit-transition: .3s height ease-in-out,.3s padding-top ease-in-out,.3s padding-bottom ease-in-out;
    transition: .3s height ease-in-out,.3s padding-top ease-in-out,.3s padding-bottom ease-in-out;
  }

  .sir-collapse-item__header {
    position: relative;
    padding-left: 20px;
    background-color: transparent;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    outline: 0;
    &::before {
      content: '';
      position: absolute;
      left: 5px;
      top: 6px;
      width: 0px;
      height: 0px;
      border-left: 6px solid #7D72F0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      // transform: translateY(-50%);
      transition: transform .25s ease-in-out;
    }
    &.is-active {
      &::before {
        transform: rotate(90deg);
      }
    }
  }

  // .sir-collapse-item__arrow {
  //   margin-right: 8px;
  //   -webkit-transition: -webkit-transform .3s;
  //   transition: -webkit-transform .3s;
  //   transition: transform .3s;
  //   transition: transform .3s,-webkit-transform .3s;
  //   float: right;
  //   line-height: 48px;
  //   font-weight: 300;
  //   &.is-active {
  //     -webkit-transform: rotate(90deg);
  //     transform: rotate(90deg);
  //   }
  // }

  .sir-collapse-item__header {
    &.focusing:focus:not(:hover) {
      color: #409EFF;
    }
    // &.is-active {
    //   border-bottom-color: transparent;
    // }
  }

  .sir-collapse-item__wrap {
    will-change: height;
    background-color: transparent;
    overflow: hidden;
    // -webkit-box-sizing: border-box;
    // box-sizing: border-box;
    // border-bottom: 1px solid #ebeef5;
  }

  .sir-collapse-item__content {
    // padding-top: 10px;
    padding-bottom: 5px;
    background-color: transparent;
    font-size: 13px;
    color: #303133;
    line-height: 1.769230769230769;
  }

  .sir-collapse-item:last-child {
    margin-bottom: -1px;
  }
</style>
