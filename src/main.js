// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' // tuodaan käytettäväksi vue kirjastoa

import videojs from 'video.js'
import 'video.js/dist/video-js.css' // tuodaan videojs tyylitiedosto
import './styles.css'

window.videojs = require('video.js');

/* jos jsonin hakee tiedostosta value arvo filtterissä on yksi objekti eikä monta objektia, miksi? */
// import json from './data.json';

/* Videoplayer component */

Vue.component('videoplayer-component', {
  props: ['videos'],
  data: function() {
    return {
      player: '',
      playerOptions: {
        autoplay: false,
        controls: true,
        muted: true,
        height: 360,
        width: 640,
        poster: "https://oubs.fi/wp-content/uploads/2016/11/cropped-oubs_white_teksti_lapi_152px.png"
      }
    }
  },

  methods: {
    playerInit() {
      this.player = videojs('player', this.playerOptions);
    },

    playerSetUrl(url) {
      this.player.src(url);
    }

  },

  mounted() {
    this.playerInit();
    this.playerSetUrl(this.videos[0].url);
  },

  template: `
  <div class="videowindow">  
      <video
      playsinline  
          id="player"
            class="video-js videoplayer">
          <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
            <a href="http://videojs.com/html5-video-support/" target="_blank">
              supports HTML5 video
            </a>
          </p>
      </video>
      <playlist-component class="playlist" @clicked="playerSetUrl" v-bind:videos="videos"/>
    </div>`

});

/* Playlist component */

Vue.component('playlist-component', {
  props: ['videos'],
  methods: {
    onClickChild: function(value) {
      this.$emit('clicked', value);
    }
  },

  template: '<div><h2>Playlist</h2><item-component @clicked="onClickChild" v-for="item in videos" v-bind:item="item" v-bind:key="item.id"/></div>'
});


/* Playlist ITEM component */

Vue.component('item-component', {
  props: ['item'],
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
      <button class="button" v-on:click="onClickButton(item)" v-bind:src="item | url">{{item | fullName}}</button>
    </div>
    `
});

/* Chat */

Vue.component('chat-component', {

  data() {
    return {
      title: 'Chat - write message',
      chat: '',
      msg: []
    }
  },

  methods: {
    createMsg() {
      if (this.msg.length > 2) {
        this.msg.shift();
        console.log('shifted!')
      }
      this.msg.push(this.chat);
    }
  },

  template: `
  <div>
    <h4>{{title}}</h4>
    <div class="msg"><p v-for="m in msg">{{m}}</p></div>
    <form class="form" id="form" v-on:submit.prevent="createMsg">
      <input type="text" v-model="chat" placeholder="Chat">
      <button type="submit">Send!</button>
    </form>
  </div>
  `
});


/* Title */

Vue.component('title-component', {

  data() {
    return {
      mainTitle: 'OUBS',
      subTitle: 'video viewer'
    }
  },


  template: `
  <div class="title">
    <h1>{{ mainTitle }}</h1>
    <h2> {{ subTitle }}</h2>
  </div>`
})


/* App */

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
  template: `
  <div class="app">
    <div class="header">
      <title-component/>
    </div>
    <div class="main">
      <videoplayer-component v-bind:videos="videos"/>
    </div>
    <div class="chat">
      <chat-component/>
    </div>
  </div>
  `
})