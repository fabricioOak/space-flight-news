import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ApiService from './services/api_service'

import './assets/css/main.css'
import './assets/tailwind.css'

Vue.config.productionTip = false

ApiService.init()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
