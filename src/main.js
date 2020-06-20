import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';
require('vue-ionicons/ionicons.css')

import AllIosIcon from 'vue-ionicons/dist/ionicons-ios';
 
Vue.use(AllIosIcon)

Vue.use(Ionic);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
