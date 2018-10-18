import Vue from 'vue'

import { proxyImg, formatDecimal, sliceStr, dateFormat, weiToEth, formatNumber, filterSocialIcon } from '@/assets/utils'
Vue.filter('proxyImg', proxyImg)
Vue.filter('formatDecimal', formatDecimal)
Vue.filter('dateFormat', dateFormat)
Vue.filter('sliceStr', sliceStr)
Vue.filter('weiToEth', weiToEth)
Vue.filter('formatNumber', formatNumber)
Vue.filter('filterSocialIcon', filterSocialIcon)
