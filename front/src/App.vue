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
    <Row class="main">
      <Col span="16">
          <Chat/>
      </Col>
      <Col span="8">
      </Col>
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
      videos: [],
      newUrl: '',
    }
  },
  
  mounted() {

    //console.log("localhost:3002")

    /* Videohaku */

    fetch('http://localhost:3002/api/videos')
    .then(response => response.json())
    .then((data) => {
      this.videos = data;
    })
  },

  methods: {
    setPlaylistUrl(arr) {
      this.newUrl = arr;
    },
  },
}

</script>

<style>

</style>
