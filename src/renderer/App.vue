<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Artnet Mapper" />
    <v-main class="d-flex" style="min-height: 300px;">
      <v-btn @click="sendDgram">
        Send UDP to 9999
      </v-btn>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from "vue";
import {Socket} from "node:dgram";
const dgram = require('dgram')

let client: Socket | null = null;

onBeforeUnmount(() => {
  if (client !== null) {
    client.close();
    client = null
  }
})

function sendDgram() {
  if (client === null) {
    client = dgram.createSocket('udp4');
  }
  const message = Buffer.from('Some bytes');
  client?.send(message, 9999, '127.0.0.1', (err: any) => {
    if (err) {
      console.log(err);
    }
  });

}
</script>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
