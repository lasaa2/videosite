

<template>
    <div class="chat-body">
        <div class="messages" id="messageBody">
                <div v-for="(msg, index) in messages" :key="index">      
                    <div class="popup-messages">
                        <p class="time-right">{{msg.date | formatDate}}
                        <b>{{ msg.user }} says:</b> {{ msg.content}}
                        </p>
                    </div>
                </div>
        </div>
        
        <form class="chat-input-body" @submit.prevent="sendMessage">
            
            <input placeholder="user" v-model="user">
            
            <input placeholder="message" v-model="message"/>

            <button type="submit">Send</button>
        </form>
        
    </div>
</template>

<script>

import Message from './Message'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import io from 'socket.io-client';
import moment from 'moment'

export default {
    name: 'Chat',
    components: {
        Message
    },

    props: ['backendUrl'],

    data() {
        return {
            newMessage: "",
            user: '',
            message: '',
            messages: [],
            socket : io(this.backendUrl),
            time: String,
            errors: [],
            //backendUrl: this.backendUrl
        }
    },

    mounted() {
        //console.log(this.backendUrl)
    },

    created() {
        axios.get('http://' + this.backendUrl + '/api/messages') // reveice message database
            .then((response) => {
            this.messages = response.data;
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            })

        this.socket.on('message', function (data) { // listen new messages from database via backend, and push them ”messages"
            // console.log('Lähetetty viesti: ', data)
            this.messages.push(data)
        }.bind(this))
    },

    updated() {
        this.scrollBottom()
    },

    filters: {
        formatDate: (value) => {
            return moment(String(value)).format('HH:mm:ss')
        },
    },

    methods: {
        // SEND message via websocket
        sendMessage(e) {
            e.preventDefault();

            if (this.message == "") {
                console.log("content missing");
            } else {
                this.socket.emit('new message', {
                user: this.user,
                message: this.message,
                });
            }
            
            this.message = ""
        },

        scrollBottom: () => {
            const msgBody = document.querySelector('#messageBody');
            msgBody.scrollTop = msgBody.scrollHeight - msgBody.clientHeight - 1
        }
    }  
}

</script>

<style>

@media only screen and (max-width : 540px) 
            {
                .chat-sidebar
                {
                    display: none !important;
                }
                
                .chat-popup
                {
                    display: none !important;
                }
            }


            .chat-body {
                background-color: black;
                color:wheat;
                margin-top: 8px;
                padding: 10px;
                font-size: 13px;
                font-family: 'Courier New', Courier, monospace;
            }

            .chat-input-body {
                margin-top:5px;
            }

            /* Tekee asian että input pysyy paikallaan */
            .messages {
                    height: 260px;
                overflow-x: scroll;
                overflow-x: hidden;
            }
   

</style>
