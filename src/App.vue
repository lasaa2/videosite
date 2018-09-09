<template>
  <div id="app">
    <HelloWorld/>
    <Videoplayer/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Videoplayer from './components/Videoplayer'
// import Chat from './components/Chat'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Videoplayer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
