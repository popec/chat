<template>
  <b-container id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/chat">Chat</router-link>
    </div>
    <router-view/>
  </b-container>
</template>
