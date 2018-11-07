<template>
  <section class="TTFontBold relative sir-breakdown" :class="{ 'download': download }">
    <h2 class="download-hide sir-title-block">Breakdown</h2>
    <div class="d-flex sir-section-toolbar break-toolbar">
      <p>
        <span>ETH & ERC20 </span>
        <span class="download-hide">({{ erc20Datas.total }})</span>
        <span class="download-show download-assets-total">({{ erc20Datas.total > 5 ? 5 : erc20Datas.total }} of {{ erc20Datas.total }})</span>
      </p>
      <p v-if="!download" class="v-flex d-flex align-center justify-end text-right" @click.stop="erc20Pupup = true">
        <span class="line-height-0">
          <svg>
            <use xlink:href="#icon-menu"/>
          </svg>
        </span>
        <span>More</span>
      </p>
    </div>
    <p class="download-hide TTFontMedium break-holding"><span>$ {{ erc20Assets.totalValue | formatDecimal }}</span>&nbsp;&nbsp;&nbsp;holding</p>
    <div class="download-hide break-progress-bar">
      <p class="d-flex align-center progress-bar-bg">
        <span
          v-for="(percent, index) of pecentages"
          :key="index"
          :style="`width: ${percent}%;`"></span>
      </p>
    </div>
    <div>
      <ul v-show="download" class="d-flex flex-row f-wrap justify-start download-erc20-assets text-center">
        <li class="d-iflex flex-col auto-center download-erc20-item" v-for="(erc20, index) of erc20Datas.list.slice(0, 5)" :key="index">
          <span class="i-block erc20-assets-logo download">
            <img :src="`${ossOrigin}/0xsir/source/erc20/${erc20.contract}`" @load.once="onImgLoad" @error.once="onImgError"/>
          </span>
          <span class="i-block TTFontMedium download-erc20-symbol">{{ erc20.symbol | sliceStr({ end: 4 }) }}{{ erc20.symbol.length > 4 ? '..' : '' }}</span>
        </li>
      </ul>
      <ul v-if="!download" class="break-erc20-assets text-center" @click.stop="searchIntrust">
        <!-- <li
          v-for="(erc20, index) of erc20Assets.list"
          :key="index"
          class="d-flex align-center text-center erc20-assets-item">
          <p class="v-flex d-flex align-center text-left erc20-assets-name">
            <span class="i-block erc20-assets-logo margin" v-lazy:background-image="resizeImage(`${ossOrigin}/0xsir/source/erc20/${erc20.contract}`)">
            </span>
            <span>{{ erc20.symbol }}</span>
          </p>
          <p class="TTFontMedium text-left erc20-assets-value">$ {{ erc20.value | formatNumber }}</p>
          <p class="TTFontMedium text-right erc20-assets-percent">{{ erc20.value / erc20Assets.totalValue | formatDecimal({ len: 2, percentage: true }) }}%</p>
        </li> -->
        <li
          v-for="(erc20, index) of erc20Assets.list"
          :key="index"
          class="TTFontMedium d-flex justify-start popup-erc20-assets-item">
          <p :data-contract="erc20.contract" :data-name="erc20.symbol" class="v-flex d-flex align-center text-left erc20-assets-name">
            <span class="i-block erc20-assets-logo popup-erc20-assets-logo">
              <img v-lazy="resizeImage(`${ossOrigin}/0xsir/source/erc20/${erc20.contract.toLocaleLowerCase()}`)"/>
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
      </ul>
    </div>

    <div v-show="download && NFTDatas.total" class="download-NFTs-assets">
      <p>NFTs<span class="download-assets-total"> ({{ NFTDatas.total > 4 ? 4 : NFTDatas.total }} of {{ NFTDatas.total }})</span></p>
      <ul class="d-flex f-wrap TTFontMedium text-center">
        <li
          v-for="(NFT, index) of downloadNFTs" :key="index"
          class="d-iflex flex-col align-center auto-center download-NFTs-item">
          <span class="i-block NFTs-asset-poster" :class="{ 'cryptokitties': NFT.assets.name === 'CryptoKitties' }">
            <img :src="NFT.poster" @load.once="onImgLoad" @error.once="onImgError"/>
          </span>
          <p class="full-width text-center NFTs-asset-tokenId" :class="{ 'sm': NFT.tokenId.toString().length > 6 }">#{{ NFT.tokenId }}</p>
        </li>
        <!-- <li class="auto-center download-NFTs-item" v-for="(NFTs, index) of NFTAssets" :key="index">
          <ul>
            <li
              v-for="(item, cIndex) of NFTs.list.slice(0, 4)" :key="cIndex"
              class="d-iflex flex-col align-center NFTs-assets-item">
              <span class="i-block NFTs-asset-poster" :class="{ 'cryptokitties': item.name === 'CryptoKitties' }">
                <img :src="item.poster" @load.once="onImgLoad" @error.once="onImgError"/>
              </span>
              <p class="full-width text-center NFTs-asset-tokenId" :class="{ 'sm': item.tokenId.toString().length > 6 }">#{{ item.tokenId }}</p>
            </li>
          </ul>
        </li> -->
      </ul>
    </div>
    <div v-if="!download" class="break-NFTs-assets">
      <ul>
        <li v-for="(asset, index) of NFTAssets" :key="index">
          <p class="d-flex break-toolbar NFTs-toolbar">
            {{ asset.name }} ({{ asset.total }})
          </p>
          <div :ref="`scroll-box-${asset.name}`" class="relative">
            <ul class="d-flex text-nowrap NFTs-assets-ul">
              <li
                v-for="(item, index) of asset.list.slice(0, 4)" :key="index"
                class="d-iflex flex-col align-center NFTs-assets-item">
                <span class="i-block NFTs-asset-poster" :class="{ 'cryptokitties': item.assets.name === 'CryptoKitties' }">
                  <img v-lazy="resizeImage(item.poster)"/>
                </span>
                <p class="full-width text-center NFTs-asset-tokenId" :class="{ 'sm': item.tokenId.toString().length > 6 }">#{{ item.tokenId }}</p>
              </li>
            </ul>
            <!-- <span
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
                  <span
                    class="i-block NFTs-asset-poster"
                    :class="{ 'cryptokitties': item.name === 'CryptoKitties' }"
                    v-lazy:background-image="resizeImage(item.poster)"
                    >
                  </span>
                  <p class="full-width text-center NFTs-asset-tokenId" :class="{ 'sm': item.tokenId.toString().length > 6 }">#{{ item.tokenId }}</p>
                </li>
              </ul>
            </cube-scroll> -->
          </div>
        </li>
      </ul>
      <button v-if="NFTDatas.NFTsTotal && NFTDatas.total > 4" class="breakdown-btn" @click.stop="NFTsPopup = true">View more NFTs</button>
    </div>
    <sir-popup
      :visible.sync="erc20Pupup"
      :list="erc20Datas.list"
      :title="`ETH & ERC20 (${erc20Datas.total})`"
      :pullDownRefresh="false"
      @refresh="$emit('refresh', $event)">
      <li
        v-for="(erc20, index) of erc20Datas.list"
        :key="index"
        :style="`transition-delay: ${index * 0.05}s;`"
        class="TTFontMedium d-flex justify-start popup-erc20-assets-item"
        @click.stop="searchIntrust">
        <p :data-contract="erc20.contract" :data-name="erc20.symbol" class="v-flex d-flex align-center text-left erc20-assets-name">
          <span class="i-block erc20-assets-logo popup-erc20-assets-logo" :data-contract="erc20.contract">
            <img :src="resizeImage(`${ossOrigin}/0xsir/source/erc20/${erc20.contract.toLocaleLowerCase()}`)" @error.once="onImgError"/>
          </span>
          <span class="d-flex flex-col">
            <span>
              <span class="popup-erc20-count">{{ erc20.count | formatDecimal({ len: 2 }) | formatNumber }} {{ erc20.symbol }}</span>
              <span class="popup-erc20-price"> × ${{ erc20.price || 0 }}</span>
            </span>
            <span class="TTFontBold popup-erc20-value">≈ ${{ erc20.value || 0 }}</span>
          </span>
        </p>
        <p class="TTFontMedium text-right erc20-assets-percent">{{ (erc20.value / erc20Assets.totalValue) | formatDecimal({ len: 2, percentage: true }) }}%</p>
      </li>
    </sir-popup>
    <sir-popup
      :visible.sync="NFTsPopup"
      :list="Object.values(NFTDatas.NFTs || {})"
      :title="`NFTs (${Object.values(NFTDatas.NFTs || {}).length})`"
      :scroll="false">
      <div class="overflow">
        <ul class="break-NFTs-assets">
          <li v-for="(asset, index) of Object.values(NFTDatas.NFTs || {})" :key="index">
            <p class="d-flex break-toolbar NFTs-toolbar">
              {{ asset.name }} ({{ asset.total }})
            </p>
            <div :ref="`scroll-box-${`${asset.name}_popup`}`" class="relative">
              <span
                class="scroll-list-symbol left popup"
                :class="{ 'show': scrollBar.left[`${asset.name}_popup`] }"
                @click.stop="scrollHandle(`${asset.name}_popup`, 'left')"></span>
              <span
                class="scroll-list-symbol right popup"
                :class="{ 'show': !scrollBar.right[`${asset.name}_popup`] && asset.list.length > 4 }"
                @click.stop="scrollHandle(`${asset.name}_popup`, 'right')"></span>
              <cube-scroll
                :ref="`${asset.name}_popup_scroll`"
                :data="asset.list"
                direction="horizontal"
                class="horizontal-scroll-list-wrap"
                :options="{ scrollBar: true }"
                :scroll-events="scrollEvents"
                @scroll-end="scrollEndListen($event, `${asset.name}_popup`)">
                <ul class="d-flex text-nowrap NFTs-assets-ul">
                  <li
                    v-for="(item, index) of asset.list" :key="index"
                    class="d-iflex flex-col align-center NFTs-assets-item">
                    <span class="i-block NFTs-asset-poster" :class="{ 'cryptokitties': item.assets.name === 'CryptoKitties' }">
                      <img v-lazy="resizeImage(item.poster)"/>
                    </span>
                    <p class="full-width text-center NFTs-asset-tokenId" :class="{ 'sm': item.tokenId.toString().length > 6 }">#{{ item.tokenId }}</p>
                  </li>
                </ul>
              </cube-scroll>
            </div>
          </li>
        </ul>
      </div>
    </sir-popup>
  </section>
