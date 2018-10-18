
const axios = require('./service').default

module.exports = {

  // 根据 id 获取信息
  getInfoById: (id) => {
    return axios.get(`/api/address/${id}`)
  },

  // 根据 账户及页码 获取721资产信息
  getNFTs: (params) => {
    return axios.get('/api/osea', { params })
  },

  getErc20: (params) => {
    return axios.get('/api/escan', { params })
  },

  getTxs: (params) => {
    return axios.get('/api/txs', { params })
  },

  // 代理图片请求
  proxyImg: (url) => {
    const params = { url }
    return axios.get('/api/pimg', { params })
  }
}
