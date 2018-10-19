<template>
  <header id="sir-main-header" class="TTFontBold sir-header">
    <div class="d-flex col-flex container">
      <p class="v-flex">
        Mr.0x
      </p>
      <p class="header-icons">
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
        <span class="i-block">
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
  }
}
</script>

<style lang="scss" scoped>
  .sir-header {
    position: absolute;
    padding-top: 35px;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 24px;
    color: #fff;
    transition: all .3s ease;
    &.fixed {
      top: 0;
      background-color: #151618;
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
      width: 24px;
      height: 24px;
      fill: #BDB9FD;
    }
  }
</style>
