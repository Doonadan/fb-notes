import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './modules/bootstrap.js'
import './modules/fontawesome.js'
import './modules/yamaps.js'
import './modules/firebase.js'
import './css/main.css'

Vue.config.productionTip = false

Vue.filter('formatDatetime', function (value) {
  const date = new Date(value)
  return date.toLocaleString('ru-RU').replace(',', '')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
