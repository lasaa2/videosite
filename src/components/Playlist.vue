<template>
    <div class="playlist">
    <span>Playlist window</span>
        <ol>
            <li 
            v-for="item in data"
            v-bind:key="item.id"
            >{{item}}</li>
        </ol>
    </div>
</template>

<script>

import json from '../data.json'

export default {
    name: 'Playlist',
    data () {
        return {
            data : json
        }
    }
}

</script>

<style scoped>

.playlist {
    background: #d1d1d1;
    border: 1px solid;
}

</style>
