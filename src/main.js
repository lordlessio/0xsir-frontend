import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import './plugins'
import 'stylus/index.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
