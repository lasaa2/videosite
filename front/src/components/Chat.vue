<template>
    <div class="chat">
        <h2>Chat window</h2>
        <Message v-for="message in messages" :message="message" :key="message.id" v-on:clicked="deleteMessage"/>
            <input type="text" v-model="newMessage"> 
            <button type="submit" v-on:click="addMessage">
                Submit From Vue Property
        </button>
    </div>
</template>

<script>
import Message from './Message'

import axios from 'axios'

export default {
    name: 'Chat',
    components: {
        Message
    },

    data() {
        return {
            messages: [],
            newMessage: "",
        }
    },

    watch: {
        newMessage: () => { 
                axios
                .get('http://localhost:3002/api/messages')
                .then(response => {
                this.messages = response.data
                console.log(this.messages)
                })
        }
    },

    methods: {
        addMessage() {
            const msgObject = {
                content: this.newMessage,
            }

            axios.post('http://localhost:3002/api/messages', msgObject)
                .then(response => {
                console.log(response)
            })
        },

        deleteMessage: (value) => {
            console.log(value);

            fetch("http://localhost:3002/api/messages/" + value, {
            method: 'DELETE', // or 'PUT'
            })
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));
        },
    }  
}

</script>

<style>

</style>
