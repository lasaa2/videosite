<template>
    <div>
        <div class="messages" id="messageBody">
                <div v-for="(msg, index) in messages" :key="index">      
                    <div class="popup-messages">
                        <span>{{msg.date | formatDate}}
                        <b>{{ msg.user }}:</b> {{ msg.content}}
                        </span>
                    </div>
                </div>
        </div>
        <form class="chat-input-body" @submit.prevent="sendMessage">
            <input placeholder="user" v-model="user">
            <input placeholder="message" v-model="newMessage"/>
            <button type="submit">Send</button>
        </form>
    </div>
</template>

<script>

import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import io from 'socket.io-client';
import moment from 'moment'

export default {
    name: 'Chat',


    data() {
        return {
            user: '',
            newMessage: '',
            messages: [],
            socket : io(process.env.API_URL),
            time: String,
            errors: []
        }
    },

    created() {
        axios.get('http://' + process.env.API_URL + '/api/messages') // receive message database first time
            .then((response) => {
                this.messages = response.data;
            })
            .catch(function (error) {
                console.log(error); // handle errors
            })

        this.socket.on('message', function (data) { // listen new messages from database via backend, and push them ”messages"
            this.messages.push(data)
        }.bind(this))


    },

    updated() {
        this.scrollBottom()
    },

    filters: {
        formatDate: (value) => {
            const d = new Date()
            const n = moment(String(d.toISOString())).format('DDMMYY')
            const p = moment(String(value)).format('DDMMYY')
            
            // also print date if it has changed
            if (p != n) {
                return moment(String(value)).format('DD.MM.YYYY, HH:mm:ss')
            }

            return moment(String(value)).format('HH:mm:ss')
        },
    },

    methods: {
        // SEND message via websocket
        sendMessage(e) {
            e.preventDefault();

            if (this.newMessage == "") {
                console.log("content missing");
            } else {
                this.socket.emit('new message', {
                user: this.user,
                message: this.newMessage,
                });
            }
            
            this.newMessage = ""
        },

        scrollBottom: () => {
            const msgBody = document.querySelector('#messageBody');
            msgBody.scrollTop = msgBody.scrollHeight - msgBody.clientHeight - 1
        }

    }  
}

</script>

<style>
/* Tekee asian että input pysyy paikallaan */
.messages {
    height: 260px;
    overflow-x: scroll;
    overflow-x: hidden;
}
</style>
