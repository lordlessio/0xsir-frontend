<template>
  <section class="text-center relative sir-overview" :class="{ 'info': !unInfo, 'download': download }">
    <div v-show="!download">
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
            <!-- <span v-if="overviewDatas.info.logo" class="i-block overview-logo">
              <img :src="overviewDatas.info.logo"/>
            </span> -->
            <div class="text-left relative index-1 overview-contract-info no-logo">
              <sir-blockies class="overview-blockies" :seed="address"/>
              <h1 class="text-ellipsis" :style="overviewDatas.info.name.length > 16 ? 'font-size: 24px' : ''">{{ overviewDatas.info.name }}</h1>
              <!-- <p v-if="overviewDatas.info.website" class="overview-contract-website">
                <a :href="overviewDatas.info.website" target="_blank">{{ overviewDatas.info.website }}</a>
              </p> -->
              <p class="text-left text-break overview-contract-address">{{ address }}</p>
            </div>
          </div>
          <!-- <p v-if="overviewDatas.info.logo" class="text-left text-break overview-contract-address outside">{{ address }}</p>
          <p v-if="overviewDatas.info.desc" class="text-left text-break overview-contract-desc">{{ overviewDatas.info.desc.zh }}</p> -->
          <!-- <ul v-if="overviewDatas.info.socialLinks && overviewDatas.info.socialLinks.length" class="d-flex flex-row overview-contract-links">
            <li v-if="filterSocialIcon(social.link)" v-for="social of overviewDatas.info.socialLinks" :key="social._id">
              <svg class="overview-social-svg">
                <use :xlink:href="social.link | filterSocialIcon"/>
              </svg>
            </li>
          </ul> -->
          <ul v-if="overviewDatas.info.cat.length" class="d-flex flex-row overview-contract-cats">
            <li v-for="(cat, index) of overviewDatas.info.cat" :key="index">
              {{ cat }}
            </li>
          </ul>
        </div>
      </div>
      <p v-if="!unInfo" class="overview-markline overview-tx-markline"></p>
    </div>
    <div v-show="download" class="text-left overview-download-header">
      <p class="TTFontBlack v-flex d-flex align-center text-uppper lens-header-logo" @click.stop="$router.push('/')">
        <img class="image-logo" src="/static/lens-logo-image.svg"/>
        <img class="text-logo" src="/static/lens-logo-text.svg"/>
        <!-- <svg class="image-logo">
          <use xlink:href="#blocklens-gradient-logo"/>
        </svg>
        <svg width="90" height="16" class="text-logo" viewBox="0 0 168 32">
          <path fill="#BDB9FD" d="M0 0.635h7.85c2.48 0 4.358 0.193 5.635 0.579s2.308 1.168 3.093 2.346c0.785 1.178 1.177 3.075 1.177 5.691 0 1.769-0.277 3.003-0.832 3.701s-1.648 1.234-3.28 1.607c1.819 0.411 3.053 1.093 3.701 2.047s0.972 2.414 0.972 4.383v2.804c0 2.043-0.234 3.557-0.701 4.542s-1.212 1.657-2.233 2.019c-1.022 0.361-3.115 0.542-6.28 0.542h-9.102v-30.259zM7.869 5.813v6.728c0.336-0.012 0.598-0.019 0.785-0.019 0.773 0 1.265-0.19 1.477-0.57s0.318-1.467 0.318-3.261c0-0.947-0.087-1.61-0.262-1.99s-0.402-0.62-0.682-0.72c-0.28-0.1-0.825-0.156-1.635-0.168zM7.869 17.251v8.467c1.109-0.037 1.816-0.212 2.121-0.523s0.458-1.078 0.458-2.299v-2.822c0-1.296-0.137-2.081-0.411-2.355s-0.997-0.43-2.168-0.467zM29.007 0.635v24.204h4.785v6.056h-12.653v-30.259h7.869zM53.678 18.354c0 3.040-0.072 5.193-0.215 6.457s-0.592 2.42-1.346 3.467c-0.754 1.047-1.772 1.85-3.056 2.411s-2.779 0.841-4.486 0.841c-1.62 0-3.075-0.265-4.364-0.794s-2.327-1.324-3.112-2.383c-0.785-1.059-1.252-2.212-1.402-3.458s-0.224-3.427-0.224-6.542v-5.177c0-3.040 0.072-5.193 0.215-6.457s0.592-2.42 1.346-3.467c0.754-1.047 1.772-1.85 3.056-2.411s2.779-0.841 4.486-0.841c1.62 0 3.075 0.265 4.364 0.794s2.327 1.324 3.112 2.383c0.785 1.059 1.252 2.212 1.402 3.458s0.224 3.427 0.224 6.542v5.177zM45.81 8.411c0-1.408-0.078-2.308-0.234-2.701s-0.477-0.589-0.963-0.589c-0.411 0-0.726 0.159-0.944 0.477s-0.327 1.255-0.327 2.813v14.13c0 1.757 0.072 2.841 0.215 3.252s0.477 0.617 1 0.617c0.536 0 0.878-0.237 1.028-0.71s0.224-1.601 0.224-3.383v-13.905zM74.985 13.831h-7.869v-5.271c0-1.533-0.084-2.489-0.252-2.869s-0.539-0.57-1.112-0.57c-0.648 0-1.059 0.231-1.234 0.692s-0.262 1.458-0.262 2.99v14.055c0 1.47 0.087 2.43 0.262 2.878s0.567 0.673 1.177 0.673c0.586 0 0.969-0.224 1.149-0.673s0.271-1.501 0.271-3.159v-3.794h7.869v1.177c0 3.128-0.221 5.345-0.663 6.654s-1.42 2.455-2.934 3.439c-1.514 0.984-3.38 1.477-5.598 1.477-2.305 0-4.205-0.417-5.7-1.252s-2.486-1.991-2.972-3.467c-0.486-1.477-0.729-3.698-0.729-6.663v-8.84c0-2.181 0.075-3.816 0.224-4.906s0.595-2.14 1.336-3.149c0.741-1.009 1.769-1.804 3.084-2.383s2.825-0.869 4.532-0.869c2.318 0 4.23 0.449 5.738 1.346s2.498 2.015 2.972 3.355c0.474 1.339 0.71 3.423 0.71 6.252v2.878zM96.554 0.635l-4.504 13.663 4.934 16.597h-8.13l-3.177-12.971v12.971h-7.869v-30.259h7.869v11.756l3.495-11.756h7.383zM106.216 0.635v24.204h4.785v6.056h-12.653v-30.259h7.869zM112.907 0.635h13.121v6.056h-5.252v5.738h4.916v5.757h-4.916v6.654h5.775v6.056h-13.644v-30.259zM146.382 0.635v30.259h-6.897l-4.093-13.756v13.756h-6.579v-30.259h6.579l4.411 13.625v-13.625h6.579zM166.212 9.794h-7.308v-2.243c0-1.047-0.093-1.713-0.28-2s-0.498-0.43-0.935-0.43c-0.474 0-0.832 0.193-1.075 0.579s-0.364 0.972-0.364 1.757c0 1.009 0.137 1.769 0.411 2.28 0.262 0.511 1.003 1.128 2.224 1.85 3.501 2.081 5.707 3.788 6.616 5.121s1.364 3.483 1.364 6.448c0 2.156-0.252 3.744-0.757 4.766s-1.48 1.878-2.925 2.57c-1.445 0.692-3.127 1.037-5.046 1.037-2.106 0-3.903-0.399-5.392-1.196s-2.464-1.813-2.925-3.046c-0.461-1.234-0.692-2.984-0.692-5.252v-1.981h7.308v3.682c0 1.134 0.103 1.863 0.308 2.187s0.57 0.486 1.093 0.486c0.523 0 0.913-0.206 1.168-0.617s0.383-1.022 0.383-1.832c0-1.782-0.243-2.947-0.729-3.495-0.498-0.548-1.726-1.464-3.682-2.747-1.956-1.296-3.252-2.237-3.888-2.822s-1.162-1.396-1.579-2.43c-0.417-1.034-0.626-2.355-0.626-3.962 0-2.318 0.296-4.012 0.888-5.084s1.548-1.909 2.869-2.514c1.321-0.604 2.916-0.906 4.785-0.906 2.043 0 3.785 0.33 5.224 0.991s2.392 1.492 2.86 2.495c0.467 1.003 0.701 2.707 0.701 5.112v1.196z"></path>
        </svg> -->
      </p>
      <p v-if="overviewDatas.info && overviewDatas.info.name" class="overview-download-name">[{{ overviewDatas.info.name }}]</p>
      <p class="TTFontBold text-break overview-download-address">{{ address }}</p>
      <ul v-if="overviewDatas.info && overviewDatas.info.cat.length" class="d-flex flex-row overview-contract-cats download-contract-cats">
        <li v-for="(cat, index) of overviewDatas.info.cat" :key="index">
          {{ cat }}
        </li>
      </ul>
    </div>
    <div class="d-flex flex-col">
      <ul class="overview-tx-ul overview-tx-timeline" :class="{ 'order-2': download }">
        <li class="d-flex flex-row align-center">
          <p>Birthday</p>
          <p class="v-flex text-right overview-text">{{ new Date(parseInt(overviewDatas.txTimeline.first.timeStamp) * 1000) | dateFormat }}</p>
        </li>
        <li class="d-flex flex-row align-center">
          <p>Latest transaction</p>
          <p class="v-flex text-right overview-text">{{ new Date(parseInt(overviewDatas.txTimeline.last.timeStamp) * 1000) | dateFormat }}</p>
        </li>
        <li class="d-flex flex-row align-center">
          <p>Transactions</p>
          <p class="v-flex text-right overview-text">{{ erc20Datas.eth.txns | formatNumber }}</p>
        </li>
      </ul>
      <div v-if="words.length" class="overview-address-cloud">
        <!-- <img src="/static/wordcloud.svg"/> -->
        <div class="overview-word-cloud-parent">
          <div id="overview-word-cloud" class="overview-word-cloud"></div>
        </div>
        <div class="TTFontMedium d-flex auto-center overview-cloud-point">
          <span>Less</span>
          <p class="d-iflex align-center cloud-point-colors">
            <span v-for="item of [1, 2, 3, 4]" :key="item" :data-level="item" class="i-block"></span>
          </p>
          <span>More</span>
        </div>
        <p class="overview-cloud-title">Address profile cloud</p>
      </div>
    </div>
  </section>
