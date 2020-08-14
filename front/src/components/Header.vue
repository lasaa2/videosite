<template>
  <div>
      <img src="../assets/oubs-web.png" alt="Logo image">
      <h3 class="col-md-4">{{mainTitle}}</h3>
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
