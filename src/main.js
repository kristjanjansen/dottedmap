import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.use(VueResource);

var events = new Vue()
Vue.prototype.$events = events

new Vue({
  el: '#app',
  render: h => h(App)
})
