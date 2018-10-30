<template>
  <header data-html2canvas-ignore id="sir-main-header" class="TTFontBold sir-header">
    <div class="d-flex col-flex container">
      <p class="v-flex" @click.stop="$router.push('/')">
        Mr.0x
      </p>
      <p v-if="showTool" class="header-icons">
        <span class="i-block">
          <sir-search
            :visible.sync="searchModel"
            @search="search">
            sir search
          </sir-search>
          <svg @click.stop="searchModel = !searchModel">
            <use xlink:href="#icon-search"/>
          </svg>
        </span>
        <span class="i-block" @click.stop="$emit('download')">
          <svg>
            <use xlink:href="#icon-download"/>
          </svg>
        </span>
      </p>
    </div>
  </header>
</template>

<script>
import throttle from 'lodash/throttle'
import SirSearch from '@/components/utils/Search'

import { addClass, removeClass } from 'utils'
export default {
  name: 'sir-header',
  props: {
    showTool: {
      type: Boolean,
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  data: () => {
    return {
      searchModel: false
    }
  },
  components: {
    SirSearch
  },
  methods: {
    search (e) {
      this.searchModel = false
      this.$emit('search', e)
    }
  },
  mounted () {
    if (this.appendToBody) {
      document.body.appendChild(this.$el)
    }
    let navbarInverse = false
    const func = () => {
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      if (!navbarInverse && scrollTop > 62) {
        const header = document.getElementById('sir-main-header')
        header.style.opacity = 0
        addClass('fixed', header)
        header.style.opacity = 1
        navbarInverse = true
      } else if (navbarInverse && scrollTop <= 62) {
        const header = document.getElementById('sir-main-header')
        header.style.opacity = 0
        removeClass('fixed', header)
        header.style.opacity = 1
        navbarInverse = false
      }
    }
    document.addEventListener('scroll', throttle(func, 300))

    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('scroll', func)
    })
  },
  beforeDestroy () {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>

<style lang="scss" scoped>
  .sir-header {
    position: fixed;
    padding-top: 31px;
    padding-bottom: 15px;
    top: -1px;
    left: 0;
    width: 100%;
    font-size: 20px;
    color: #fff;
    background-color: transparent;
    transition: all .3s ease;
    z-index: 99;
    &.fixed {
      // position: fixed;
      // top: 0;
      padding-top: 15px;
      background-color: #151618;
      // z-index: 99;
    }
    .container {
      width: 100%;
    }
  }
  .header-icons {
    span {
      margin-left: 15px;
    }
    svg {
      width: 20px;
      height: 20px;
      fill: #BDB9FD;
    }
  }
</style>
