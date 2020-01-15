import Vue from 'vue'

// view pages with domain by nginx，ip below is used to test cross-domain
Vue.prototype.$crossDomain = 'http://127.0.0.1:3000'
