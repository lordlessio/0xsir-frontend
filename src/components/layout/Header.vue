<template>
  <header data-html2canvas-ignore id="sir-main-header" class="TTFontBold sir-header" :class="{ 'is-hide': hide }">
    <div class="container" :class="{ 'search': searchModel }">
      <div class="d-flex col-flex lens-header-cnt">
        <p class="TTFontBlack v-flex d-flex align-center text-uppper lens-header-logo" @click.stop="$router.push('/')">
          <svg class="image-logo">
            <use xlink:href="#blocklens-gradient-logo"/>
          </svg>
          <svg class="text-logo">
            <use xlink:href="#blocklens-text-logo"/>
          </svg>
        </p>
        <p v-if="showTool" class="d-flex flex-row align-start header-icons">
          <span v-if="!loading" class="i-block line-height-0" @click.stop="$emit('download')">
            <svg>
              <use xlink:href="#icon-download"/>
            </svg>
          </span>
          <span class="i-block line-height-0 header-search-icon" @click.stop="searchModel = !searchModel">
            <!-- <sir-search
              :visible.sync="searchModel"
              @search="search">
              sir search
            </sir-search> -->
            <span class="d-iflex flex-col header-search-icon-container" :class="{ 'search': !searchModel, 'arrow': searchModel }">
              <svg data-type="search">
                <use xlink:href="#icon-search"/>
              </svg>
              <svg data-type="arrow">
                <use xlink:href="#icon-arrow-up"/>
              </svg>
            </span>
          </span>
        </p>
      </div>
      <transition name="sir-detail-fade" @after-enter="searchAfterEnter">
        <div v-if="searchModel" class="lens-header-search">
          <div class="d-flex flex-row">
            <input ref="header-search-input" v-model="searchInput" class="TTFontMedium v-flex lens-search-input" type="text" placeholder="Enter Ethereum address"/>
            <span class="d-iflex auto-center text-center search-input-icon" @click.stop="search({ _id: searchInput })">
              <svg>
                <use xlink:href="#icon-search"/>
              </svg>
            </span>
          </div>
          <div class="recent-searches">
            <p class="d-flex align-center recent-search-title">
              <span class="i-block line-height-0 recent-search-icon">
                <svg>
                  <use xlink:href="#icon-history"/>
                </svg>
              </span>
              <span>Recent searches</span>
            </p>
            <ul class="full-width d-flex row-flex f-wrap align-center">
              <li v-for="(recent, index) of recentSearches" :key="index">
                <span
                  class="i-block sir-popular-address"
                  @click.stop="search(recent)">
                    <span v-if="recent.name">{{ recent.name }}</span>
                    <span v-else class="text-lower">{{ recent._id | splitAddress }}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <sir-mask-tool :visible.sync="searchModel" single :zIndex="98"/>
  </header>
</template>

<script>
// import throttle from 'lodash/throttle'
import SirSearch from '@/components/utils/Search'

import { addClass, removeClass } from 'utils'
import SearchMixin from '@/mixins/search'
export default {
  name: 'sir-header',
  mixins: [SearchMixin],
  props: {
    showTool: {
      type: Boolean,
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: true
    },
    hide: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      inputErrorTxt: '',
      searchInput: '',
      maskModel: false,
      searchModel: false
    }
  },
  computed: {
    recentSearches () {
      const localData = localStorage.getItem('lens_searches')
      if (!localData) return []
      return JSON.parse(localData)
    }
  },
  watch: {
    searchInput (val) {
      if (val) {
        const bool = this.checkInput(val)
        if (!bool) this.inputErrorTxt = 'Enter the correct Ethereum address.'
      } else this.inputErrorTxt = null
    }
  },
  components: {
    SirSearch
  },
  methods: {
    search (e) {
      console.log('00000', e)
      this.searchModel = false
      this.$emit('search', e)
    },
    searchAfterEnter () {
      this.$refs['header-search-input'].focus()
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
    document.addEventListener('scroll', func)

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
    top: -1px;
    left: 0;
    width: 100%;
    font-size: 20px;
    color: #fff;
    background-color: transparent;
    z-index: 99;
    &.fixed {
      // position: fixed;
      // top: 0;
      // z-index: 99;
      .container {
        padding-top: 15px;
        background-color: #151618;
      }
    }
    .container {
      padding-top: 31px;
      padding-bottom: 15px;
      width: 100%;
      transition: all .4s ease;
      &.search {
        padding-top: 15px;
        padding-bottom: 25px;
        background-color: #151618;
      }
    }
    &.is-hide {
      .container {
        transform: translateY(-100%);
      }
    }
  }
  .lens-header-logo {
    >svg {
      &.image-logo {
        width: 24px;
        height: 24px;
      }
      &.text-logo {
        margin-left: 8px;
        width: 90px;
        height: 16px;
        fill: #BDB9FD;
      }
    }
  }
  .header-icons {
    >span {
      margin-left: 15px;
    }
    svg {
      width: 20px;
      height: 20px;
      fill: #BDB9FD;
    }
  }
  .header-search-icon {
    position: relative;
    width: 20px;
    height: 20px;
    overflow: hidden;
    &.search {
      &[data-type='search'] {
        transform: translateY(0);
      }
    }
  }
  .header-search-icon-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    transition: all .4s cubic-bezier(0.4, 0, 0.2, 1);
    >svg {
      margin-bottom: 5px;
      // &[data-type='arrow'] {
      //   stroke-width: 2px;
      //   stroke: #BDB9FD;
      // }
    }
    &.search {
      top: 0;
    }
    &.arrow {
      top: -25px;
    }
  }

  // lens-header-search

  .lens-header-search {
    margin-top: 25px;
  }
  .lens-search-input {
    padding-right: 30px;
    padding-left: 3px;
    height: 20px;
    border: none;
    font-size: 16px;
    color: #BDB9FD;
    background-color: transparent;
  }
  .search-input-icon {
    svg {
      width: 20px;
      height: 20px;
      fill: #BDB9FD;
    }
  }
  .recent-searches {
    margin-top: 20px;
  }
  .recent-search-title {
    margin-bottom: 15px;
    font-size: 18px;
    color: #BDB9FD;
  }
  .sir-popular-address {
    margin-top: 5px;
    margin-right: 10px;
    padding: 2px 6px;
    line-height: 20px;
    font-family: $--font-TTNormsMedium;
    font-size: 12px;
    color: #fff;
    background-color: #7D72F0;
    border-radius: 5px;
  }
  .recent-search-icon {
    margin-right: 8px;
    >svg {
      width: 18px;
      height: 18px;
      fill: #BDB9FD;
    }
  }
</style>
