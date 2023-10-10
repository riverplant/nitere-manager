/**
 * 环境配置封装
 */

type ENV = 'stg' | 'prd' | 'dev'

/**let env: ENV = 'dev'
if (location.host.indexOf('localhost') > -1) {
  env = 'dev'
} else if (location.host === 'driver-stg.marsview.cc') {
  env = 'stg'
} else {
  env = 'prd'
}**/

const env = (document.documentElement.dataset.env as ENV) || 'dev' //在index.html中指定

const config = {
  dev: {
    //baseApi: '/api',
    //uploadApi: 'http://127.0.0.1:8080',
    mock: false,
    mockApi: '',
  },
  stg: {
    baseApi: '/api',
    uploadApi: 'http://api-driver-stg.marsview.cc',
    mock: false,
    mockApi: '',
  },
  prd: {
    baseApi: '/api',
    uploadApi: 'http://api-driver.marsview.cc',
    mock: false,
    mockApi: '',
  },
}
export default {
  env,
  ...config[env], //解构
}
