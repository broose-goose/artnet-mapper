<script setup lang="ts">
import {computed, onMounted} from "vue";

import Pixel from "./pixel.vue";

import {useAppStore} from "../store/app-store";

/* state */
const installationStore = useAppStore().installation;
const width = computed(() => installationStore.width);
const height = computed(() => installationStore.height);

const gridString = computed(() => `
  grid-template-columns: repeat(${width.value}, 1fr);
  grid-template-rows: repeat(${height.value}, 1fr);`
);

const canRender = computed(() => width.value !== -1 && height.value !== -1);

/* events */
const emitLaunchSetup = defineEmits(['launch-setup'])

onMounted(() => {
  emitLaunchSetup('launch-setup');
});
</script>

<template>
  <div
      v-if="canRender"
      class="pixel-grid"
      :style="gridString"
  >
    <!-- need to add popover with event emits from child to move it over -->
    <!-- same with clicks probably gets a modal -->
    <!-- and a toolbar for good measure -->
    <template v-for="nRow in height">
      <template v-for="col in width">
        <div class="pixel">
          {{ `${height - nRow}, ${col - 1}` }}
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped>
.pixel-grid {
  margin: 0;
  display: grid;
  align-content: center;
  justify-items: center;
  overflow: auto;
  position:relative;
}
.pixel {
  display: inline-block;
  height: 100%;
  width: 100%;
}
</style>
