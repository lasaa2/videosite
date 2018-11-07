

<template>
    <div class="popup-box chat-popup">

        <div class="chats">
            <div v-for="(msg, index) in messages" :key="index">      
                <div class="popup-messages">
                    <p class="time-left">{{msg.date | formatDate}}
                    {{ msg.user }} <span>says:</span> 
                    </p> {{ msg.content }}
                </div>

            </div>
        </div>

        <form @submit.prevent="sendMessage">
            
            <input placeholder="user" v-model="user">
            
            <input placeholder="message" v-model="message"/>

            <button type="submit">Send</button>
        </form>
        
    </div>
</template>

<script>

/* Viestin laitto tietokantaan toimii, getteri ei toimi.? */

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

    data() {
        return {
            newMessage: "",
            user: '',
            message: '',
            messages: [],
            socket : io('localhost:3002'),
            time: String,
            errors: []
        }
    },

    created() {
        axios.get('http://localhost:3002/api/messages') // reveice message database
            .then((response) => {
            this.messages = response.data;
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            })

        this.socket.on('message', function (data) { // listen new messages from database via backend, and push them ”messages"
            const parse = JSON.parse(data)
            console.log(parse)
            this.messages.push(data)
        }.bind(this))
    },

    filters: {
        formatDate: (value) => {
            return moment(String(value)).format('DD/MM/YYYY hh:mm:ss')
        }
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
        },
        
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
            
            /* Määritellään popup-boxin koko ja yleiset sälät  */

            .popup-box
            {
                display: block;
                position: fixed;
                bottom: 0px;
                right: 20px;
                height: 285px;
                background-color: rgb(237, 239, 244);
                width: 300px;
                border: 1px solid rgba(29, 49, 91, .3);
            }
            
            .popup-box .popup-head
            {
                background-color: #6d84b4;
                padding: 5px;
                color: white;
                font-weight: bold;
                font-size: 14px;
                clear: both;
            }
            
            .popup-box .popup-head .popup-head-left
            {
                float: left;
            }
            
            .popup-box .popup-head .popup-head-right
            {
                float: right;
                opacity: 0.5;
            }
            
            .popup-box .popup-head .popup-head-right a
            {
                text-decoration: none;
                color: inherit;
            }

            /* Tekee asian että input pysyy paikallaan */
            .chats {
                    height: 260px;
                overflow-x: scroll;
                overflow-x: hidden;
            }
   

</style>
