<template>
  <main id="sir-main" class="sir-main">
    <sir-loading :visible="!loadingDone"/>
    <p v-show="download" class="sir-downlowe-powered">Powered by LORDLESS</p>
    <sir-header
      @search="search"
      @download="preDownload = !preDownload"/>
    <overview
      :address="address"
      :loading="overviewLoading"
      :overviewDatas="overviewDatas"/>

    <breakdown
      :download="download"
      :loading="nLoading || eLoading"
      :NFTDatas="NFTDatas"
      :erc20Datas="erc20Datas"/>

    <closest
      :closests="closests"
      :loading="closestLoading"
      @search="search"/>

    <transactions
      v-if="!download"
      :loading="tLoading"
      :txs="txDatas.list"
      @refresh="refreshTxDatas"
      @loadmore="loadmoreTxDatas"/>

    <share-q-r v-if="download"/>

    <sir-footer v-if="!download"/>
  </main>
</template>

<script>
import SirHeader from '@/components/layout/Header.vue'
import SirFooter from '@/components/layout/Footer.vue'
import Overview from '@/components/Overview.vue'
import Breakdown from '@/components/Breakdown.vue'
import Transactions from '@/components/Transactions.vue'
import Closest from '@/components/Closest.vue'
import ShareQR from '@/components/ShareQR.vue'

import { getInfoById, getNFTs, getErc20, getTxs, getClosests } from 'api'

import Html2Canvas from 'html2canvas'
// import Canvas2Img from 'utils/canvas2Img'
// import SaveAs from 'file-saver'

export default {
  name: 'address-detail',
  data: () => {
    return {
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
        list: [],
        pn: 0,
        ps: 10
      },

      closestLoading: true,
      closests: []
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
      // const done = this.eLoading && this.nLoading && this.tLoading
      return !(this.eLoading || this.nLoading || this.tLoading || this.closestLoading)
    },
    download () {
      return this.loadingDone && this.preDownload
    }
  },

  watch: {
    download (val) {
      if (val) this.convert2Img()
    }
  },
  components: {
    SirHeader,
    SirFooter,
    Overview,
    Breakdown,
    Transactions,
    Closest,
    ShareQR
  },

  methods: {

    search (address) {
      document.documentElement.scrollTop = 0
      this.address = address
      this.init({ address })
      window.history.pushState(null, null, `/address/${address}`)
    },

    saveFile (data, filename) {
      const saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
      saveLink.href = data
      saveLink.download = filename

      const event = document.createEvent('MouseEvents')
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      saveLink.dispatchEvent(event)
    },

    convert2Img () {
      setTimeout(() => {
        Html2Canvas(document.getElementById('sir-main'), {
          useCORS: true,
          scale: window.devicePixelRatio + 1
        }).then((canvas) => {
          const img = document.createElement('img')
          img.className = 'sir-download-img full-width'
          img.src = canvas.toDataURL('image/png', 1)
          // console.log('canvas', canvas, canvas.toDataURL())

          document.body.appendChild(img)
        // this.saveFile(canvas.toDataURL(), 'user-test.png')
        // canvas.toBlob((blob) => {
        // SaveAs(canvas.toDataURL('image/png', 1), 'user.png')
        // })
        })
      }, 1000)
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
          this.closests = res.data
        }
        this.closestLoading = false
      } catch (err) {
        this.closestLoading = false
      }
    },

    async initTxDatas ({ address = this.address, pn = 0, ps = this.txDatas.ps } = {}) {
      this.txLoading = true
      try {
        const txDatas = await this.getTxDatas({ address, pn, ps })
        this.txLoading = false

        if (!txDatas) return
        this.txDatas = txDatas
      } catch (err) {
        this.txLoading = false
      }
    },

    async getTxDatas ({ address = this.address, pn = this.txDatas.pn, ps = this.txDatas.ps } = {}) {
      const res = await getTxs({ address, pn, ps }) || {}
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
    @include viewport-unit(min-height, 100vh);
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
