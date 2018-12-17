<template>
  <div class="container">
    <b-row>
      <b-col>
        <Header :mainTitle="mainTitle" :subTitle="subTitle"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="8">
        <Videoplayer v-bind:newUrl="newUrl" :videos="videos"/>
      </b-col>
      <b-col cols="4">
        <Playlist v-on:clicked="setPlaylistUrl" :videos="videos"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col >
        <Chat/>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import Header from './components/Header'
import Logo from './components/Logo'
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
    Header,
    Logo,
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
