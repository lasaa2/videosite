<template>
    <div>
        <h2>Playlist</h2>
        <Search v-model="search"/>
        <Playlistitem v-on:clicked="onClickChild" v-for="item in filteredList" :item="item" :key="item.id"/>
  </div>
</template>

<script>

import Playlistitem from './Playlistitem';
import Search from './Search';

export default {
  name: 'Playlist',
  props: ['videos'],
  components: {
      Playlistitem,
      Search
  },

  data() {
    return {
      search: '',
    }
  },

  methods: {
    onClickChild: function (value) {
      this.$emit('clicked', value);
    },

  },

  computed: {
    filteredList() {
      return this.videos.filter(video => {
        return video.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
};
</script>

<style>


</style>
