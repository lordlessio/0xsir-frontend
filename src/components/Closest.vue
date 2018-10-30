<template>
  <section v-if="loading || (!loading && closests.length)" class="TTFontBold relative sir-closest-address">
    <transition name="sir-hide-fade" mode="out-in">
      <div v-if="loading" key="closest-skeleton">
        <div class="closest-skeleton-container skeleton-animate">
          <h2></h2>
          <ul class="text-center closest-skeleton-recents">
            <li class="d-flex align-center closest-skeleton-item" v-for="item of [1,2,3]" :key="item">
              <span class="i-block">
                <svg>
                  <use xlink:href="#icon-crown"/>
                </svg>
              </span>
              <div class="v-flex">
                <p></p>
                <p></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-else key="closest-content">
        <h2 class="sir-title-block">Closest addresses</h2>
        <ul class="sir-closest-list">
          <li class="d-flex align-center sir-closest-item"
            v-for="(item, index) of closests" :key="index">
            <p class="text-center closest-level-box">
              <span v-if="index < 3" class="i-block closest-level-toper" :data-level="index + 1">
                <svg>
                  <use :xlink:href="`#icon-crown-${index + 1}`"/>
                </svg>
              </span>
              <span v-else class="i-block text-center closest-level-span">{{ index + 1 }}</span>
            </p>
            <div class="v-flex closest-cnt-box">
              <p class="closest-user-name" @click.stop="$emit('search', item._id)">{{ item._id | sliceStr({ end: 6 }) }}...</p>
              <p class="TTFontMedium">
                <span class="d-iflex flex-row i-block closest-arrow up">
                  <svg>
                    <use xlink:href="#icon-arrow-up"/>
                  </svg>
                  <span class="i-block">{{ item.to | formatNumber }}</span>
                </span>
                <span class="d-iflex flex-row i-block closest-arrow down">
                  <svg>
                    <use xlink:href="#icon-arrow-up"/>
                  </svg>
                  <span class="i-block">{{ item.from | formatNumber }}</span>
                </span>
              </p>
            </div>
            <span class="i-block closest-tx-total">{{ item.count | formatNumber }}</span>
          </li>
        </ul>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  props: {
    closests: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    closests (val) {

    }
  }
}
</script>

<style lang="scss" scoped>
  .sir-closest-address {
    padding-top: 35px;
    padding-bottom: 60px;
    color: #fff;
    h2 {
      font-size: 24px;
    }
  }
  .sir-closest-list {
    margin-top: 20px;
  }
  .sir-closest-item {
    &:not(:first-of-type) {
      margin-top: 20px;
    }
  }
  .closest-level-box {
    width: 45px;
    font-size: 16px;
    svg {
      width: 43px;
      height: 28px;
    }
  }
  .closest-level-toper {
    position: relative;
    &::before {
      content: attr(data-level);
      position: absolute;
      left: 50%;
      bottom: 4px;
      transform: translateX(-50%);
    }
  }
  .closest-level-span {
    width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 100%;
    background-color: #7D72F0;
  }
  .closest-cnt-box {
    margin-left: 16px;
    margin-right: 16px;
  }
  .closest-user-name {
    margin-bottom: 4px;
    font-size: 20px;
    // >a {
    //   color: inherit;
    // }
  }
  .closest-arrow {
    >svg {
      width: 10px;
      height: 12px;
      fill: inherit;
      stroke: inherit;
      stroke-width: 2;
    }
    >span {
      width: 45px;
    }
    &.up {
      fill: #EB8785;
      stroke: #EB8785;
    }
    &.down {
      fill: #69D1C3;
      stroke: #69D1C3;
      svg {
        transform: rotate(180deg);
      }
    }
  }
  .closest-tx-total {
    padding: 6px 10px;
    font-size: 16px;
    background-color: #7D72F0;
    border-radius: 5px;
  }

  // closest-skeleton-container
  .closest-skeleton-container {
    >h2 {
      width: 160px;
      height: 26px;
      background-color: $--skeleton-light;
      border-radius: 3px;
    }
  }
  .closest-skeleton-recents {

  }
  .closest-skeleton-item {
    margin-top: 20px;
    svg {
      width: 43px;
      height: 28px;
      fill: $--skeleton-light;
    }
    >span {
      width: 45px;
    }
    >div {
      margin-left: 16px;
      >p {
        background-color: $--skeleton-light;
        border-radius: 3px;
        &:nth-of-type(1) {
          width: 130px;
          height: 18px;
        }
        &:nth-of-type(2) {
          margin-top: 6px;
          width: 200px;
          height: 18px;
        }
      }
    }
  }
</style>
