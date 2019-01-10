<template>
    <b-form inline @submit.prevent="onSubmit">
      <b-form-group>
        <label class="sr-only" for="name">Nick</label>
        <b-form-input id="name" class="form-control" type="text" v-model="name" placeholder="Your name" />
        <b-button type="submit" variant="success" :disabled="!name">Enter chat</b-button>
      </b-form-group>
    </b-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SocketService from '@/services/SocketService';
import { Type, createMessage } from '@/models/Message';

@Component
export default class Name extends Vue {
//  @Prop() private name!: string;
  private name: string = this.$store.getters.name;

  public onSubmit() {
    if (!this.name) {
      return;
    }
    this.$store.commit('setName', this.name);
    SocketService.socket.emit('message', createMessage(this.name, null, Type.User));
    this.$router.push({ name: 'chat' });
  }
}
</script>
