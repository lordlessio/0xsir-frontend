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
        v-if="!loadingDone || (!this.txDatas.list.length && !erc20Datas.eth.txns)"
        :address="address"
        :error="loadingError"/>
      <div v-else key="lens-content">
        <!-- <p v-show="download" class="sir-downlowe-powered">Powered by LORDLESS</p> -->
        <overview
          :download="download"
          :address="address"
          :overviewDatas="overviewDatas"
          :words="closestWords"
          :erc20Datas="erc20Datas"
          :NFTDatas="NFTDatas"
          :loaded.sync="cloudLoaded"/>

        <closest
          v-if="!download"
          :closests="closests"
          :loading="closestLoading"
          @search="search"/>

        <breakdown
          v-if="!download"
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

        <share-q-r v-if="download" :loaded.sync="qrcodeLoaded"/>
      </div>
    </transition>
    <sir-footer v-if="!download"/>
    <lens-download-popup
      ref="lensDownload"
      :visible="download"
      :loaded="drawloaded"
      @close="closeDownload"
      @closed="downloadClosed">
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
      address: '',

      drawloaded: false,
      // downloadLoaded: false,
      preDownload: false,

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
      },

      qrcodeLoaded: false,
      cloudLoaded: false
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
      return this.loadingDone && !this.txDatas.list.length && !this.erc20Datas.eth.txns
    },
    download () {
      return this.loadingDone && this.preDownload
    },
    downloadLoaded () {
      return this.download && this.qrcodeLoaded && this.cloudLoaded
    },
    closests () {
      return this.closestsData.list || []
    },
    closestWords () {
      return this.closestsData.words || []
    },
    address () {
      return this.$route.params.address
    }
  },

  watch: {
    '$route' ({ params }) {
      this.address = params.address
    },
    loadingDone (val) {
      if (val) document.getElementById('app').scrollTop = 0
    },
    downloadLoaded (val) {
      if (val) this.drawImage()
    },
    address (val) {
      if (val) this.init({ address: val })
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
      document.getElementById('app').scrollTop = 0
    },

    search ({ _id, name }) {
      if (!this.checkInput(_id)) return
      document.getElementById('app').scrollTop = 0
      this.setBlockSearch({ _id, name })
      this.$router.push(`/address/${_id}`)
    },

    async drawImage () {
      // if (!this.downloadLoaded) return
      Html2Canvas(document.getElementById('sir-main'), {
        useCORS: true,
        scale: window.devicePixelRatio + 1
      }).then((canvas) => {
        const img = document.createElement('img')
        img.className = 'lens-download-img full-width'
        img.src = canvas.toDataURL('image/png', 1)

        this.$nextTick(() => {
          document.getElementById('popup-download-img').appendChild(img)
          this.drawloaded = true
          this.qrcodeLoaded = false
        })
      })
    },

    closeDownload () {
      this.preDownload = false
    },
    downloadClosed () {
      this.drawloaded = false
    },

    async init ({ address = this.address } = {}) {
      if (!this.checkInput(address)) return

      this.getNFTs({ address })
      this.getErc20({ address })
      this.initTxDatas({ address })
      this.getInfoById({ address })
      this.getClosests({ address })
    },

    async getInfoById ({ address = this.address } = {}) {
      this.overviewLoading = true
      let data = {
        info: {},
        txTimeline: {}
      }
      try {
        const res = await getInfoById(address) || {}
        if (res.code === 1000 && res.data) {
          data = res.data
        }
      } catch (err) {
        console.warn('overview error', err)
      }
      this.overviewDatas = data
      this.overviewLoading = false
    },

    async getNFTs ({ address = this.address } = {}) {
      this.NFTsLoading = true
      let data = {
        NFTs: []
      }
      try {
        const res = await getNFTs({ address }) || {}
        if (res.code === 1000 && res.data) {
          data = res.data
        }
      } catch (err) {
        console.warn('nfts error', err)
      }
      this.NFTDatas = data
      this.NFTsLoading = false
    },
    async getErc20 ({ address = this.address } = {}) {
      this.erc20Loading = true
      let data = {
        eth: {},
        list: []
      }
      try {
        const res = await getErc20({ address }) || {}
        if (res.code === 1000 && res.data) {
          data = res.data
        }
      } catch (err) {
        console.warn('erc20 error', err)
      }
      this.erc20Datas = data
      this.erc20Loading = false
    },

    async getClosests ({ address = this.address }) {
      this.closestLoading = true

      let data = {
        list: [],
        words: []
      }
      try {
        const res = await getClosests({ address })

        if (res.code === 1000 && res.data) {
          data = res.data
        }
      } catch (err) {
        console.warn('closests error', err)
      }
      this.closestsData = data
      this.closestLoading = false
    },

    async initTxDatas ({ address = this.address } = {}) {
      this.txLoading = true
      const txDatas = await this.getTxDatas({ address })
      this.txDatas = txDatas
      this.txLoading = false
    },

    async getTxDatas ({ address = this.address } = {}) {
      let data = { list: [] }
      try {
        const res = await getTxs({ address }) || {}
        if (res.code === 1000 && res.data) {
          data = res.data
        }
      } catch (err) {
        console.warn('txs error', err)
      }

      return data
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
    this.$nextTick(() => {
      this.address = address
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
      min-height: initial;
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
