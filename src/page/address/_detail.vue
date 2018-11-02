<template>
  <main id="sir-main" class="sir-main" :class="{ 'download': download }">
    <!-- <sir-loading :visible="!loadingDone"/> -->
    <sir-header
      :loading="!loadingDone"
      :hide="download"
      @search="search"
      @download="preDownload = !preDownload"/>
    <transition name="sir-detail-fade" mode="out-in" @enter="toTop">
      <serach-loading
        key="lens-search-loading"
        v-if="!loadingDone || !erc20Datas.eth.txns"
        :address="address"
        :error="loadingError"/>
      <div v-else key="lens-content">
        <!-- <p v-show="download" class="sir-downlowe-powered">Powered by LORDLESS</p> -->
        <overview
          :download="download"
          :address="address"
          :overviewDatas="overviewDatas"
          :words="closestWords"
          :erc20Datas="erc20Datas"/>

        <closest
          v-if="!download"
          :closests="closests"
          :loading="closestLoading"
          @search="search"/>

        <breakdown
          :download="download"
          :loading="nLoading || eLoading"
          :NFTDatas="NFTDatas"
          :erc20Datas="erc20Datas"
          @search="search"/>

        <block-transactions
          v-if="!download"
          :loading="tLoading"
          :txs="txDatas.list"
          @refresh="refreshTxDatas"
          @loadmore="loadmoreTxDatas"
          @search="search"/>

        <share-q-r v-if="download"/>
      </div>
    </transition>
    <sir-footer v-if="!download"/>
    <lens-download-popup
      ref="lensDownload"
      :visible="download"
      :loaded="downloadLoaded"
      @close="closeDownload"
      @closed="downloadClosed"
      @opened="drawImage">
      <div id="popup-download-img"></div>
    </lens-download-popup>
  </main>
</template>

<script>
import SirHeader from '@/components/layout/Header.vue'
import SirFooter from '@/components/layout/Footer.vue'
import Overview from '@/components/Overview.vue'
import Breakdown from '@/components/Breakdown.vue'
import BlockTransactions from '@/components/Transactions.vue'
import Closest from '@/components/Closest.vue'
import ShareQR from '@/components/ShareQR.vue'
import SerachLoading from '@/components/SearchLoading.vue'

import SearchMixin from '@/mixins/search'

import { getInfoById, getNFTs, getErc20, getTxs, getClosests } from 'api'

import Html2Canvas from 'html2canvas'

// window.Html2Canvas = Html2Canvas
// import Canvas2Img from 'utils/canvas2Img'
// import SaveAs from 'file-saver'

