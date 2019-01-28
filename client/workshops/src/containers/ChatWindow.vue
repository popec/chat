<template>
    <div class="chat-window">
        <div class="row">
            <div class="col-md-10">
                <ChatMessages :user-name="userName" :messages="messages"/>
                <ChatMessage :user-name="userName" v-on:message="onMessage"/>
            </div>
            <div class="col-md-2">
                <ChatUsers :user-name="userName" :users="users"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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
    },
})

export default class ChatWindow extends Vue {
    get userName(): string {
        return this.$store.getters.name;
    }

    get messages(): Message[] {
        return this.$store.getters.messages;
    }

    get users(): string[] {
        return this.$store.getters.users;
    }

    public onMessage(message: string) {
        console.log('@TODO: Send message');
    }

    public mounted() {
        // Introduce yourself to the server
        SocketService.socket.emit('message', createMessage(this.userName, null, Type.User));
    }
}
</script>
