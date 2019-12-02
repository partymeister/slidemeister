import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
require('jquery');
require('popper.js');
require('bootstrap');

Vue.config.productionTip = false

const doubleRequestAnimationFrame = (callback:any) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback)
  })
}

const VueForceNextTick = {
  install (Vue:any) {
    Vue.$forceNextTick = doubleRequestAnimationFrame
    Vue.prototype.$forceNextTick = doubleRequestAnimationFrame
  }
}
Vue.use(VueForceNextTick);

// Initialize global event hub
Vue.prototype.$eventHub = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
