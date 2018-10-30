<template>
    <div class="chat">
        <div class="card mt-3">
            <div class="card-body">
                <div class="card-title">
                    <h3>Chat Group</h3>
                    <hr>
                </div>
                <div class="card-body">
                    <div class="messages" v-for="(msg, index) in messages" :key="index">
                        <p><span class="font-weight-bold">{{ msg.user }}: </span>{{ msg.message }}</p>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <form @submit.prevent="sendMessage">
                    <div class="gorm-group">
                        <label for="user">User:</label>
                        <input type="text" v-model="user" class="form-control">
                    </div>
                    <div class="gorm-group pb-3">
                        <label for="message">Message:</label>
                        <input type="text" v-model="message" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-success">Send</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Message from './Message'

import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import io from 'socket.io-client';

export default {
    name: 'Chat',
    components: {
        Message
    },

    data() {
        return {
            newMessage: "",
            user: '',
            message: '',
            messages: [],
            socket : io('localhost:3002')
        }
    },

    mounted() {
        this.socket.on('MESSAGE', (data) => {
            this.messages = [...this.messages, data];
            // you can also do this.messages.push(data)
        });
    },
/*
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

<h2>Chat window</h2>
        <Message v-for="message in messages" :message="message" :key="message.id" v-on:clicked="deleteMessage"/>
            <input type="text" v-model="newMessage"> 
            <button type="submit" v-on:click="addMessage">
                Submit From Vue Property
        </button>

*/
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

        sendMessage(e) {
            e.preventDefault();

            this.socket.emit('SEND_MESSAGE', {
                user: this.user,
                message: this.message
            });
            this.message = ''
        }
    }  
}

</script>

<style>

</style>
