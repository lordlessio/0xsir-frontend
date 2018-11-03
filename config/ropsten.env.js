'use strict'
const merge = require('webpack-merge')
module.exports = merge({
  NODE_ENV: '"production"',
  BACKEND_SERVER: '""',
  OSSFOLDERPATH: 'ropsten',
  OSS_ORIGIN: '"//lordless.oss-cn-hongkong.aliyuncs.com"'
})
