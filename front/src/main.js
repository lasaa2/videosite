// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' // tuodaan käytettäväksi vue kirjastoa
import App from './App'

Vue.config.productionTip = false

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll);

Vue.use(require('vue-moment')); // ajan näyttämiseen


/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})