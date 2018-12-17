<template>
    <div>
      <b-button type="primary" long class="playlist-buttons" v-on:click="onClickButton(item)" :src="item | url">
        {{item | fullName}}
      </b-button>
    </div>
</template>

<script>

export default {
  name: 'Playlistitem',
  props: ['item'],
  filters: {
    fullName(value) {
      // console.log(value);
      return `${value.name}`;
    },
    url: function (value) {
      return `${value.url}`;
    }
  },
  methods: {
    onClickButton(value) {
      this.$emit('clicked', value.url);
    }
  }, 
};

</script>

<style>

</style>
