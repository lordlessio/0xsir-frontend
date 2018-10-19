<template>
  <section class="TTFontBold relative sir-breakdown">
    <transition name="sir-skeletion-fade">
      <div v-if="loading" class="sir-breakdown-skeletion">
        <div class="skeletion-animate">
          <h2></h2>
          <div class="erc20-skeletion-container">
            <p></p>
            <div>
              <p></p>
              <p></p>
            </div>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="NFTs-skeletion-container">
            <ul>
              <li v-for="p of [1]" :key="p" class="NFTs-skeletion-item">
                <p></p>
                <span class="i-block text-center" v-for="c of [1,2,3,4]" :key="`${p}_${c}`">
                  <svg>
                    <use xlink:href="#icon-alien"/>
                  </svg>
                  <span class="i-block"></span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <transition name="sir-hide-fade">
      <div v-if="!loading">
        <h2 class="sir-title-block">Breakdown</h2>
        <div class="d-flex sir-section-toolbar break-toolbar">
          <p>
            ETH & ERC20 ({{ erc20Datas.total }})
          </p>
          <p class="v-flex d-flex align-center justify-end text-right" @click.stop="popupModel = true">
            <span class="line-height-0">
              <svg>
                <use xlink:href="#icon-menu"/>
              </svg>
            </span>
            <span>More</span>
          </p>
        </div>
        <p class="TTFontMedium break-holding">Holding <span>$ {{ erc20Assets.totalValue | formatDecimal }}</span></p>
        <div class="break-progress-bar">
          <p class="d-flex align-center progress-bar-bg">
            <span
              v-for="(percent, index) of pecentages"
              :key="index"
              :style="`width: ${percent}%;`"></span>
          </p>
        </div>
        <div>
          <sir-popup
            :visible.sync="popupModel"
            :list="erc20Datas.list"
            :title="`ETH & ERC20 (${erc20Datas.total})`"
            @refresh="$emit('refresh', $event)">
            <li
              v-for="(erc20, index) of erc20Datas.list"
              :key="index"
              :style="`transition-delay: ${index * 0.05}s;`"
              class="TTFontMedium d-flex justify-start popup-erc20-assets-item">
              <p class="v-flex d-flex align-center text-left erc20-assets-name">
                <span class="i-block erc20-assets-logo popup-erc20-assets-logo">
                  <img v-lazy="`http://lordless.oss-cn-hongkong.aliyuncs.com/0xsir/source/erc20/${erc20.contract}.png`"/>
                </span>
                <span class="d-flex flex-col">
                  <span>
                    <span class="popup-erc20-count">{{ erc20.count | formatDecimal({ len: 2 }) | formatNumber }} {{ erc20.symbol }}</span>
                    <span class="popup-erc20-price"> × ${{ erc20.price || 0 }}</span>
                  </span>
                  <span class="TTFontBold popup-erc20-value">≈ ${{ erc20.value || 0 }}</span>
                </span>
              </p>
              <p class="TTFontMedium text-right erc20-assets-percent">{{ erc20.value / erc20Assets.totalValue | formatDecimal({ len: 2, percentage: true }) }}%</p>
            </li>
          </sir-popup>
          <ul class="break-erc20-assets text-center">
            <li
              v-for="erc20 of erc20Assets.list"
              :key="erc20.symbol"
              class="d-flex align-center erc20-assets-item">
              <p class="v-flex d-flex align-center text-left erc20-assets-name">
                <span class="i-block erc20-assets-logo">
                  <img v-lazy="`http://lordless.oss-cn-hongkong.aliyuncs.com/0xsir/source/erc20/${erc20.contract}.png`"/>
                </span>
                <span>{{ erc20.symbol }}</span>
              </p>
              <p class="TTFontMedium text-left erc20-assets-value">$ {{ erc20.value | formatNumber }}</p>
              <p class="TTFontMedium text-right erc20-assets-percent">{{ erc20.value / erc20Assets.totalValue | formatDecimal({ len: 2, percentage: true }) }}%</p>
            </li>
          </ul>
        </div>
        <ul class="break-NFTs-assets">
          <li v-for="(asset, index) of NFTAssets" :key="index">
            <p class="d-flex break-toolbar NFTs-toolbar">
              {{ asset.name }} ({{ asset.total }})
            </p>
            <div :ref="`scroll-box-${asset.name}`" class="relative">
              <span
                class="scroll-list-symbol left"
                :class="{ 'show': scrollBar.left[asset.name] }"
                @click.stop="scrollHandle(asset.name, 'left')"></span>
              <span
                class="scroll-list-symbol right"
                :class="{ 'show': !scrollBar.right[asset.name] && asset.list.length > 4 }"
                @click.stop="scrollHandle(asset.name, 'right')"></span>
              <cube-scroll
                :ref="`${asset.name}_scroll`"
                :data="asset.list"
                direction="horizontal"
                class="horizontal-scroll-list-wrap"
                :options="{ scrollBar: true }"
                :scroll-events="scrollEvents"
                @scroll-end="scrollEndListen($event, asset.name)">
                <ul class="d-flex text-nowrap NFTs-assets-ul">
                  <li
                    v-for="(item, index) of asset.list" :key="index"
                    class="d-iflex flex-col align-center NFTs-assets-item">
                    <span class="i-block NFTs-asset-poster" :class="{ 'cryptokitties': item.name === 'CryptoKitties' }" v-lazy:background-image="proxyImg(item.poster)"></span>
                    <p class="full-width text-center NFTs-asset-tokenId" :class="{ 'sm': item.tokenId.toString().length > 6 }">#{{ item.tokenId }}</p>
                  </li>
                  <!-- <li
                    v-if="asset.total > (asset.pn + 1) * asset.ps"
                    class="d-iflex flex-col auto-center NFTs-asset-more"
                    @click.stop="getMoreAsset(asset)">
                      More
                  </li> -->
                </ul>
              </cube-scroll>
            </div>
          </li>
        </ul>
        <button v-if="NFTDatas.NFTsTotal > NFTAssets.length" class="breakdown-btn" @click.stop="viewMoreNFTs">View more NFTs</button>
      </div>
    </transition>
  </section>