</template>

<script>
import * as d3 from 'd3'
import Cloud from 'd3-cloud'
import { addClass, filterSocialIcon } from 'utils'
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
      return !this.overviewDatas.info || !this.overviewDatas.info.name
    }
  },
  methods: {
    filterSocialIcon () {
      return filterSocialIcon(...arguments)
    },
    // sizeFunc (list) {
    //   const _list = []

    // },
    cloudColor (number) {
      number = parseInt(number)
      let color = '#DFEEFF'
      if (number >= 1 && number <= 19) {
        color = '#DFEEFF'
      } else if (number >= 20 && number <= 100) {
        color = '#0074FF'
      } else if (number >= 101 && number <= 500) {
        color = '#DA5DFF'
      } else {
        color = '#FF9D15'
      }
      return color
    },
    drawCloud (words = this.words) {
      const dom = document.getElementById('overview-word-cloud')
      if (!dom) return
      const { width, height } = document.getElementById('overview-word-cloud').getBoundingClientRect()

      const draw = (words) => {
        addClass('scale', dom)
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
          .style('fill', (t) => {
            return this.cloudColor(t.count)
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
      const small = words.length <= 15
      const log = small ? 0.15 : 0.5
      const max = Math.pow(words[0].count, log)
      const layout = Cloud()
        .size([width, height])
        .words(
          words.map(function (d) {
            const scale = d.name.length >= 10 ? 12 / d.name.length : 1
            let _size = Math.pow(d.count, log)
            // let _size = Math.sqrt(d.count)
            _size = 120 * _size / max
            // _size = _size > 90 ? 90 : _size
            _size = _size < 24 ? 24 : _size

            // _size = _size > 450 / d.name.length ? 450 / d.name.length : _size

            // console.log('====', d.name.length, _size)
            console.log('_size', _size)
            return { text: d.name, size: _size * scale, count: d.count }
          })
        )
        // .random(function () {
        //   return 0
        // })
        .padding(0)
        .rotate(function (d) {
          const big = d.text.length >= 10
          // const rule = [0, 90][Math.round(Math.random())]
          // return words.length <= 15 ? rule : (~~(Math.random() * 6) - 3) * 30
          return big ? [0] : [0, 90][Math.round(Math.random())]
        })
        .font('Impact')
        .fontSize(function (d) {
          console.log('----', d)
          return d.size
          // return Math.sqrt(d.count)
        })
        .on('end', draw)

      layout.start()
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
        padding-top: 60px;
        padding-bottom: 30px;
      }
    }
    &.download {
      .overview-tx-timeline, .overview-address-cloud {
        margin-top: 24px;
      }
    }
  }
  .overview-header {
    padding-top: 100px;
    padding-bottom: 60px;
    h1 {
      font-size: 36px;
    }
  }
  .overview-download-header {
    .download-contract-cats {
      margin-top: 10px;
    }
  }
  .overview-download-name {
    font-size: 16px;
    color: #BDB9FD;
  }
  .overview-download-address {
    margin-top: 6px;
    font-size: 18px;
    color: #fff;
  }
  .lens-header-logo {
    margin-bottom: 24px;
    >img {
      &.image-logo {
        width: 24px;
        // height: 24px;
      }
      &.text-logo {
        margin-left: 8px;
        width: 90px;
        // height: 16px;
        fill: #BDB9FD;
      }
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
    >li {
      &:not(:first-of-type) {
        margin-top: 8px;
      }
    }
  }
  .overview-text {
    font-family: $--font-TTNormsBold;
    font-size: 16px;
    color: #fff;
  }
  .overview-address-cloud {
    margin-top: 42px;
    // margin-bottom: 42px;
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
  .overview-word-cloud-parent {
    margin: 0 auto;
    position: relative;
    // padding: 15px;
    width: 300px;
    height: 200px;
    box-sizing: border-box;
    // &::before {
    //   content: '';
    //   position: absolute;
    //   left: -25px;
    //   top: -30px;
    //   width: 350px;
    //   height: 250px;
    //   background-image: url(~/static/shadow.png);
    //   background-size: 100% auto;
    //   background-repeat: no-repeat;
    //   opacity: 0;
    // }
  }
  .overview-word-cloud {
    position: relative;
    margin: 0 auto;
    width: 900px;
    height: 600px;
    z-index: 1;
    // background-color: #7D72F0;
    // box-shadow: 0 0 20px 3px #7D72F0;
    // background-image: url(~/static/shadow.png);
    // background-size: 100% auto;
    // background-repeat: no-repeat;
    // background-image: linear-gradient()
    >svg {
      display: none;
    }
    &.scale {
      transform: scale(.33);
      transform-origin: 0 0;
    }
  }
  .overview-cloud-point {
    margin-top: 12px;
    font-size: 12px;
    color: #fff;
  }
  .cloud-point-colors {
    margin-left: 10px;
    margin-right: 10px;
    >span {
      width: 24px;
      height: 8px;
      border-radius: 4px;
      &[data-level="1"] {
        background-color: #DFEEFF;
      }
      &[data-level="2"] {
        background-color: #0074FF;
      }
      &[data-level="3"] {
        background-color: #DA5DFF;
      }
      &[data-level="4"] {
        background-color: #FF9D15;
      }
      &:not(:first-of-type) {
        margin-left: 4px;
      }
    }
  }

  .overview-tx-markline {
    margin-bottom: 42px;
  }
  .overview-tx-timeline {
    // margin-top: 42px;
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
