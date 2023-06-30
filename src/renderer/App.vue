<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Artnet Mapper" />
    <v-main class="d-flex" style="min-height: 300px;">
      Main content
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

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
