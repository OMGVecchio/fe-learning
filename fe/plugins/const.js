import Vue from 'vue'

// view pages with domain by nginx，ip below is used to test cross-domain
// local domain：commom.dev.com
Vue.prototype.$crossDomain = 'http://127.0.0.1:3000'
Vue.prototype.$getImage = (width = 355, height = 150) => `https://via.placeholder.com/${width}x${height}/f10000/000000`
