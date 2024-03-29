<template>
  <main id="sir-main" class="sir-main" :class="{ 'download': download }">
    <!-- <sir-loading :visible="!mainLoading"/> -->
    <sir-header
      :loading="mainLoading"
      :hide="download"
      @search="search"
      @download="preDownload = !preDownload"/>
    <transition name="sir-detail-fade" mode="out-in" @enter="toTop">
      <serach-loading
        key="lens-search-loading"
        v-if="mainLoading || (mainLoading && !txDatas.list.length && !erc20Datas.eth.txns)"
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
          @search="search"/>

        <breakdown
          :NFTDatas="NFTDatas"
          :erc20Datas="erc20Datas"
          :download="download"
          @search="search"/>

        <block-transactions
          v-if="!download"
          :txs="txDatas.list"
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

import { mapState, mapMutations } from 'vuex'

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

      // overviewLoading: true,
      overviewDatas: {
        info: {},
        txTimeline: {}
      },

      // NFTsLoading: true,
      NFTDatas: {
        NFTs: []
      },

      // erc20Loading: true,
      erc20Datas: {
        eth: {},
        list: []
      },

      // txLoading: true,
      txDatas: {
        list: []
      },

      // closestLoading: true,
      closestsData: {
        list: [],
        words: []
      },
      qrcodeLoaded: false,
      cloudLoaded: false,
      mainLoading: true
    }
  },
  computed: {
    ...mapState([
      'lensAssets'
    ]),

    loadingError () {
      return !this.mainLoading && !this.txDatas.list.length && !this.erc20Datas.eth.txns
    },
    download () {
      return !this.mainLoading && this.preDownload
    },
    downloadLoaded () {
      return this.download && this.qrcodeLoaded && this.cloudLoaded
    },
    closests () {
      return this.closestsData.list || []
    },
    closestWords () {
      return this.closestsData.words || []
    }
  },

  watch: {
    '$route' ({ params }) {
      this.address = params.address
    },
    mainLoading (val) {
      if (!val) {
        document.getElementById('app').scrollTop = 0
      }
    },
    downloadLoaded (val) {
      if (val) this.drawImage()
    },
    address (val) {
      if (val) {
        this.initOrigin({ address: val })
      }
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
    ...mapMutations([
      'setLensAssets'
    ]),

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
        img.className = 'lens-download-img vertical-bottom full-width'
        img.src = canvas.toDataURL('image/png', 1)

        this.$nextTick(() => {
          const donwloadBox = document.getElementById('popup-download-img')
          if (donwloadBox) {
            donwloadBox.firstChild && donwloadBox.removeChild(donwloadBox.firstChild)
            donwloadBox.appendChild(img)
          }
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

    setOriginDatas ({ NFTDatas, erc20Datas, txDatas, overviewDatas, closestsData } = {}) {
      this.NFTDatas = NFTDatas
      this.erc20Datas = erc20Datas
      this.txDatas = txDatas
      this.overviewDatas = overviewDatas
      this.closestsData = closestsData

      // 接口信息请求成功之后，修改 title 为 name || address
      if (overviewDatas.info) {
        document.title = `Blocklens - ${overviewDatas.info.name || this.address}`
      }
    },

    async initOrigin ({ address = this.address } = {}) {
      // 初始进入时，修改 title 为 address
      document.title = `Blocklens - ${address}`

      if (!this.checkInput(address)) return

      this.mainLoading = true

      if (this.lensAssets[address]) {
        this.setOriginDatas(this.lensAssets[address])
      } else {
        const [ NFTDatas, erc20Datas, txDatas, overviewDatas, closestsData ] = await Promise.all([
          this.getNFTs({ address }),
          this.getErc20({ address }),
          this.initTxDatas({ address }),
          this.getInfoById({ address }),
          this.getClosests({ address })
        ])

        const asset = {
          address,
          data: {
            overviewDatas,
            NFTDatas,
            erc20Datas,
            txDatas,
            closestsData
          }
        }

        this.setOriginDatas(asset.data)

        this.setLensAssets(asset)
      }

      this.$nextTick(() => {
        this.mainLoading = false
      })
    },

    async getInfoById ({ address = this.address } = {}) {
      // this.overviewLoading = true
      let data = {}
      try {
        const res = await getInfoById(address) || {}
        if (res.code === 1000 && res.data) {
          data = res.data

          const { info } = data
          info && this.setBlockSearch({ _id: info._id, name: info.name })
        }
      } catch (err) {
        console.warn('overview error', err)
      }
      // this.overviewDatas = data
      // this.overviewLoading = false
      return data
    },

    async getNFTs ({ address = this.address } = {}) {
      // this.NFTsLoading = true
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
      // this.NFTDatas = data
      // this.NFTsLoading = false
      return data
    },
    async getErc20 ({ address = this.address } = {}) {
      // this.erc20Loading = true
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
      // this.erc20Datas = data
      // this.erc20Loading = false
      return data
    },

    async getClosests ({ address = this.address }) {
      // this.closestLoading = true

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
      // this.closestsData = data
      // this.closestLoading = false
      return data
    },

    async initTxDatas ({ address = this.address } = {}) {
      // this.txLoading = true
      const txDatas = await this.getTxDatas({ address })
      // this.txDatas = txDatas
      // this.txLoading = false
      return txDatas
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
    }

    // async refreshTxDatas (cb) {
    //   const txDatas = await this.getTxDatas({ pn: 0 })
    //   // this.txDatas = txDatas
    //   cb()
    // },
    // async loadmoreTxDatas (cb, pn = this.txDatas.pn, ps = this.txDatas.ps) {
    //   pn = parseInt(pn) + 1

    //   const moreDatas = await this.getTxDatas({ pn, ps })
    //   if (!moreDatas || !moreDatas.list.length) return cb()
    //   const _list = this.txDatas.list
    //   this.$set(this, 'txDatas', {
    //     pn,
    //     ps,
    //     list: [].concat(_list, moreDatas.list)
    //   })
    //   cb()
    // }
  },

  async mounted () {
    const address = this.$route.params.address
    this.$nextTick(() => {
      this.address = address
      // this.initOrigin(address)
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
      // overflow: hidden;
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
