import axios from 'axios'
const instance = axios.create({
  baseURL: process.env.BACKEND_SERVER,
  timeout: 50000,
  withCredentials: true
})
// request
// instance.interceptors.request.use(async (res) => {
//   return res
// }, error => {
//   return Promise.reject(error)
// })

// response
instance.interceptors.response.use(async (response) => {
  return response.data
}, error => {
  return Promise.reject(error)
})

export default instance
