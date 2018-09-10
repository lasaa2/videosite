<template>
    <div class="videoplayer">
        <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions">
        </video-player>
    </div>
</template>

<script>

export default {
    name: 'Videoplayer',

    data () {
        return {
            url: '',
            playerOptions: { 
                autoplay: false,
                controls: true,
                muted: true,
                sources: [{
                    type: "video/mp4",
                    src: {source}
                }],
                poster: "https://oubs.fi/wp-content/uploads/2016/11/cropped-oubs_white_teksti_lapi_152px.png"
            }
        }
    }
}

methods: {
    changeVideo: () => { }
    
}

</script>

<style scoped>

.videoplayer {
    background: #d1d1d1;
    border: 1px solid;
}

</style>
