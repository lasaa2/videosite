<template>
    <div>  
        <div class="videocontent">
          <video  
              id="player"
                class="video-js vjs-default-skin vjs-big-play-centered">
              <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
                <a href="http://videojs.com/html5-video-support/" target="_blank">
                  supports HTML5 video
                </a>
              </p>
          </video>
        </div>
    </div>
</template>

<script>
  
  //import videojs from 'video.js'
  import videojstyle from 'video.js/dist/video-js.css' // tuodaan videojs tyylitiedosto

  window.videojs = require('video.js');

  export default {
  name: 'Videoplayer',
  props: ['videos', 'newUrl'],
  data() {
    return {
      player: '',
      defaultSrc: 'http://wowza.oubs.fi/vod/mp4:sample.mp4/playlist.m3u8',
      playerOptions: {
        autoplay: false,
        controls: true,
        muted: true,
        fluid: true,
        aspectRatio: "16:9",
        poster: "https://oubs.fi/wp-content/uploads/2016/11/cropped-oubs_white_teksti_lapi_152px.png"
      }
    }
  },

  watch: {
    // whenever newUrl changes, this function will run
      newUrl: function (newUrl, oldUrl) {
      this.player.src(newUrl);
    }
  },

  methods: {
    playerInit() {
      this.player = videojs('player', this.playerOptions);
    },

    playerDispose(){ 
        this.player.dispose(); 
    },
  },

  mounted() {
    //window.playerEvents = this;
    this.playerInit();
    this.player.src(this.defaultSrc);
  },

  beforeDestroy() { 
        this.playerDispose(); 
    }
};

</script>