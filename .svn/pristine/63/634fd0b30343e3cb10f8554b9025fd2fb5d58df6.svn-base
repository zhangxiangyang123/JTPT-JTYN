'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '""',
  MONITOR_URL: '"http://localhost:9528/"',
  ADMIN_URL: '"http://localhost:9529/"',
  LOGIN_URL: '"http://localhost:9525"',
  SSO_URL:"'http://10.16.3.80:8082/cas/login?service='",
  OUT_SSO_URL:"'http://10.16.3.80:8082/cas/logout?service='"
})
// module.exports = {
//   NODE_ENV: '"development"',
//   ENV_CONFIG: '"dev"',
//   BASE_API: '"https://api-dev"',
//   MONITOR_URL: '"http://localhost:9528/"',
//   ADMIN_URL: '"http://localhost:9529/"'
// }
