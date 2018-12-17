<template>
  <div class="media">
      <img class="mr-3" src="../assets/oubs-web.png" alt="Logo image">
      <div class="media-body">
        <h1 class="mt-0">{{mainTitle}}</h1>
        <h2>{{subTitle}} </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: [
    'mainTitle',
    'subTitle'
  ]
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
