<template>
  <div class="title">
    <h1>{{ msg }}</h1>
    <h2> {{ subTitle }}</h2>
  
  </div>
</template>

<script>
export default {
  name: 'Title',
  data () {
    return {
      msg: 'OUBS LIVE',
      subTitle: 'This is onDemand'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.title {
    background: #d1d1d1;
    border: 1px solid;
}


h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
