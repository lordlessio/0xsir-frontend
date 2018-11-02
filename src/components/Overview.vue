<template>
  <section class="text-center relative sir-overview" :class="{ 'info': !unInfo }">
    <!-- <transition name="sir-hide-fade" mode="out-in"> -->
      <!-- <div v-if="loading" class="overview-skeleton" key="overview-skeleton">
        <div class="overview-skeleton-container skeleton-animate">
          <h2></h2>
          <p class="overview-skeleton-cloudy">
            <svg class="i-block">
              <use xlink:href="#icon-cloudy"/>
            </svg>
          </p>
          <ul>
            <li v-for="item of [1,2]" :key="item" class="overview-skeleton-li">
              <p></p>
              <p></p>
            </li>
          </ul>
        </div>
      </div> -->
      <!-- <div v-else key="overview-content"> -->
        <div class="overview-header">
          <div v-if="unInfo" class="relative index-1">
            <sir-blockies class="overview-blockies" :seed="address"/>
            <h1 @click.stop="isFullAddress = !isFullAddress">
              <span v-if="!isFullAddress" class="sir-title-block bottom lg">{{ address | sliceStr({ end: 11 }) }}...</span>
              <span v-else class="TTFontMedium i-block text-left sir-full-address">{{ address }}</span>
            </h1>
          </div>
          <div v-else class="overview-contract-header">
            <div class="d-flex overview-contract-title">
              <span v-if="overviewDatas.info.logo" class="i-block overview-logo">
                <img :src="overviewDatas.info.logo"/>
              </span>
              <div class="text-left relative index-1 overview-contract-info" :class="{ 'no-logo': !overviewDatas.info.logo }">
                <sir-blockies v-if="!overviewDatas.info.logo" class="overview-blockies" :seed="address"/>
                <h1 class="text-ellipsis" :style="overviewDatas.info.name.length > 16 ? 'font-size: 24px' : ''">{{ overviewDatas.info.name }}</h1>
                <p v-if="overviewDatas.info.website" class="overview-contract-website">
                  <a :href="overviewDatas.info.website" target="_blank">{{ overviewDatas.info.website }}</a>
                </p>
                <p v-if="!overviewDatas.info.logo" class="text-left text-break overview-contract-address">{{ address }}</p>
              </div>
            </div>
            <p v-if="overviewDatas.info.logo" class="text-left text-break overview-contract-address outside">{{ address }}</p>
            <p v-if="overviewDatas.info.desc" class="text-left text-break overview-contract-desc">{{ overviewDatas.info.desc.zh }}</p>
            <ul v-if="overviewDatas.info.socialLinks && overviewDatas.info.socialLinks.length" class="d-flex flex-row overview-contract-links">
              <li v-if="filterSocialIcon(social.link)" v-for="social of overviewDatas.info.socialLinks" :key="social._id">
                <svg class="overview-social-svg">
                  <use :xlink:href="social.link | filterSocialIcon"/>
                </svg>
              </li>
            </ul>
            <ul v-if="overviewDatas.info.cat.length" class="d-flex flex-row overview-contract-cats">
              <li v-for="(cat, index) of overviewDatas.info.cat" :key="index">
                {{ cat }}
              </li>
            </ul>
          </div>
        </div>
        <div v-if="words.length" class="overview-address-cloud">
          <p v-if="!unInfo" class="overview-markline overview-cloud-markline"></p>
          <!-- <img src="/static/wordcloud.svg"/> -->
          <div id="overview-word-cloud" class="overview-word-cloud"></div>
          <p class="overview-cloud-title">Address profile cloud</p>
        </div>
        <p v-if="unInfo" class="overview-markline"></p>
        <ul class="d-flex align-center overview-tx-ul overview-tx-timeline">
          <li class="v-flex">
            <p class="overview-text">{{ new Date(parseInt(overviewDatas.txTimeline.first.timeStamp) * 1000) | dateFormat }}</p>
            <p>Birthday</p>
          </li>
          <li class="v-flex">
            <p class="overview-text">{{ new Date(parseInt(overviewDatas.txTimeline.last.timeStamp) * 1000) | dateFormat }}</p>
            <p>Latest transaction</p>
          </li>
        </ul>
        <ul class="d-flex align-center overview-tx-ul overview-tx-count">
          <!-- <li class="v-flex">
            <p class="overview-text">Ξ {{ overviewDatas.txTimeline.max.data.tx.value | weiToEth | formatNumber }}</p>
            <p>Max transaction</p>
          </li> -->
          <li class="v-flex">
            <p class="overview-text">{{ erc20Datas.eth.txns }}</p>
            <p>Transactions</p>
          </li>
        </ul>
      <!-- </div> -->
    <!-- </transition> -->
  </section>
