import Vue from 'vue'

import { cdn2lordlessio, proxyImg, formatDecimal, sliceStr, splitAddress, dateFormat, weiToEth, formatNumber, filterSocialIcon, resizeImage } from '@/assets/utils'
Vue.filter('cdn2lordlessio', cdn2lordlessio)
Vue.filter('proxyImg', proxyImg)
Vue.filter('formatDecimal', formatDecimal)
Vue.filter('dateFormat', dateFormat)
Vue.filter('sliceStr', sliceStr)
Vue.filter('splitAddress', splitAddress)
Vue.filter('weiToEth', weiToEth)
Vue.filter('formatNumber', formatNumber)
Vue.filter('filterSocialIcon', filterSocialIcon)
Vue.filter('resizeImage', resizeImage)
