// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' // tuodaan käytettäväksi vue kirjastoa
import App from './App' // tuodaan App.vue tiedosto käytettäväksi

import VueVideoPlayer from 'vue-video-player' // tuodaan vue-video-player kirjasto
import 'vue-video-player/src/custom-theme.css' // tuodaan vue-video-player tyylitiedosto
import 'video.js/dist/video-js.css' // tuodaan videojs tyylitiedosto

Vue.config.productionTip = false
Vue.use(VueVideoPlayer) // use global vuevideoplayer plugin

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
