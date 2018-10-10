
const axios = require('./service/axios').default

module.exports = {
  getMsg: (params) => {
    return axios.get('/api/home', { params })
  }
}
