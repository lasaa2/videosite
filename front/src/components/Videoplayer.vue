<template>
          <video ref="videoPlayer" class="video-js">
                <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
                <a href="http://videojs.com/html5-video-support/" target="_blank">
                  supports HTML5 video
                </a>
              </p>
          </video>
</template>

<script>
  
  //import videojs from 'video.js'
  import videojstyle from 'video.js/dist/video-js.css' // tuodaan videojs tyylitiedosto

  //window.videojs = require('video.js');
  import videojs from 'video.js'

  export default {
  name: 'Videoplayer',
  props: {
    newUrl: {
      type: String,
      default() {
        return {
          newUrl: newUrl
        }
      }
    },
    videos: {
      type: Array,
      default() {
        return {
          videos: videos
        }
      }
    },
    options: {
      type: Object,
      default() {
        return {
            autoplay: false,
            controls: true,
            muted: true,
            fluid: true,
            aspectRatio: "16:9",
            poster: "https://oubs.fi/wp-content/uploads/2016/11/cropped-oubs_white_teksti_lapi_152px.png"
        }
      }
    }
  },
  
  data() {
    return {
      player: null,
    }
  },
  mounted() {
        this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
            console.log('onPlayerReady', this);
        })
        this.player.src('http://wowza.oubs.fi/vod/mp4:sample.mp4/playlist.m3u8');
    },
  beforeDestroy() {
      if (this.player) {
            this.player.dispose()
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
};

</script>