export default {
  name: 'address-detail',
  mixins: [SearchMixin],
  data: () => {
    return {
      downloadLoaded: false,
      preDownload: false,
      // address: '0x533A99a1292C7ddB74621BF288F50fa34D42C79E',
      address: '',

      overviewLoading: true,
      overviewDatas: {
        info: {},
        txTimeline: {}
      },

      NFTsLoading: true,
      NFTDatas: {
        NFTs: []
      },

      erc20Loading: true,
      erc20Datas: {
        eth: {},
        list: []
      },

      txLoading: true,
      txDatas: {
        list: []
      },

      closestLoading: true,
      closestsData: {
        list: [],
        words: []
      }
    }
  },
  computed: {
    eLoading () {
      return this.overviewLoading || this.erc20Loading
    },
    nLoading () {
      return this.e2Loading || this.NFTsLoading
    },
    tLoading () {
      return this.nLoading || this.txLoading
    },
    loadingDone () {
      return !(this.eLoading || this.nLoading || this.tLoading || this.closestLoading)
    },
    loadingError () {
      return this.loadingDone && !this.erc20Datas.eth.txns
    },
    download () {
      return this.loadingDone && this.preDownload
    },
    closests () {
      return this.closestsData.list || []
    },
    closestWords () {
      return this.closestsData.words || []
    }
  },

  watch: {
    loadingDone (val) {
      if (val) document.documentElement.scrollTop = 0
    }
  },
  components: {
    SirHeader,
    SirFooter,
    Overview,
    Breakdown,
    BlockTransactions,
    Closest,
    ShareQR,
    SerachLoading
  },

  methods: {
    toTop () {
      document.documentElement.scrollTop = 0
    },

    search ({ _id, name }) {
      if (!this.checkInput(_id)) return
      document.documentElement.scrollTop = 0
      this.address = _id
      this.init({ address: _id })
      this.setBlockSearch({ _id, name })
      window.history.pushState(null, null, `/address/${_id}`)
    },

    saveFile (data, filename) {
      const saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
      saveLink.href = data
      saveLink.download = filename

      const event = document.createEvent('MouseEvents')
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      saveLink.dispatchEvent(event)
    },

    async drawImage () {
      setTimeout(() => {
        Html2Canvas(document.getElementById('sir-main'), {
          allowTaint: true,
          useCORS: true,
          scale: window.devicePixelRatio + 1
        }).then((canvas) => {
          const img = document.createElement('img')
          img.className = 'sir-download-img full-width'
          img.src = canvas.toDataURL('image/png', 1)
          this.downloadLoaded = true
          // console.log('canvas', canvas, canvas.toDataURL())

          this.$nextTick(() => document.getElementById('popup-download-img').appendChild(img))
        })
      }, 1000)
    },

    closeDownload () {
      this.preDownload = false
    },
    downloadClosed () {
      this.downloadLoaded = false
    },

    async init ({ address = this.address } = {}) {
      this.getNFTs({ address })
      this.getErc20({ address })
      this.initTxDatas({ address })
      this.getInfoById({ address })
      this.getClosests({ address })
    },

    async getInfoById ({ address = this.address } = {}) {
      this.overviewLoading = true
      let res
      try {
        res = await getInfoById(address) || {}
        if (res.code === 1000) {
          this.overviewDatas = res.data || this.overviewDatas
        }
        this.overviewLoading = false
        console.log('overviewLoading', this.overviewLoading, res.data)
      } catch (err) {
        this.overviewLoading = false
      }
    },

    async getNFTs ({ address = this.address } = {}) {
      this.NFTsLoading = true
      let res
      try {
        res = await getNFTs({ address }) || {}
        if (res.code === 1000 && res.data) {
          this.NFTDatas = res.data
        }
        this.NFTsLoading = false
      } catch (err) {
        this.NFTsLoading = false
      }
    },
    async getErc20 ({ address = this.address } = {}) {
      this.erc20Loading = true
      let res
      try {
        res = await getErc20({ address }) || {}
        if (res.code === 1000 && res.data) {
          this.erc20Datas = res.data
        }
        this.erc20Loading = false
      } catch (err) {
        this.erc20Loading = false
      }
    },

    async getClosests ({ address = this.address }) {
      this.closestLoading = true
      try {
        const res = await getClosests({ address })

        if (res.code === 1000 && res.data) {
          this.closestsData = res.data
        }
        this.closestLoading = false
      } catch (err) {
        this.closestLoading = false
      }
    },

    async initTxDatas ({ address = this.address } = {}) {
      this.txLoading = true
      try {
        const txDatas = await this.getTxDatas({ address })
        this.txLoading = false
        console.log('txDatas', txDatas)
        if (!txDatas) return
        this.txDatas = txDatas
      } catch (err) {
        this.txLoading = false
      }
    },

    async getTxDatas ({ address = this.address } = {}) {
      const res = await getTxs({ address }) || {}
      if (res.code === 1000) {
        return res.data
      }
      return null
    },

    async refreshTxDatas (cb) {
      const txDatas = await this.getTxDatas({ pn: 0 })
      this.txDatas = txDatas
      cb()
    },
    async loadmoreTxDatas (cb, pn = this.txDatas.pn, ps = this.txDatas.ps) {
      pn = parseInt(pn) + 1

      const moreDatas = await this.getTxDatas({ pn, ps })
      if (!moreDatas || !moreDatas.list.length) return cb()
      const _list = this.txDatas.list
      this.$set(this, 'txDatas', {
        pn,
        ps,
        list: [].concat(_list, moreDatas.list)
      })
      cb()
    }
  },

  async mounted () {
    const address = this.$route.params.address
    this.address = address
    this.$nextTick(() => {
      this.init(address)
    })
    // this.$createHelloWorld({
    //   msg: 'Welcome to 0xsir',
    //   onClick: () => {
    //     this.$createActionSheet({
    //       title: 'I am ActionSheet',
    //       pickerStyle: true,
    //       data: [
    //         {
    //           content: '<span>我是h1</span>',
    //           class: 'test'
    //         },
    //         {
    //           content: '<span>上海市</span>'
    //         }
    //       ],
    //       onSelect: (item, index) => {
    //         console.log('item', item, index)
    //       }
    //     }).show()
    //   }
    // })
  }
}
</script>

<style lang="scss" scoped>
  .sir-main {
    margin: 0 auto;
    padding: 45px 35px 0;
    max-width: 768px;
    min-height: 100%;
    background-color: #151618;
    background-image: url(~/static/header-bg.jpg);
    background-size: 100% auto;
    background-repeat: no-repeat;
    @include viewport-unit(min-height, 100vh);
    &.download {
      width: 375px;
      padding-top: 30px;
      box-sizing: border-box;
    }
  }
  .sir-downlowe-powered {
    position: absolute;
    text-indent: 35px;
    top: 30px;
    left: 0;
    width: 100%;
    font-size: 16px;
    color: #fff;
  }
</style>
