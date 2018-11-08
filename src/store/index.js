import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lensAssets: {}
  },
  mutations: {
    setLensAssets (state, { address, data } = {}) {
      if (!data || typeof data !== 'object') return
      state.lensAssets[address] = data
    }
  }
})
