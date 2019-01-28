<template>
  <b-container id="app">
      <ChatWindow/>
  </b-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import ChatWindow from '@/containers/ChatWindow.vue'; // @ is an alias to /src

  @Component({
    components: {
      ChatWindow,
    },
  })
  export default class Chat extends Vue {}
</script>
