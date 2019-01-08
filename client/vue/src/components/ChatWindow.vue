<template>
    <div class="chat-window">
        <div class="row">
            <div class="col-md-10">
                <div class="messages">
                    <ul>
                        <li v-for="message in messages">
                            <span class="sender" :class="{ you: message.sender === userName }">{{ message.sender }}: </span>
                            <span class="message">{{ message.content }}</span>
                        </li>
                    </ul>
                </div>
                <div class="row message">
                    <div class="col-md-1 text-right">
                        {{ userName }}:
                    </div>
                    <div class="col-md-11">
                        <form novalidate v-on:submit.prevent="onSubmit">
                            <input type="text" class="form-control" v-model="message"/>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="users">
                    <ul>
                        <li v-for="user in users">
                            <span class="user" :class="{ you: user === userName }">{{ user }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Message, Type, createMessage } from '@/models/Message';
import SocketService from '@/services/SocketService';

@Component
export default class ChatWindow extends Vue {
    private message: string = '';


    get userName(): string {

        return this.$store.getters.name;
    }

    get messages(): Message[] {
        return this.$store.getters.messages;
    }

    get users(): string[] {
        return this.$store.getters.users;
    }

    public onSubmit() {
        SocketService.socket.emit('message', createMessage(this.userName, this.message, Type.Message));
        this.message = '';
    }

    public mounted() {
        SocketService.socket.on('message', function(message: Message) {
            var container = document.querySelector(".messages");
            container.scrollTop = container.scrollHeight;
        })
    }
}
</script>

<style>
    .users,
    .messages {
        border: 1px solid #ccc;
        min-height: 300px;
        max-height: 300px;
        overflow-y: scroll;
    }

    .users ul,
    .messages ul {
        list-style: none;
        padding: 5px 10px;
    }

    .sender {
        font-weight: bold;
    }

    .user.you,
    .sender.you {
        color: red;
    }
</style>
