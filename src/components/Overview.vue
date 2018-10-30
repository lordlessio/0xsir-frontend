<template>
  <section class="text-center relative sir-overview">
    <!-- <transition name="sir-skeleton-fade">
      <div v-if="loading" class="sir-overview-skeleton">
        <h1></h1>
      </div>
    </transition> -->
    <transition name="sir-hide-fade" mode="out-in">
      <div v-if="loading" class="overview-skeleton" key="overview-skeleton">
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
      </div>
      <div v-else key="overview-content">
        <div class="overview-header">
          <div v-if="!overviewDatas.info || !overviewDatas.info._id" class="relative index-1">
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
                <h1 class="text-break" :style="overviewDatas.info.name.length > 16 ? 'font-size: 24px' : ''">{{ overviewDatas.info.name }}</h1>
                <p v-if="overviewDatas.info.website" class="overview-contract-website">
                  <a :href="overviewDatas.info.website" target="_blank">{{ overviewDatas.info.website }}</a>
                </p>
                <p v-if="!overviewDatas.info.logo" class="text-left text-break overview-contract-address">{{ address }}</p>
              </div>
            </div>
            <p v-if="overviewDatas.info.logo" class="text-left text-break overview-contract-address outside">{{ address }}</p>
            <p v-if="overviewDatas.info.desc" class="text-left text-break overview-contract-desc">{{ overviewDatas.info.desc.zh }}</p>
            <ul v-if="overviewDatas.info.socialLinks.length" class="d-flex flex-row overview-contract-links">
              <li v-for="social of overviewDatas.info.socialLinks" :key="social._id">
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
            <p class="overview-markline overview-contract-markline"></p>
          </div>
        </div>
        <div class="overview-address-cloud">
          <img src="/static/wordcloud.svg"/>
          <p>Address profile cloud</p>
        </div>
        <p class="overview-markline"></p>
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
            <p class="overview-text">{{ overviewDatas.txTimeline.total }}</p>
            <p>Transactions</p>
          </li>
        </ul>
      </div>
    </transition>
  </section>
</template>

<script>
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
    download: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      isFullAddress: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .sir-overview {
    padding-bottom: 40px;
    color: #BDB9FD;
  }
  .overview-header {
    padding-top: 45px;
    padding-bottom: 65px;
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
    font-size: 14px;
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
    >p {
      margin-top: 6px;
    }
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
  .overview-skeleton-container {
    padding-top: 45px;
    >h2 {
      width: 80%;
      height: 30px;
      background-color: $--skeleton-light;
      border-radius: 3px;
    }
  }
  .overview-skeleton-cloudy {
    margin-top: 35px;
    padding: 50px 0;
    width: 100%;
    background-color: rgba(225, 223, 252, .5);
    border-radius: 3px;
    >svg {
      width: 80px;
      height: 80px;
      fill: $--skeleton-light;
    }
  }
  .overview-skeleton-li {
    margin-top: 30px;
    >p {
      height: 18px;
      background-color: $--skeleton-light;
      border-radius: 3px;
      &:nth-of-type(1) {
        width: 55%;
      }
      &:nth-of-type(2) {
        margin-top: 10px;
        width: 90%;
      }
    }
  }
</style>
