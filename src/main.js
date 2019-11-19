import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'babel-polyfill'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import 'common/stylus/index.styl'

import Vconsole from 'vconsole'
let vConsole = new Vconsole()
Vue.use(vConsole)

fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
