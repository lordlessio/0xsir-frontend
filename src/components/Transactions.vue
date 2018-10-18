<template>
  <section class="TTFontBold relative sir-transactions">
    <transition name="sir-skeletion-fade">
      <div v-if="loading" class="sir-txs-skeletion">
        <div class="txs-skeletion-container">
          <h2></h2>
          <ul class="d-flex flex-col txs-skeletion-senders">
            <li v-for="p of [1,2]" :key="p" class="skeletion-senders-item">
              <p></p>
              <div class="d-flex flex-row f-wrap">
                <span v-for="c of [1,2,3,4]" :key="c" class="i-block"></span>
              </div>
            </li>
          </ul>
          <ul class="txs-skeletion-recents">
            <li class="d-flex align-start recent-skeletion-item" v-for="item of [1,2,3]" :key="item">
              <span class="i-block">
                <svg>
                  <use xlink:href="#icon-alien"/>
                </svg>
              </span>
              <div class="v-flex">
                <p></p>
                <p></p>
                <p></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="sir-hide-fade">
      <div v-if="!loading">
        <h2 class="sir-title-block">Transactions</h2>
        <div class="tx-senders">
          <p class="tx-senders-title">Top senders (4)</p>
          <ul class="senders-ul">
            <li
              class="d-iflex align-center senders-item"
              v-for="(item, index) in senders" :key="index">
              {{ item.address }}
              <span>{{ item.total }}</span>
            </li>
          </ul>
        </div>
        <div class="tx-receivers">
          <p class="tx-senders-title">Top senders (4)</p>
          <ul class="senders-ul">
            <li
              class="d-iflex align-center senders-item"
              v-for="(item, index) in senders" :key="index">
              {{ item.address }}
              <span>{{ item.total }}</span>
            </li>
          </ul>
        </div>
        <div ref="sir-txs" class="TTFontBold relative recent-txs">
          <sir-popup
            :visible.sync="popupModel"
            :list="txs"
            :pullUpLoad="true"
            :title="`Recent transactions (6)`"
            @loadmore="$emit('loadmore', $event)"
            @refresh="$emit('refresh', $event)">
            <li
              class="relative d-flex justify-start recent-txs-item"
              :style="`transition-delay: ${(index + 1) * 0.05}s;`"
              v-for="(tx, index) of txs" :key="index">
              <span class="i-block recent-symbol-poster">
                <img v-lazy="`http://lordless.oss-cn-hongkong.aliyuncs.com/0xsir/source/erc20/${tx.contract}.png`"/>
              </span>
              <div class="v-flex TTFontMedium recent-item-cnt">
                <p class="TTFontBold name">
                  <span v-if="tx.fromName">{{ tx.fromName }}</span>
                  <span v-else>{{ tx.from | sliceStr }}...</span>
                </p>
                <p class="symbol">#{{ tx.tokenSymbol }}</p>
                <p class="text-nowrap date">{{ new Date(parseInt(tx.timeStamp) * 1000) | dateFormat }}</p>
              </div>
              <p class="recent-deal-num" :class="{ 'send': tx.send }">{{ tx.send ? '-' : '+' }}{{ tx.value | weiToEth | formatNumber }}</p>
            </li>
          </sir-popup>
          <div class="d-flex sir-section-toolbar recent-toolbar">
            <p>
              Recent transactions
            </p>
            <p class="v-flex d-flex align-center justify-end text-right" @click.stop="getMoreTx">
              <span class="line-height-0">
                <svg>
                  <use xlink:href="#icon-menu"/>
                </svg>
              </span>
              <span>More</span>
            </p>
          </div>
        </div>
        <ul class="recent-txs-list">
          <li
            class="relative d-flex justify-start recent-txs-item"
            v-for="(tx, index) of txAssets" :key="index">
            <span class="i-block recent-symbol-poster">
              <img v-lazy="`http://lordless.oss-cn-hongkong.aliyuncs.com/0xsir/source/erc20/${tx.contract}.png`"/>
            </span>
            <div class="v-flex TTFontMedium recent-item-cnt">
              <p class="TTFontBold name">
                <span v-if="tx.fromName">{{ tx.fromName }}</span>
                <span v-else>{{ tx.from | sliceStr }}...</span>
              </p>
              <p class="symbol">#{{ tx.tokenSymbol }}</p>
              <p class="text-nowrap date">{{ new Date(parseInt(tx.timeStamp) * 1000) | dateFormat }}</p>
            </div>
            <p class="recent-deal-num" :class="{ 'send': tx.send }">{{ tx.send ? '-' : '+' }}{{ tx.value | weiToEth | formatNumber }}</p>
          </li>
        </ul>
      </div>
    </transition>
  </section>
</template>

