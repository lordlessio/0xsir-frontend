import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://lordless.oss-cn-hongkong.aliyuncs.com/0xsir/source/sir-error-icon.svg',
  loading: 'http://lordless.oss-cn-hongkong.aliyuncs.com/0xsir/source/sir-error-icon.svg',
  attempt: 1,
  listenEvents: [ 'scroll' ]
})
