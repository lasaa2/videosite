<template>
    <div class="message">
        <ul id="message-all">
            <button v-on:click="removeMessage(message.id)">X</button>
            <span>Message from xxx</span><br>
            <span>Date: {{message | date}}</span><br>
            {{message | content}}
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Message',
    props: [
        "message"
    ],

    filters: {
        content(value) {
        // console.log(value);
        return `${value.content}`;
        },

        date(value) {
            // console.log(value);
            return `${value.date}`;
        },
        id(value) {
            // console.log(value);
            return `${value.id}`;
        },
    },

    methods: {
        removeMessage: function(value) {
            this.$emit('clicked', value);
        }
    }
}

</script>

<style>
#message-all {
    margin: 10px;
    padding: 5px;
    color: white;
    border: 2px solid;
}

</style>
