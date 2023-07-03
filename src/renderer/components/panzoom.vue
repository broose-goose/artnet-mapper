<script setup lang="ts">
import {computed, onMounted, PropType, toRefs, ref, Ref} from "vue";
import * as panzoom from "panzoom";
import panZoom from 'panzoom';

const props = defineProps({
  options: {
    type: Object as PropType<panzoom.PanZoomOptions>,
    default: () => {}
  },
  isPaused: {
    type: Boolean,
    required: true
  }
});
const { options } = toRefs(props);

const defaultOptions: panzoom.PanZoomOptions = {
  autocenter: true,
  bounds: true,
  transformOrigin: {
    x: 0.5,
    y: 0.5,
  }
};
const panzoomOptions = computed(() => Object.assign({}, defaultOptions, options));

let panzoomInstance: panzoom.PanZoom | null = null;

const sceneWrapper: Ref<HTMLElement | null> = ref(null);

onMounted(() => {
  if (!sceneWrapper.value) {
    console.error("Issue rendering panzoom");
    return;
  }
  if (sceneWrapper.value?.children.length !== 1) {
    console.error("Panzoom requires 1 child passed");
    return;
  }
  const scene = sceneWrapper.value?.firstElementChild as HTMLElement;
  panzoomInstance = panZoom(scene, panzoomOptions.value);
})
</script>

<template>
  <div class="vue-pan-zoom-item">
    <div class="vue-pan-zoom-scene" ref="sceneWrapper">
      <slot name="scene"></slot>
    </div>
  </div>
</template>

<style scoped>

</style>