</template>

<script>
import * as d3 from 'd3'
import Cloud from 'd3-cloud'
import { filterSocialIcon } from 'utils'
export default {
  name: 'sir-overview',
  props: {
    address: {
      type: String,
      default: '0x533A99a1292C7ddB74621BF288F50fa34D42C79E'
    },
    loading: {
      type: Boolean,
      default: true
    },
    overviewDatas: {
      type: Object,
      default: () => {
        return {
          info: {},
          txTimeline: {}
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
    },
    words: {
      type: Array,
      default: () => []
    }
  },
  data: () => {
    return {
      isFullAddress: false
    }
  },
  computed: {
    unInfo () {
      return !this.overviewDatas.info || !this.overviewDatas.info._id
    }
  },
  methods: {
    filterSocialIcon () {
      return filterSocialIcon(...arguments)
    },
    // sizeFunc (list) {
    //   const _list = []

    // },
    drawCloud (words = this.words) {
      const dom = document.getElementById('overview-word-cloud')
      if (!dom) return
      const { width, height } = document.getElementById('overview-word-cloud').getBoundingClientRect()

      const log = 0.25
      const max = Math.pow(words[0].count, log)
      const layout = Cloud()
        .size([width, height])
        .words(
          words.map(function (d) {
            let _size = Math.pow(d.count, log)
            _size = 40 * _size / max
            _size = _size < 16 ? 16 : _size

            _size = _size > 450 / d.name.length ? 450 / d.name.length : _size

            console.log('====', d.name.length, _size)

            return { text: d.name, size: _size }
          })
        )
        .random(function () {
          return 0.5
        })
        .padding(0)
        .rotate(function () {
          // return words.length > 15 ? ~~(Math.random() * 2) * 35 : 0
          return ~~(Math.random() * 2) * 35
        })
        .font('Impact')
        .fontSize(function (d) {
          return d.size
        })
        .on('end', draw)

      layout.start()

      function draw (words) {
        // var fill = d3.scale.category20();
        // var fill = d3.schemeCategory10
        // var color = d3.scaleOrdinal("1231");
        // console.log(color);
        d3.select('#overview-word-cloud')
          .append('svg')
          .attr('width', layout.size()[0])
          .attr('height', layout.size()[1])
          .append('g')
        // .style("fill", function(d) {
        //   return fill(d.text.toLowerCase());
        // })
          .attr(
            'transform',
            'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')'
          )
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', function (d) {
            return d.size + 'px'
          })
          // .style('fill', function (d) {
          //   return 'red'
          // })
          .style('fill', function (t) {
            console.log('==== fill', t)
            return `rgba(125, 114, 240, ${t.size / 30})`
          })
          .style('font-family', 'Impact')
          .attr('text-anchor', 'middle')
          .attr('transform', function (d) {
            return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
          })
          .text(function (d) {
            return d.text
          })
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.drawCloud()
    })
  }
}
</script>

