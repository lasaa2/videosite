<template>
  <div class="title">
    <Row>
      <Col span="4">
      <img src="../assets/oubs.jpg" height="42" width="42">
      </Col>
      <Col span="20">
        <h1>{{mainTitle}}</h1>
        <h2>{{subTitle}} </h2>
      </Col>
    </Row>
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
