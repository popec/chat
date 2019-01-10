<template>
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
</template>
<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import SocketService from '@/services/SocketService';
    import { Type, createMessage } from '@/models/Message';

    @Component
    export default class ChatMessage extends Vue {
        @Prop() private userName!: string;
        private message: string = '';

        public onSubmit() {
            SocketService.socket.emit('message', createMessage(this.userName, this.message, Type.Message));
            this.message = '';
        }
    }
</script>

<style scoped>

</style>
