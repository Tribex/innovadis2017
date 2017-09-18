// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import Button from 'src/components/Button'
import ButtonAlternate from 'src/components/ButtonAlternate'
import VueInView from 'vueinview'
import Moment from 'moment'

Moment.locale('nl')

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueInView)

Vue.component('InnoButton', Button)
Vue.component('InnoButtonAlternate', ButtonAlternate)

store.dispatch('blog/load')
store.dispatch('news/load')
store.dispatch('jobs/load')
store.dispatch('events/load')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
