<template>
  <main class="sir-main">
    <sir-header
      @search="search"/>
    <overview
      :address="address"
      :loading="overviewLoading"
      :overviewDatas="overviewDatas"/>

    <breakdown
      :loading="nLoading || eLoading"
      :NFTDatas="NFTDatas"
      :erc20Datas="erc20Datas"/>

    <transactions
      :loading="tLoading"
      :txs="txDatas.list"
      @refresh="refreshTxDatas"
      @loadmore="loadmoreTxDatas"/>

    <sir-footer/>
  </main>
</template>

<script>
import SirHeader from '@/components/layout/Header.vue'
import SirFooter from '@/components/layout/Footer.vue'
import Overview from '@/components/Overview.vue'
import Breakdown from '@/components/Breakdown.vue'
import Transactions from '@/components/Transactions.vue'

import { getInfoById, getNFTs, getErc20, getTxs } from 'api'

export default {
  name: 'index',
  data: () => {
    return {
      loading: false,
      address: '0x533A99a1292C7ddB74621BF288F50fa34D42C79E',

      overviewLoading: false,
      overviewDatas: {},

      NFTsLoading: false,
      NFTDatas: {},

      erc20Loading: false,
      erc20Datas: {},

      txLoading: false,
      txDatas: {
        list: [],
        pn: 0,
        ps: 10
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
    }
  },
  components: {
    SirHeader,
    SirFooter,
    Overview,
    Breakdown,
    Transactions
  },

  methods: {

    search (address) {
      this.address = address
      this.init({ address })
    },

    async init ({ address = this.address } = {}) {
      this.getNFTs({ address })
      this.getErc20({ address })
      this.initTxDatas({ address })
      this.getInfoById({ address })
    },

    async getInfoById ({ address = this.address } = {}) {
      this.overviewLoading = true
      const res = await getInfoById(address)
      if (res.code === 1000) {
        this.overviewDatas = res.data || {}
      }
      this.overviewLoading = false
    },

    async getNFTs ({ address = this.address } = {}) {
      this.NFTsLoading = true
      const res = await getNFTs({ address })
      if (res.code === 1000) {
        this.NFTDatas = res.data
      }
      this.NFTsLoading = false
    },
    async getErc20 ({ address = this.address } = {}) {
      this.erc20Loading = true
      const res = await getErc20({ address })
      if (res.code === 1000) {
        this.erc20Datas = res.data
      }
      this.erc20Loading = false
    },
    async initTxDatas ({ address = this.address, pn = this.txDatas.pn, ps = this.txDatas.ps } = {}) {
      this.txLoading = true
      const txDatas = await this.getTxDatas({ address, pn, ps })

      this.txLoading = false

      if (!txDatas) return
      this.txDatas = txDatas
    },
    async getTxDatas ({ address = this.address, pn = this.txDatas.pn, ps = this.txDatas.ps } = {}) {
      const res = await getTxs({ address, pn, ps })
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
    this.init()
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
    padding: 60px 30px 0;
    max-width: 768px;
    min-height: 100%;
    background-color: #151618;
    @include viewport-unit(min-height, 100vh);
  }
</style>
