import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import router from './plugins/router.js'

import VueHighcharts from 'vue2-highcharts'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueHighcharts);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
