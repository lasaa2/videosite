<template>
    <div>
        <input class="searchbox" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" placeholder="Search title..."/>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: ['value'],
};
</script>