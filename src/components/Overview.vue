<template>
  <section class="text-center relative sir-overview">
    <!-- <transition name="sir-skeletion-fade">
      <div v-if="loading" class="sir-overview-skeletion">
        <h1></h1>
      </div>
    </transition> -->
    <div class="overview-header">
      <div v-if="!overviewDatas.logo" class="relative index-1">
        <sir-blockies class="overview-blockies" seed="0x533A99a1292C7ddB74621BF288F50fa34D42C79E"/>
        <h1 @click.stop="isFullAddress = !isFullAddress">
          <span v-if="!isFullAddress" class="sir-title-block bottom lg">{{ address | sliceStr({ end: 11 }) }}...</span>
          <span v-else class="TTFontMedium i-block text-left sir-full-address">{{ address }}</span>
        </h1>
      </div>
      <div v-else class="overview-contract-header">
        <div class="d-flex overview-contract-title">
          <span class="i-block">
            <img :src="overviewDatas.logo"/>
          </span>
          <div class="text-left overview-contract-info">
            <h1>{{ overviewDatas.name }}</h1>
            <p v-if="overviewDatas.website">
              <a :href="overviewDatas.website" target="_blank">{{ overviewDatas.website }}</a>
            </p>
          </div>
        </div>
        <p class="text-left text-break overview-contract-address">{{ overviewDatas._id }}</p>
        <p class="text-left text-break overview-contract-desc">{{ overviewDatas.desc.zh }}</p>
        <ul v-if="overviewDatas.socialLinks.length" class="d-flex flex-row overview-contract-links">
          <li v-for="social of overviewDatas.socialLinks" :key="social._id">
            <svg class="overview-social-svg">
              <use :xlink:href="social.link | filterSocialIcon"/>
            </svg>
          </li>
        </ul>
        <ul v-if="overviewDatas.cat.length" class="d-flex flex-row overview-contract-cats">
          <li v-for="(cat, index) of overviewDatas.cat" :key="index">
            {{ cat }}
          </li>
        </ul>
        <p class="overview-markline overview-contract-markline"></p>
      </div>
    </div>
    <div class="overview-address-cloud">
      <img src="static/wordcloud.svg"/>
      <p>Address profile cloud</p>
    </div>
    <p class="overview-markline"></p>
    <ul class="d-flex align-center overview-tx-ul overview-tx-timeline">
      <li class="v-flex">
        <p class="overview-text">Sep. 13 2016</p>
        <p>First transaction</p>
      </li>
      <li class="v-flex">
        <p class="overview-text">Feb. 04 2018</p>
        <p>Latest transaction</p>
      </li>
    </ul>
    <ul class="d-flex align-center overview-tx-ul overview-tx-count">
      <li class="v-flex">
        <p class="overview-text">Ξ 20</p>
        <p>Max transaction</p>
      </li>
      <li class="v-flex">
        <p class="overview-text">3</p>
        <p>Transactions</p>
      </li>
    </ul>
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
      default: () => {}
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
    padding-top: 50px;
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


  .overview-contract-info {
    margin-left: 12px;
    font-size: 14px;
  }
  .overview-contract-address, .overview-contract-desc {
    margin-top: 6px;
    font-size: 12px;
    color: #ddd;
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
  .overview-markline {
    margin-left: 5%;
    width: 90%;
    height: 1px;
    background-image: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.40) 52.86%, rgba(255,255,255,0) 100%);
    // margin-top: 30px;
    // margin-bottom: 25px;
  }
</style>
