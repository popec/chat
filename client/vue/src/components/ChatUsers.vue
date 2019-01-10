<template>
    <div class="users">
        <ul>
            <li v-for="user in users">
                <span class="user" :class="{ you: user === userName }">{{ user }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ChatUsers extends Vue {
    @Prop() private userName!: string;

    get users(): string[] {
        return this.$store.getters.users;
    }
}
</script>

<style scoped>
    .users {
        border: 1px solid #ccc;
        min-height: 300px;
        max-height: 300px;
        overflow-y: scroll;
    }

    .users ul {
        list-style: none;
        padding: 5px 10px;
    }

    .user.you {
        color: red;
    }
</style>