<style lang="scss" scoped>
  .sir-overview {
    padding-bottom: 40px;
    color: #BDB9FD;
    &.info {
      .overview-header {
        padding-bottom: 30px;
      }
    }
  }
  .overview-header {
    padding-top: 70px;
    padding-bottom: 60px;
    h1 {
      font-size: 36px;
    }
  }

  .overview-contract-header {
    // padding-bottom: 36px;
  }
  .overview-contract-title {
    color: #bbb;
    h1 {
      margin-bottom: 3px;
      font-size: 36px;
      color: #fff;
    }
    >span {
      height: 50px;
    }
    img {
      height: 100%;
    }
  }
  .overview-contract-links {
    // margin-bottom: 30px;
    margin-top: 12px;
  }
  .overview-social-svg {
    margin-right: 16px;
    width: 18px;
    height: 18px;
    fill: #ddd;
  }
  .overview-contract-cats {
    margin-top: 25px;
    color: #fff;
    >li {
      padding: 5px 8px;
      font-size: 12px;
      border-radius: 5px;
      background-color: #7D72F0;
      &:not(:first-of-type) {
        margin-left: 6px;
      }
    }
  }
  .overview-contract-markline {
    margin-top: 30px;
  }

  .overview-logo {
    margin-right: 12px;
  }
  .overview-contract-info {
    max-width: 100%;
    font-size: 14px;
    box-sizing: border-box;
    &.no-logo {
      padding-left: 16px;
    }
  }
  .overview-contract-website {
    a {
      color: inherit;
    }
  }
  .overview-contract-address, .overview-contract-desc {
    margin-top: 6px;
    font-size: 12px;
    color: #ddd;
    &.outside {
      margin-top: 10px;
    }
  }
  .overview-contract-desc {
    margin-top: 10px;
  }

  .sir-full-address {
    padding-left: 20px;
    font-size: 16px;
    word-break: break-all;
    box-sizing: border-box;
  }
  .overview-blockies {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateX(10%) translateY(-50%) rotate(45deg);
    z-index: -1;
  }
  .overview-tx-ul {
    font-size: 16px;
    color: #BDB9FD;
  }
  .overview-text {
    font-family: $--font-TTNormsBold;
    font-size: 20px;
    color: #fff;
  }
  .overview-address-cloud {
    margin-bottom: 42px;
    >img {
      box-shadow: 0 0 20px 3px #7D72F0;
    }
  }
  .overview-cloud-title {
    margin-top: 18px;
  }
  .overview-cloud-markline {
    margin-bottom: 42px;
  }
  .overview-word-cloud {
    width: 100%;
    height: 200px;
    box-shadow: 0 0 20px 3px #7D72F0;
  }
  .overview-tx-timeline {
    margin-top: 42px;
    .overview-text {
      margin-bottom: 4px;
    }
  }
  .overview-tx-count {
    margin-top: 35px;
    .overview-text {
      margin-bottom: 8px;
    }
  }

  // overview-skeleton
  // .overview-skeleton-container {
  //   padding-top: 45px;
  //   >h2 {
  //     width: 80%;
  //     height: 30px;
  //     background-color: $--skeleton-light;
  //     border-radius: 3px;
  //   }
  // }
  // .overview-skeleton-cloudy {
  //   margin-top: 35px;
  //   padding: 50px 0;
  //   width: 100%;
  //   background-color: rgba(225, 223, 252, .5);
  //   border-radius: 3px;
  //   >svg {
  //     width: 80px;
  //     height: 80px;
  //     fill: $--skeleton-light;
  //   }
  // }
  // .overview-skeleton-li {
  //   margin-top: 30px;
  //   >p {
  //     height: 18px;
  //     background-color: $--skeleton-light;
  //     border-radius: 3px;
  //     &:nth-of-type(1) {
  //       width: 55%;
  //     }
  //     &:nth-of-type(2) {
  //       margin-top: 10px;
  //       width: 90%;
  //     }
  //   }
  // }
</style>
