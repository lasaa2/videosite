// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' // tuodaan käytettäväksi vue kirjastoa
// import App from './App' // tuodaan App.vue tiedosto käytettäväksi

import VueVideoPlayer from 'vue-video-player' // tuodaan vue-video-player kirjasto
import 'vue-video-player/src/custom-theme.css' // tuodaan vue-video-player tyylitiedosto
import 'video.js/dist/video-js.css' // tuodaan videojs tyylitiedosto
// import 'videojs-contrib-hls/dist/videojs-contrib-hls'

Vue.config.productionTip = false
Vue.use(VueVideoPlayer) // use global vuevideoplayer plugin

/* eslint-disable no-new */
/* 
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
})

*/

/* jos jsonin hakee tiedostosta value arvo filtterissä on yksi objekti eikä monta objektia, miksi? */

// import json from './data.json';

Vue.component('videoplayer-component', {
  props: ['videos'],
  data () {
    return {
        url: '',
        playerOptions: { 
            autoplay: false,
            controls: true,
            muted: true,
            sources: [{
                type: "video/mp4",
                src: "http://vjs.zencdn.net/v/oceans.mp4"
            }],
            poster: "https://oubs.fi/wp-content/uploads/2016/11/cropped-oubs_white_teksti_lapi_152px.png"
        }
    }
  },
  methods: {
   playerSetSrc: function(url) {
      this.playerOptions.sources[0].src = url;
    }
  },
  template: `<div>
    <playlist-component @clicked="playerSetSrc" v-bind:videos="videos"/>
    <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions">
    </video-player>
    <button v-on:click="playerSetSrc()">apply</button>
    <input v-model="url"/>
  </div>
  `
});

Vue.component('playlist-component', {
  props: ['videos'],
  methods: {
    onClickChild: function(value) {
      this.$emit('clicked', value);
    }
  },
  template: '<div><h2>Playlist</h2><item-component @clicked="onClickChild" v-for="item in videos" v-bind:play="item"/></div>'
});

Vue.component('item-component', {
  props: ['play'],
  filters: {
    fullName(value) {
      // console.log(value);
      return `${value.name}`;
    },
    url: function(value) {
      return `${value.url}`;
    }
  },
  computed: {
  },
  methods: {
    onClickButton (value) {
      this.$emit('clicked', value.url);
    }
  },
  template: 
  `
    <div>
      <button v-on:click="onClickButton(play)" v-bind:src="play | url" v-bind:key="play.id">{{play | fullName}}</button>
    </div>
    `
});

const app = new Vue({

  el: '#app',
  data: {
    videos: [
      { 
        "id":"0", "name": "LIVE", "url": "http://wowza.oubs.fi/vod/mp4:sample.mp4/playlist.m3u8"
      },
      { 
        "id":"1", "name": "Sample 1", "url": "http://vjs.zencdn.net/v/oceans.mp4"
      },
      { 
        "id":"2", "name": "Sample 2", "url": "https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_2mb.mp4"
      }
    ]
  },
  template: '<div><videoplayer-component v-bind:videos="videos"/></div>',
})