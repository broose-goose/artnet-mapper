<script setup lang="ts">
import {computed, onMounted, PropType, toRefs, ref, Ref} from "vue";
import * as panzoom from "panzoom";

const props = defineProps({
  options: {
    type: Object as PropType<panzoom.PanZoomOptions>,
    default: () => {}
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

const customSlot: Ref<Element | null> = ref(null);
const registerRef = (el: Element) => {
  customSlot.value = el
}

onMounted(() => {
  console.log(customSlot.value)
})
</script>

<template>
  <div class="vue-pan-zoom-item">
    <div class="vue-pan-zoom-scene" ref="scene">
      <slot name="customSlot" :registerRef="registerRef"></slot>
    </div>
  </div>
</template>

<style scoped>

</style>
