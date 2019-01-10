<template>
    <div class="chat-window">
        <div class="row">
            <div class="col-md-10">
                <ChatMessages :user-name="userName"/>
                <ChatMessage :user-name="userName"/>
            </div>
            <div class="col-md-2">
                <ChatUsers :user-name="userName"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Message, Type, createMessage } from '@/models/Message';
import SocketService from '@/services/SocketService';
import ChatMessages from '@/components/ChatMessages.vue';
import ChatMessage from '@/components/ChatMessage.vue';
import ChatUsers from '@/components/ChatUsers.vue';

@Component({
    components: {
        ChatMessages,
        ChatMessage,
        ChatUsers,
    }
})

export default class ChatWindow extends Vue {
    get userName(): string {
        return this.$store.getters.name;
    }

    public mounted() {
        SocketService.socket.on('message', function(message: Message) {
            var container = document.querySelector(".messages");
            (container) && (container.scrollTop = container.scrollHeight);
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
