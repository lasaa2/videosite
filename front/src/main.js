// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' // tuodaan käytettäväksi vue kirjastoa
import App from './App'

Vue.config.productionTip = false

import iView from 'iview';
import 'iview/dist/styles/iview.css';

import BootstrapVue from 'bootstrap-vue'
Vue.use(require('vue-moment'));

Vue.use(BootstrapVue);

// import './assets/pure-min.css'
// import './assets/grids-responsive-min.css'
//import './styles.css'
Vue.use(iView);
// window.videojs = require('video.js');

/* jos jsonin hakee tiedostosta value arvo filtterissä on yksi objekti eikä monta objektia, miksi? */
// import json from './data.json';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})