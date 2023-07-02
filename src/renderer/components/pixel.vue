<script setup lang="ts">
import { computed } from "vue";

import {useAppStore} from "../store/app-store";

const props = defineProps({
  pixelIndex: { type: Number, required: true }
})

const pixelStore = useAppStore();
const pixel = computed(() => pixelStore.installation.pixels[props.pixelIndex]);
</script>

<template>
  <div>
    {{ `${pixel.xPosition}, ${pixel.yPosition}` }}
  </div>
</template>

<style scoped>

</style>
