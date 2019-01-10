<template>
    <div class="messages">
        <ul>
            <li v-for="message in messages">
                <span class="sender" :class="{ you: message.sender === userName }">{{ message.sender }}: </span>
                <span class="message">{{ message.content }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Message } from '@/models/Message';

export default Vue.extend({
    props: [ 'userName' ],
    computed: {
        messages(): Message[] {
            return this.$store.getters.messages;
        }
    }
});

</script>

<style scoped>
    .messages {
        border: 1px solid #ccc;
        min-height: 300px;
        max-height: 300px;
        overflow-y: scroll;
    }

    .messages ul {
        list-style: none;
        padding: 5px 10px;
    }
</style>