</template>

<script>
import { resizeImage } from '@/assets/utils'

import ImgLoadMixins from '@/mixins/imageLoad'
import SearchMixins from '@/mixins/search'
// import Alien from '_static/alien.png'
export default {
  name: 'Breakdown',
  mixins: [ImgLoadMixins, SearchMixins],
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    NFTDatas: {
      type: Object,
      default: () => {
        return {
          list: []
        }
      }
    },
    erc20Datas: {
      type: Object,
      default: () => {
        return {
          eth: {},
          list: []
        }
      }
    },
    download: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {

      // NFTs 列表数据
      // NFTAssets: [],
      // NFTs 每页显示
      NFTsPs: 3,

      erc20Ps: 6,

      // Erc20 数据
      // erc20Assets: {
      //   eth: {},
      //   list: []
      // },

      // downloadNFTs: [],

      scrollEvents: ['scroll-end'],
      scrollBar: {
        left: {},
        right: {}
      },
      erc20Pupup: false,
      NFTsPopup: false
    }
  },
  computed: {
    pecentages () {
      const erc20Assets = this.erc20Assets
      const erc20total = erc20Assets.totalValue
      const erc201 = erc20Assets.list[0] || {}
      const erc202 = erc20Assets.list[1] || {}
      const erc203 = erc20Assets.list[2] || {}
      return [erc201.value * 100 / erc20total, erc202.value * 100 / erc20total, erc203.value * 100 / erc20total]
    },
    erc20Assets () {
      const _erc20Datas = JSON.parse(JSON.stringify(this.erc20Datas))
      return Object.assign({}, _erc20Datas, {
        list: _erc20Datas.list.slice(0, this.erc20Ps)
      })
    },
    NFTAssets () {
      const _NFTs = JSON.parse(JSON.stringify(this.NFTDatas.NFTs))
      console.log('_NFTs', _NFTs)
      const _NFTAssets = Object.values(_NFTs || {})
      return _NFTAssets.slice(0, this.NFTsPs)
    },
    downloadNFTs () {
      const _NFTs = JSON.parse(JSON.stringify(this.NFTDatas.NFTs))
      console.log('_NFTs', _NFTs)
      const _NFTAssets = Object.values(_NFTs || {})

      const __NFTAssets = JSON.parse(JSON.stringify(_NFTAssets))
      const _downloadNFTs = []
      while (_downloadNFTs.length < 4 && __NFTAssets.length) {
        for (let i = 0; i < __NFTAssets.length; i++) {
          if (!__NFTAssets[i].list.length) {
            __NFTAssets.splice(i, 1)
            continue
          }
          _downloadNFTs.push(__NFTAssets[i].list[0])
          __NFTAssets[i].list.splice(0, 1)
        }
        // for (let i = 0; i < __NFTAssets.length; i++) {
        //   if (i > 2) {
        //     break
        //   }
        //   if (!__NFTAssets[i].list.length) {
        //     __NFTAssets.splice(i, 1)
        //     continue
        //   }
        //   for (let j = 0; j < __NFTAssets[i].list.length; j++) {
        //     if (j > 3) {
        //       break
        //     }
        //     _downloadNFTs.push(__NFTAssets[i].list[j])
        //     __NFTAssets[i].list.splice(j, 1)
        //   }
        // }
      }
      console.log('_downloadNFTs', _downloadNFTs)
      return _downloadNFTs.sort(item => item.assets.contract)
    }

  },
  watch: {
    NFTDatas (val) {
      console.log('-NFTDatas', val)
      if (val) this.initNFTDatas(val)
    }
  },
  methods: {
    resizeImage () {
      return resizeImage(...arguments)
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
      const _NFTAssets = Object.values(_NFTs || {})
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

      const __NFTAssets = JSON.parse(JSON.stringify(_NFTAssets.slice(0, 3)))
      const _downloadNFTs = []
      while (_downloadNFTs.length < 11 && __NFTAssets.length) {
        for (let i = 0; i < __NFTAssets.length; i++) {
          if (i > 2) {
            break
          }
          if (!__NFTAssets[i].list.length) {
            __NFTAssets.splice(i, 1)
            continue
          }
          for (let j = 0; j < __NFTAssets[i].list.length; j++) {
            if (j > 3) {
              break
            }
            _downloadNFTs.push(__NFTAssets[i].list[j])
            __NFTAssets[i].list.splice(j, 1)
          }
        }
      }
      this.downloadNFTs = _downloadNFTs.sort(item => item.assets.contract)
      console.log('_downloadNFTs', _downloadNFTs)
    },

    // view more NFTs
    viewMoreNFTs (e, NFTAssets = this.NFTAssets, NFTDatas = this.NFTDatas) {
      const len = NFTAssets.length
      const _NFTs = JSON.parse(JSON.stringify(NFTDatas.NFTs))
      const values = Object.values(_NFTs || {})

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
        list: _erc20Datas.list.slice(0, this.erc20Ps)
      })
    }
  },
  mounted () {
    // xhrImg2Base64('http://cdn.lordlessio.com/0xsir/source/erc20/0xdd974d5c2e2928dea5f71b9825b8b646686bd200.png').then(d => {
    //   console.log('d', d)
    // })
  }
}
</script>

