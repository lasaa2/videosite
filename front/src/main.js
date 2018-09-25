// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' // tuodaan käytettäväksi vue kirjastoa

import videojs from 'video.js'
import 'video.js/dist/video-js.css' // tuodaan videojs tyylitiedosto
import './assets/pure-min.css'
import './assets/grids-responsive-min.css'
import './styles.css'

window.videojs = require('video.js');

/* jos jsonin hakee tiedostosta value arvo filtterissä on yksi objekti eikä monta objektia, miksi? */
// import json from './data.json';

/* Videoplayer component */

Vue.component('videoplayer-component', {
  props: ['videos', 'newUrl'],
  data() {
    return {
      player: '',
      playerOptions: {
        autoplay: true,
        controls: true,
        muted: true,
        poster: "https://oubs.fi/wp-content/uploads/2016/11/cropped-oubs_white_teksti_lapi_152px.png"
      }
    }
  },

  watch: {
    // whenever question changes, this function will run
    newUrl: function (newUrl, oldUrl) {
      this.player.src(newUrl);
    }
  },


  methods: {
    playerInit() {
      this.player = videojs('player', this.playerOptions);
    }

  },

  mounted() {
    this.playerInit();
    this.player.src(this.videos[0].url);
  },

  template: `
  <div>  
        <video  
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
    </div>`
});

/* Playlist component */

Vue.component('playlist-component', {
  props: ['videos'],

  data() {
    return {
      search: '',
    }
  },

  methods: {
    onClickChild: function (value) {
      this.$emit('clicked', value);
    },

  },

  computed: {
    filteredList() {
      return this.videos.filter(video => {
        return video.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },

  template: `
  <div>
    <h2>Playlist</h2>
    <search-playlist-component v-model="search"/>
    <item-component v-on:clicked="onClickChild" v-for="item in filteredList" :item="item" :key="item.id"/>
  </div>`
});

/* Playlist ITEM component */

Vue.component('item-component', {
  props: ['item'],
  filters: {
    fullName(value) {
      // console.log(value);
      return `${value.name}`;
    },
    url: function (value) {
      return `${value.url}`;
    }
  },
  computed: {},
  methods: {
    onClickButton(value) {
      this.$emit('clicked', value.url);
    }
  },
  template: `
    <div>
      <button class="playlist-buttons pure-button pure-button-primary" v-on:click="onClickButton(item)" :src="item | url">
      {{item | fullName}}
      </button>
    </div>
    `
});

/* Search component */

Vue.component('search-playlist-component', {
  props: ['value'],
  template: `
  <div>
    <input class="searchbox" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" placeholder="Search title..."/>
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
      subTitle: 'Video Viewer'
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
    newUrl: '',
    videos: [{
        "id": "0",
        "name": "LIVE",
        "url": "http://wowza.oubs.fi/vod/mp4:sample.mp4/playlist.m3u8"
      },
      {
        "id": "1",
        "name": "Sample 1",
        "url": "http://vjs.zencdn.net/v/oceans.mp4"
      },
      {
        "id": "2",
        "name": "Sample 2",
        "url": "https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_2mb.mp4"
      }
    ]
  },

  methods: {

    setPlaylistUrl(arr) {
      this.newUrl = arr;
    }

  },

  template: `
  <div class="app">
      <title-component/>
      <div class="main">
        <videoplayer-component class="" v-bind:newUrl="newUrl" :videos="videos"/>
        <playlist-component class="playlist" v-on:clicked="setPlaylistUrl" :videos="videos"/>
      </div>
  </div>
  `
})