<script>
// import { addClass, removeClass, toggleClass } from 'utils'
export default {
  name: 'Transactions',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    txs: {
      type: Array,
      default: () => []
    }
  },
  data: () => {
    return {
      txAssets: [],
      popupModel: false,
      senders: [
        {
          address: '0xecae…',
          total: 100
        },
        {
          address: '0xecae…',
          total: 10
        },
        {
          address: '0xecae…',
          total: 90
        },
        {
          address: '0xecae…',
          total: 199
        }
      ],
      recents: [
        {
          name: 'Binance',
          symbol: 'LESS',
          type: 'receive',
          num: 10,
          date: 'Aug. 27 2016 12:00:00'
        }, {
          name: 'Bitmax',
          symbol: 'LOOM',
          type: 'receive',
          num: 99,
          date: 'Aug. 27 2016 12:00:00'
        }, {
          name: '0xecae95…',
          symbol: 'ZRX',
          type: 'send',
          num: 10,
          date: 'Aug. 27 2016 12:00:00'
        }, {
          name: '0xecae95…',
          symbol: 'ZRX',
          type: 'send',
          num: 10,
          date: 'Aug. 27 2016 12:00:00'
        }, {
          name: 'Binance',
          symbol: 'IOST',
          type: 'receive',
          num: 10,
          date: 'Aug. 27 2016 12:00:00'
        }
      ]
    }
  },
  watch: {
    txs (list) {
      if (list) {
        this.txAssets = list.slice(0, 5)
      }
    }
  },
  methods: {
    getMoreTx () {
      this.popupModel = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .sir-transactions {
    padding-top: 35px;
    padding-bottom: 60px;
    color: #fff;
    h2 {
      font-size: 24px;
    }
  }

  .tx-senders {
    margin-top: 30px;
  }
  .tx-senders-title {
    margin-bottom: 10px;
  }
  .senders-ul {

  }
  .senders-item {
    margin-top: 5px;
    margin-right: 6px;
    padding: 5px 8px;
    font-size: 16px;
    background-color: #7D72F0;
    border-radius: 5px;
    >span {
      margin-left: 5px;
      font-family: $--font-TTNormsMedium;
      font-size: 14px;
      color: #BDB9FD;
    }
  }

  .tx-receivers {
    margin-top: 40px;
  }

  .recent-toolbar {
    margin-top: 40px;
  }

  // recent-txs
  .recent-txs {

  }

  .recent-txs-list {
    margin-top: 15px;
  }
  .recent-txs-item {
    &:not(:first-of-type) {
      margin-top: 20px;
    }
  }
  .recent-symbol-poster {
    width: 42px;
    height: 42px;
    border-radius: 100%;
    background-color: #fff;
    overflow: hidden;
    >img {
      width: 100%;
    }
  }
  .recent-item-cnt {
    margin-left: 19px;
    >p {
      &.name {
        font-size: 16px;
      }
      &.symbol {
        margin-top: 2px;
        font-size: 12px;
        color: #ddd;
      }
      &.date {
        margin-top: 5px;
        font-size: 14px;
        color: #777;
      }
    }
  }
  .recent-deal-num {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 20px;
    color: #69D1C3;
    &.send {
      color: #EB8785;
    }
  }

  // sir-txs-skeletion
  .sir-txs-skeletion {
    // margin-top: 15px;
    h2 {
      width: 160px;
      height: 26px;
      background-color: $--skeletion-light;
      border-radius: 3px;
    }
  }
  .txs-skeletion-senders {

  }
  .skeletion-senders-item {
    &:first-of-type {
      margin-top: 30px;
    }
    &:not(:first-of-type) {
      margin-top: 40px;
    }
    p, span {
      background-color: $--skeletion-light;
    }
    >p {
      margin-bottom: 10px;
      width: 140px;
      height: 18px;
      border-radius: 3px;
    }
    span {
      margin-top: 5px;
      margin-right: 6px;
      height: 26px;
      border-radius: 3px;
      &:nth-of-type(1) {
        width: 160px;
      }
      &:nth-of-type(2) {
        width: 130px;
      }
      &:nth-of-type(3) {
        width: 120px;
      }
      &:nth-of-type(4) {
        width: 140px;
      }
    }
  }

  .txs-skeletion-recents {
    margin-top: 30px;
  }
  .recent-skeletion-item {
    &:not(:first-of-type) {
      margin-top: 20px;
    }
    >span {

    }
    svg {
      width: 50px;
      height: 50px;
      fill: $--skeletion-light;
    }
    >div {
      margin-left: 15px;
      >p {
        border-radius: 3px;
        background-color: $--skeletion-light;
        &:nth-of-type(1) {
          width: 140px;
          height: 16px;
        }
        &:nth-of-type(2) {
          margin-top: 3px;
          width: 80px;
          height: 12px;
        }
        &:nth-of-type(3) {
          margin-top: 5px;
          width: 200px;
          height: 14px;
        }
      }
    }
  }
</style>
