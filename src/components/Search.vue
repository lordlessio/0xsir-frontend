<template>
  <section class="sir-search-section" :class="{ 'is-inside': inside }">
    <div class="search-profile">
      <h1>Address Profile</h1>
      <div class="search-input-box" :class="{ 'is-focus': inputFocus, 'is-error': inputError }" :data-error="inputErrorTxt">
        <div class="d-flex row-flex search-input-container">
          <input v-model="searchModel" class="TTFontMedium v-flex search-input" type="text" placeholder="Enter Ethereum address" @focus="inputFocus = true" @blur="inputFocus = false"/>
          <span class="i-block text-center search-input-icon" @click.stop="$emit('search', searchModel)">Q</span>
        </div>
      </div>
    </div>
    <div class="search-popular">
      <h2 class="sir-title-block">Popular Addresses</h2>
      <p class="search-popular-desc">Check out addresses shown below to get a quick start.</p>
      <sir-collapse v-model="activeNames" class="sir-collapse-box" :class="{ 'is-active': showCollapse }">
        <sir-collapse-item
          v-for="(group, index) of Object.keys(groups)" :key="index"
          class="search-collapse-item"
          :style="`transition-delay: ${index * 0.15}s;`"
          :title="`${group} (${groups[group].length})`" :name="index">
          <span
            v-for="(item, index) of groups[group]" :key="index"
            class="i-block sir-popular-address"
            @click.stop="$emit('search', item._id)">{{ item.name }}</span>
        </sir-collapse-item>
      </sir-collapse>
    </div>
  </section>
</template>

<script>
import { getGroups } from 'api'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    inside: {
      type: Boolean,
      default: false
    },
    actives: {
      type: [Array, String],
      default: () => [ 0 ]
    }
  },
  data: (vm) => {
    return {
      groups: [],
      inputErrorTxt: '',
      inputError: false,
      searchModel: '',
      inputFocus: false,
      showCollapse: false,
      activeNames: vm.actives
    }
  },
  watch: {
    visible (val) {
      if (val) {
        setTimeout(() => {
          this.showCollapse = true
        }, 500)
      }
    },

    searchModel (val) {
      if (val) {
        const match = /^(0x)([A-Za-z0-9]{40})$/
        const bool = val.match(match)
        if (!bool) this.inputErrorTxt = 'Enter the correct Ethereum address.'
        this.inputError = !bool
      } else this.inputError = false
    }
  },
  methods: {
    async getGroups () {
      const localGroups = localStorage.getItem('0xsir_popular_address')
      if (localGroups) {
        this.groups = JSON.parse(localGroups)
        return
      }
      const res = await getGroups()
      if (res.code === 1000 && res.data) {
        const groups = this.rewriteGroups(res.data)
        this.groups = groups
        localStorage.setItem('0xsir_popular_address', JSON.stringify(groups))
      }
    },
    rewriteGroups (list) {
      const data = {}
      const groups = [ 'Binance', 'Poloniex', 'Fomo3D', 'CryptoKitties', 'GU' ]
      for (const group of groups) {
        for (const item of list) {
          if (item.group === group) {
            let _group = group
            if (group === 'GU') _group = 'Gods Unchained'
            data[_group] = data[_group] || []
            data[_group].push(item)
          }
        }
      }
      return data
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getGroups()
    })
  }
}
</script>

<style lang="scss" scoped>
  .sir-search-section {
    box-sizing: border-box;
    &.is-inside {
      .search-profile {
        padding-top: 80px;
        padding-bottom: 80px;
      }
    }
  }
  .search-profile {
    padding-top: 150px;
    padding-bottom: 100px;
    >h1 {
      margin-bottom: 35px;
      font-size: 30px;
    }
  }
  .search-input-box {
    position: relative;
    border: 1px solid #7D72F0;
    border-radius: 5px;
    &.is-focus {
      box-shadow: 0 0 10px 5px rgba(125, 114, 240, .5);
      &.is-error {
        box-shadow: 0 0 10px 5px rgba(235, 135, 133, .5);
      }
    }
    &.is-error {
      border-color: #EB8785;
      .search-input-icon {
        background-color: #EB8785;
      }
      &::before {
        opacity: 1;
        transform: scaleY(1);
      }
    }
    &::before {
      content: attr(data-error);
      position: absolute;
      bottom: -24px;
      left: 0;
      line-height: 16px;
      font-size: 14px;
      color: #EB8785;
      opacity: 0;
      transform: scaleY(.5);
      transform-origin: 0 0;
      transition: all .3s ease-in-out;
    }
  }
  .search-input-container {
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
    overflow: hidden;
  }
  .search-input {
    width: 100%;
    height: 100%;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 16px;
    color: #BDB9FD;
    background-color: transparent;
    &::placeholder {
      color: #BDB9FD;
    }
  }
  .search-input-icon {
    width: 64px;
    background-color: #7D72F0;
  }

  .search-popular {
    >h2 {
      font-size: 24px;
    }
  }
  .search-popular-desc {
    margin-top: 15px;
    margin-bottom: 20px;
    font-size: 14px;
  }

  .sir-popular-address {
    margin-top: 5px;
    margin-right: 10px;
    padding: 2px 6px;
    font-family: $--font-TTNormsMedium;
    font-size: 12px;
    color: #fff;
    background-color: #7D72F0;
    border-radius: 5px;
  }

  .search-collapse-item {
    margin-right: -10px;
    opacity: 0;
    transform: translateY(5px);
    transition: opacity .5s ease-in-out, transform .5s ease-in-out;
  }
  .sir-collapse-box {
    &.is-active {
      .search-collapse-item {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
</style>
