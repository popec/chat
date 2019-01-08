<template>
    <form class="form-inline" v-on:submit.prevent="onSubmit">
      <div class="form-group">
        <label for="name">Nick</label>
        <input id="name" class="form-control" type="text" v-model="name" placeholder="Your name">
        <button type="submit" class="btn btn-success">Enter chat</button>
      </div>
    </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SocketService from '@/services/SocketService';
import { Type, createMessage } from '@/models/Message';

@Component
export default class Name extends Vue {
//  @Prop() private name!: string;
  private name: string = this.$store.getters.name || '';

  public onSubmit() {
    this.$store.commit('setName', this.name);
    SocketService.socket.emit('message', createMessage(this.name, null, Type.User));
    this.$router.push({ name: 'chat' });
  }
}
</script>
