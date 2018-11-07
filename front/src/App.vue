<template>
  <div class="app">
    <Row>
        <Title :mainTitle="mainTitle" :subTitle="subTitle" class="header"/>
    </Row>
    <Row class="main">
        <Col span="16">
          <Videoplayer class="" v-bind:newUrl="newUrl" :videos="videos"/>
        </Col>
        <Col span="8">
          <Playlist class="playlist" v-on:clicked="setPlaylistUrl" :videos="videos"/>
        </Col>
    </Row>
    <Row>
        <Chat/>
    </Row>
  </div>
</template>

<script>

import Title from './components/Title'
import Videoplayer from './components/Videoplayer'
import Playlist from './components/Playlist'
import Chat from './components/Chat'
import Footer from './components/Footer'
import './styles.css'

import axios from 'axios'

export default {
  name: 'App',
  props: ['videojs'],
  components: {
    Title,
    Videoplayer,
    Playlist,
    Chat,
    Footer
  },

  data() {
    return {
      mainTitle: "OUBS videoplayer",
      subTitle: "",
      footerText: "© OUBS",
      videos: [
          {
            "id": "0",
            "name": "Live",
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
        ],
      newUrl: '',
    }
  },
  
  /* 
  // Väliaikaisesti poissa, korjaa api
  mounted() {
    fetch("http://localhost:3002/api/videos")
    .then(response => response.json())
    .then((data) => {
      this.videos = data;
    })
  },
  */
  methods: {
    setPlaylistUrl(arr) {
      this.newUrl = arr;
    },
  },
}

</script>

<style>

</style>