<style lang="scss" scoped>
  $erc20-color-gold: #FF9D15;
  $erc20-color-purple: #DA5DFF;
  $erc20-color-blue: #52A1FF;

  .sir-breakdown {
    // padding-top: 35px;
    padding-bottom: 35px;
    color: #fff;
    h2 {
      font-size: 24px;
    }
    &.download {
      padding-top: 0;
      padding-bottom: 0;
      .download-hide {
        display: none;
      }
      .sir-section-toolbar {
        margin-top: 0;
      }
    }
    &:not(.download) {
      .download-show {
        display: none;
      }
    }
  }
  .download-assets-total {
    font-size: 14px;
    font-family: $--font-TTNormsMedium;
    color: #BDB9FD;
  }

  .break-toolbar {
    margin-top: 30px;
  }
  .break-holding {
    margin-top: 15px;
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
        background-color: $erc20-color-gold;
      }
      &:nth-of-type(2) {
        background-color: $erc20-color-purple;
      }
      &:nth-of-type(3) {
        background-color: $erc20-color-blue;
      }
    }
  }

  .break-erc20-assets {
    margin-top: 16px;
    font-size: 16px;
  }

  .erc20-assets-item {
    margin-bottom: 14px;
      // &:nth-of-type(1) {
      //   .erc20-assets-name {
      //     color: $erc20-color-gold;
      //   }
      // }
      // &:nth-of-type(2) {
      //   .erc20-assets-name {
      //     color: $erc20-color-purple;
      //   }
      // }
      // &:nth-of-type(3) {
      //   .erc20-assets-name {
      //     color: $erc20-color-blue;
      //   }
      // }
  }
  .erc20-assets-logo {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-color: #fff;
    overflow: hidden;
    border: 1px solid transparent;
    box-sizing: border-box;
    @include bg-size();
    &.margin {
      margin-right: 10px;
    }
    &.download {
      width: 36px;
      height: 36px;
    }
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
    font-size: 14px;
    color: #bbb;
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
        background-image: linear-gradient(to left, rgba(21, 22, 24, 1), rgba(21, 22, 24, 0));
      }
      &::after {
        right: 0;
        border-left: 12px solid #bbb;
      }
      &.popup {
        &::before {
          right: 0;
          background-image: linear-gradient(to left, rgba(24, 24, 24, 1), rgba(24, 24, 24, 0));
        }
      }
    }
    &.left {
      left: 0;
      &::before {
        left: 0;
        background-image: linear-gradient(to right, rgba(21, 22, 24, 1), rgba(21, 22, 24, 0));
      }
      &::after {
        left: 0;
        border-right: 12px solid #bbb;
      }
      &.popup {
        &::before {
          right: 0;
          background-image: linear-gradient(to right, rgba(24, 24, 24, 1), rgba(24, 24, 24, 0));
        }
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
    margin-bottom: 20px;
    .popup-erc20-count {
      color: #DFEEFF;
    }
    &:nth-of-type(1) {
      .popup-erc20-count {
        color: $erc20-color-gold;
      }
    }
    &:nth-of-type(2) {
      .popup-erc20-count {
        color: $erc20-color-purple;
      }
    }
    &:nth-of-type(3) {
      .popup-erc20-count {
        color: $erc20-color-blue;
      }
    }
  }
  .popup-erc20-assets-logo {
    margin-right: 12px;
    width: 35px;
    height: 35px;
  }
  .popup-erc20-count {
    color: #fff;
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
    position: relative;
    width: 25%;
    z-index: 1;
    &:not(:last-of-type) {
      margin-right: 5px;
    }
  }
  .NFTs-asset-poster {
    position: relative;
    width: 58px;
    height: 58px;
    z-index: -1;
    @include bg-size();
    &.cryptokitties {
      background-size: 120%;
      background-position-x: 80%;
      >img {
        width: 150%;
      }
    }
    >img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
    }
  }
  .NFTs-asset-tokenId {
    margin-top: 5px;
    &.sm {
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
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

  // sir-breakdown-skeleton
  .sir-breakdown-skeleton {
    h2 {
      margin-bottom: 25px;
      width: 180px;
      height: 28px;
      background-color: $--skeleton-light;
      border-radius: 3px;
    }
  }
  .erc20-skeleton-container {
    p, li {
      background-color: $--skeleton-light;
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

  // download-erc20-assets
  .download-erc20-assets {
    // margin-top: 16px;
  }
  .download-erc20-item {
    margin-top: 16px;
    width: 20%;
    text-overflow: ellipsis;
  }
  .download-erc20-symbol {
    margin-top: 6px;
    // width: 56px;
    font-size: 16px;
    // text-overflow: ellipsis;
    // overflow: hidden;
  }

  // download-NFTs-assets
  .download-NFTs-assets {
    margin-top: 24px;
    margin-bottom: 20px;
    >p {
      font-size: 16px;
    }
  }
  .download-NFTs-item {
    padding: 2px;
    width: 25%;
    margin-top: 16px;
    box-sizing: border-box;
    .NFTs-asset-poster {
      margin-bottom: 3px;
      position: relative;
      padding-top: 100%;
      width: 100%;
      height: 0;
      >img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  // sir-NFTs-skeleton
  .sir-NFTs-skeleton {

  }
  .NFTs-skeleton-container {

  }
  .NFTs-skeleton-item {
    >p {
      margin-top: 42px;
      width: 160px;
      height: 16px;
      background-color: $--skeleton-light;
      border-radius: 3px;
    }
    >span {
      margin-top: 15px;
      >span {
        width: 80%;
        height: 12px;
        background-color: $--skeleton-light;
        border-radius: 2px;
      }
    }
    svg {
      width: 72px;
      height: 72px;
      fill: $--skeleton-light;
      border-radius: 3px;
    }
  }
</style>
