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
    <b-row>
      <b-col>
        <Footer/>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import Header from './components/Header'
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
  
  // Väliaikaisesti poissa, korjaa api
  mounted() {
    fetch("http://localhost:3002/api/videos")
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
