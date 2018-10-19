<template>
    <div class="chat">
        <h2>Chat window</h2>
        <Message v-for="message in messages.slice(-3)" :message="message" :key="message.id" v-on:clicked="deleteMessage"/>
        <form>
          <input v-model="newMessage"/>
          <button type="submit">Send message!</button>
        </form>
    </div>
</template>

<script>
import Message from './Message'

export default {
    name: 'Chat',
    components: {
        Message
    },
    
    props: [
        "messages"
    ],

    data() {
        return {
            newMessage: "",
        }
    },

    methods: {
        sendMessage: () => {
            console.log("viesti lähetetty!");
        },
        deleteMessage: (value) => {
            console.log(value);

            fetch("http://localhost:3002/api/messages/" + value, {
            method: 'DELETE', // or 'PUT'
            body: {},
            headers:{
                'Content-Type': 'application/json'
            }
            }).then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));
        }
    }  
}



    

</script>

<style>

</style>