</template>

<script>
import { proxyImg } from '@/assets/utils'
export default {
  name: 'Breakdown',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    NFTDatas: {
      type: Object,
      default: () => {}
    },
    erc20Datas: {
      type: Object,
      default: () => {
        return {
          eth: {},
          list: []
        }
      }
    }
  },
  data: () => {
    return {

      // NFTs 列表数据
      NFTAssets: [],
      // NFTs 每页显示
      NFTsPs: 2,

      // Erc20 数据
      erc20Assets: {
        eth: {},
        list: []
      },

      scrollEvents: ['scroll-end'],
      scrollBar: {
        left: {},
        right: {}
      },
      popupModel: false
    }
  },
  computed: {
    pecentages () {
      const erc20Assets = this.erc20Assets
      const erc20total = erc20Assets.erc20Total
      const erc201 = erc20Assets.list[0] || {}
      const erc202 = erc20Assets.list[1] || {}
      const erc203 = erc20Assets.list[2] || {}
      return [erc201.value * 100 / erc20total, erc202.value * 100 / erc20total, erc203.value * 100 / erc20total]
    }
  },
  watch: {
    NFTDatas (val) {
      console.log('-NFTDatas', val)
      if (val) this.initNFTDatas(val)
    },
    erc20Datas (val) {
      if (val) this.initErc20(val)
    }
  },
  methods: {
    proxyImg () {
      return proxyImg(...arguments)
    },

    // 监听 scroll end 事件
    scrollEndListen ({ x, y }, name) {
      const _scroll = this.$refs[`${name}_scroll`][0]
      const maxScrollX = Math.abs(_scroll.scroll.maxScrollX)
      this.$set(this.scrollBar.right, name, Math.abs(x) >= maxScrollX - 60)
      this.$set(this.scrollBar.left, name, Math.abs(x) >= 60)
    },

    // scroll right 触发事件
    scrollHandle (name, direction = 'left') {
      const box = this.$refs[`scroll-box-${name}`][0]
      const width = box.offsetWidth

      const _scroll = this.$refs[`${name}_scroll`][0]
      const currentX = _scroll.scroll.x
      const maxX = _scroll.scroll.maxScrollX

      let scrollX = 0
      if (direction === 'left') {
        console.log('-------', currentX, Math.abs(currentX), width)
        scrollX = Math.abs(currentX) >= width ? currentX + width : 30
      } else {
        scrollX = currentX - width >= maxX ? currentX - width : maxX - 30
      }

      _scroll.scrollTo(scrollX, 0, 500)
    },

    // 初始化处理 NFTDatas
    initNFTDatas (NFTDatas = this.NFTDatas) {
      const _NFTs = JSON.parse(JSON.stringify(NFTDatas.NFTs))
      console.log('_NFTs', _NFTs)
      const _NFTAssets = Object.values(_NFTs)
      // const _NFTAssets = values.map(item => {
      //   const { list } = item
      //   const _item = Object.assign({}, item, {
      //     list: list.slice(0, 3),
      //     pn: 0,
      //     ps: 3
      //   })
      //   return _item
      // })
      this.NFTAssets = _NFTAssets.slice(0, this.NFTsPs)
    },

    // view more NFTs
    viewMoreNFTs (e, NFTAssets = this.NFTAssets, NFTDatas = this.NFTDatas) {
      const len = NFTAssets.length
      const _NFTs = JSON.parse(JSON.stringify(NFTDatas.NFTs))
      const values = Object.values(_NFTs)

      const _values = values.slice(len, this.NFTsPs + len).map(item => {
        const { list } = item
        const _item = Object.assign({}, item, {
          list: list.slice(0, this.assetPs),
          pn: 0,
          ps: this.assetPs
        })
        return _item
      })
      const _NFTAssets = [].concat(NFTAssets, _values)
      this.$set(this, 'NFTAssets', _NFTAssets)
    },

    // 显示更多该类型 NFTs
    // getMoreAsset (asset, NFTAssets = this.NFTAssets, NFTDatas = this.NFTDatas) {
    //   const { pn, ps, total, name } = asset
    //   if ((pn + 1) * ps >= total) return

    //   // 初始化 scroll right 状态
    //   this.$set(this.scrollBar, name, false)

    //   const _NFTs = JSON.parse(JSON.stringify(NFTDatas.NFTs))
    //   const _list = _NFTs[name].list
    //   this.NFTAssets = NFTAssets.map(item => {
    //     if (item.name === name) {
    //       const { pn } = item
    //       const _pn = pn + 1
    //       return Object.assign({}, item, {
    //         pn: _pn,
    //         list: _list.slice(1, (_pn + 1) * ps)
    //       })
    //     }
    //     return item
    //   })
    // },

    initErc20 (erc20Datas = this.erc20Datas) {
      const _erc20Datas = JSON.parse(JSON.stringify(erc20Datas))
      this.erc20Assets = Object.assign({}, _erc20Datas, {
        list: _erc20Datas.list.slice(0, 6)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  $break-color-red: #EB8785;
  $break-color-purple: #DBABFF;
  $break-color-green: #69D1C3;

  .sir-breakdown {
    padding-top: 35px;
    padding-bottom: 35px;
    color: #fff;
    h2 {
      font-size: 24px;
    }

  }
  .break-toolbar {
    margin-top: 30px;
  }
  .break-holding {
    margin-top: 18px;
    font-size: 14px;
    color: #bbb;
    >span {
      margin-left: 5px;
      font-size: 16px;
      color: #ddd;
    }
  }
  .break-progress-bar {
    margin-top: 8px;
  }
  .progress-bar-bg {
    width: 100%;
    height: 16px;
    background-color: #555;
    >span {
      display: inline-block;
      height: 100%;
      &:nth-of-type(1) {
        background-color: $break-color-red;
      }
      &:nth-of-type(2) {
        background-color: $break-color-purple;
      }
      &:nth-of-type(3) {
        background-color: $break-color-green;
      }
    }
  }

  .break-erc20-assets {
    margin-top: 15px;
    font-size: 16px;
  }

  .erc20-assets-item {
    margin-bottom: 14px;
      &:nth-of-type(1) {
        .erc20-assets-name {
          color: $break-color-red;
        }
      }
      &:nth-of-type(2) {
        .erc20-assets-name {
          color: $break-color-purple;
        }
      }
      &:nth-of-type(3) {
        .erc20-assets-name {
          color: $break-color-green;
        }
      }
  }
  .erc20-assets-logo {
    margin-right: 10px;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-color: #fff;
    overflow: hidden;
    >img {
      width: 100%;
    }
  }

  .erc20-assets-name {
    // width: 40%;
  }

  .erc20-assets-value {
    width: 75px;
  }
  .erc20-assets-percent {
    width: 75px;
  }

  .scroll-list-symbol {
    position: absolute;
    top: 0;
    height: 100%;
    width: 60px;
    opacity: 0;
    visibility: hidden;
    transition: opacity .3s, visibility 0s .3s;
    z-index: 2;
    &::before {
      content: '';
      position: absolute;
      // right: 0;
      top: 0;
      width: 60px;
      height: 100%;
      // background-image: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    }
    &::after {
      content: '';
      position: absolute;
      // right: 5px;
      top: 50%;
      width: 0px;
      height: 0px;
      border-top: 12px solid transparent;
      // border-left: 12px solid #bbb;
      border-bottom: 12px solid transparent;
      // border-right: 12px solid transparent;
      transform: translateY(-50%);
      z-index: 1;
    }
    &.right {
      right: 0;
      &::before {
        right: 0;
        background-image: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
      }
      &::after {
        right: 12px;
        border-left: 12px solid #bbb;
      }
    }
    &.left {
      left: 0;
      &::before {
        left: 0;
        background-image: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
      }
      &::after {
        left: 12px;
        border-right: 12px solid #bbb;
      }
    }
    &.show {
      opacity: 1;
      visibility: visible;
      transition: opacity .3s, visibility 0s 0s;
    }
  }

  // .scroll-list-right {
  //   position: absolute;
  //   right: 0;
  //   top: 0;
  //   height: 100%;
  //   width: 60px;
  //   opacity: 0;
  //   visibility: hidden;
  //   transition: opacity .3s, visibility 0s .3s;
  //   z-index: 2;
  //   &::before {
  //     content: '';
  //     position: absolute;
  //     right: 0;
  //     top: 0;
  //     width: 60px;
  //     height: 100%;
  //     background-image: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  //   }
  //   &::after {
  //     content: '';
  //     position: absolute;
  //     right: 5px;
  //     top: 50%;
  //     width: 0px;
  //     height: 0px;
  //     border-top: 12px solid transparent;
  //     border-left: 12px solid #bbb;
  //     border-bottom: 12px solid transparent;
  //     border-right: 12px solid transparent;
  //     transform: translateY(-50%);
  //     z-index: 1;
  //   }
  //   &.unRight {
  //     opacity: 1;
  //     visibility: visible;
  //     transition: opacity .3s, visibility 0s 0s;
  //   }
  // }

  // popup style
  .popup-erc20-assets-item {
    margin-bottom: 14px;
  }
  .popup-erc20-assets-logo {
    margin-right: 12px;
    width: 35px;
    height: 35px;
  }
  .popup-erc20-count {
    color: #7D72F0;
  }
  .popup-erc20-price {
    margin-left: 5px;
    font-size: 12px;
  }
  .popup-erc20-value {
    margin-top: 5px;
  }

  // break-NFTs-assets
  .break-NFTs-assets {
    /deep/ {
      .cube-scroll-content {
        display: inline-block;
      }
    }
  }
  .NFTs-toolbar {
    margin-top: 42px;
  }
  .NFTs-assets-ul {
    margin-top: 15px;
    white-space: nowrap;
  }
  .NFTs-assets-item {
    &:not(:last-of-type) {
      margin-right: 5px;
    }
  }
  .NFTs-asset-poster {
    width: 72px;
    height: 72px;
    @include bg-size();
    &.cryptokitties {
      background-size: 120%;
      background-position-x: 80%;
    }
  }
  .NFTs-asset-tokenId {
    &.sm {
      font-size: 12px;
    }
  }
  .NFTs-asset-more {
    width: 72px;
    height: 72px;
    background-color: #bbb;
    border-radius: 5px;
  }
  .breakdown-btn {
    margin-top: 40px;
    padding: 13px 0;
    width: 100%;
    font-family: $--font-TTNormsBold;
    font-size: 16px;
    color: #fff;
    border-radius: 5px;
    background-color: #7D72F0;
    border: none;
  }

  // sir-breakdown-skeletion
  .sir-breakdown-skeletion {
    h2 {
      margin-bottom: 25px;
      width: 180px;
      height: 28px;
      background-color: $--skeletion-light;
      border-radius: 3px;
    }
  }
  .erc20-skeletion-container {
    p, li {
      background-color: $--skeletion-light;
      border-radius: 3px;
    }
    >p {
      width: 200px;
      height: 20px;
    }
    >div {
      margin-top: 18px;
      >p {
        width: 160px;
        height: 16px;
        &:nth-of-type(2) {
          margin-top: 8px;
          width: 100%;
        }
      }
    }
    >ul {
      margin-top: 15px;
      >li {
        margin-top: 14px;
        height: 30px;
      }
    }
  }

  // sir-NFTs-skeletion
  .sir-NFTs-skeletion {

  }
  .NFTs-skeletion-container {

  }
  .NFTs-skeletion-item {
    >p {
      margin-top: 42px;
      width: 200px;
      height: 16px;
      background-color: $--skeletion-light;
      border-radius: 3px;
    }
    >span {
      margin-top: 15px;
      >span {
        width: 80%;
        height: 12px;
        background-color: $--skeletion-light;
        border-radius: 2px;
      }
    }
    svg {
      width: 72px;
      height: 72px;
      fill: $--skeletion-light;
      border-radius: 3px;
    }
  }
</style>
