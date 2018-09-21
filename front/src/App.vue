<template>
  <div class="app">
    <Title/>
    <Videoplayer/>
    <Playlist/>
    <Chat/>
    <Footer/>
  </div>
</template>

<script>
import Title from './components/Title'
import Videoplayer from './components/Videoplayer'
import Playlist from './components/Playlist'
import Chat from './components/Chat'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Title,
    Videoplayer,
    Playlist,
    Chat,
    Footer
  },

  data () {
    return {
      name: "moi"
    }
  }
}

</script>

<style>

/* Grid settings */

.app {
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}

.title {
  grid-column-start: 1;
  grid-column-end: 8;
  padding: 0 10px 0 10px;
}

.videoplayer {
  grid-column-start: 1;
  grid-column-end: 7;
}

.playlist {
  grid-column-start: 7;
  grid-column-end: 8;
  text-align: center;
}

.chat {
  grid-column-start: 1;
  grid-column-end: 8;
  text-align: center;
}

.footer {
  grid-column-start: 1;
  grid-column-end: 8;
  text-align: center;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
