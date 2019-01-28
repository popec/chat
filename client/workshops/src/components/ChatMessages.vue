<template>
    <div class="messages">
        <ul>
            <li>
                <span class="sender you">You: </span>
                <span class="message">Hello world</span>
            </li>
            <li>
                <span class="sender">User: </span>
                <span class="message">Welcome</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

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

    .you {
        color: red;
    }
</style>
