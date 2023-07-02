<script setup lang="ts">
import {computed, ref} from "vue";
import Installation from "./components/installation.vue";
import InstallationSetupModal from "./components/installationSetupModal.vue";
import {useAppStore} from "./store/app-store";

const appStore = useAppStore()
const installationSetupIsOpen = ref(false);

computed(() => appStore.installation)
</script>

<template>
  <v-layout class="rounded rounded-md wrapper">
    <v-app-bar title="Artnet Mapper" />
    <v-main class="d-flex">
      <installation
        @launch-setup="installationSetupIsOpen = true"
      />
    </v-main>
    <installation-setup-modal v-model:is-open="installationSetupIsOpen" />
  </v-layout>
</template>

<style scoped>
.wrapper {
  height: 100vh;
  overflow: hidden;
}
.main {
  width:100vw;
  height:100vh;
}
</style>
