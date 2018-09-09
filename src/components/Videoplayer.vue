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
                    src: "http://vjs.zencdn.net/v/oceans.mp4"
                }],
                poster: "https://oubs.fi/wp-content/uploads/2016/11/cropped-oubs_white_teksti_lapi_152px.png"
            }
        }
    }
}

</script>

<style>

</style>
