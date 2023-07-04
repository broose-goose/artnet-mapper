<script setup lang="ts">
import {computed, ref, Ref, watch} from "vue";

import {useAppStore} from "../store/app-store";
import Panzoom from "./panzoom.vue";
import {InstallationState} from "../domain/app";
import AssigningModal from "./assigningModal.vue";

/* state */
const assigningModalIsOpen = ref(false);


const store = useAppStore()
const installationStore = store.installation;
const width = computed(() => installationStore.width);
const height = computed(() => installationStore.height);
const pixels = computed(() => installationStore.pixels);

const state = computed(() => store.state);
const isPointer = computed(() => state.value !== InstallationState.Moving);

const gridStyleString = computed(() => `
  width: ${width.value * 48}px; height: ${height.value * 48}px;
`)
const canRender = computed(() => width.value !== -1 && height.value !== -1);

let selectedPixel: Ref<number> = ref(-1);

watch(state, () => {
  selectedPixel.value = -1;
})

function PixelClick(event: Event, pixelNumber: number) {
  if (state.value === InstallationState.Toggling) {
    store.togglePixel(pixelNumber);
  } else if (state.value !== InstallationState.Moving) {
    selectedPixel.value = pixelNumber;
  }
}

function PixelHover(event: Event, pixelNumber: number) {

}

function PixelLeave(pixelNumber: number) {

}
</script>

<template>
  <panzoom
      v-if="canRender"
      class="grid-wrapper"
  >
    <template #scene>
      <div
        class="pixel-grid"
        :class="{
          'pixel-pointer': isPointer
        }"
        :style="gridStyleString"
      >
        <template v-for="(pixel, pixelNumber) in pixels" :key="pixelNumber">
            <div
                class="pixel"
                :class="[
                    `type-${pixel.pixelType}`,
                    { 'is-active': pixel.isActive },
                    { 'selected': pixelNumber === selectedPixel }
                ]"
                :id="`pixel-${pixelNumber}`"
                @click="PixelClick($event, pixelNumber)"
                @mouseenter="PixelHover($event, pixelNumber)"
                @mouseleave="PixelLeave(pixelNumber)"
            >
              {{ `${pixel.xPosition}, ${pixel.yPosition}` }}
            </div>
        </template>
      </div>
      <template v-if="state === InstallationState.Assigning">
        <assigning-modal
            :is-open="selectedPixel !== -1"
            :pixel-number="selectedPixel"
            @close="selectedPixel = -1"
        />
      </template>
    </template>
  </panzoom>
</template>

<style scoped lang="scss">
.grid-wrapper {
  width: 100vw;
}
.pixel-grid.pixel-pointer > .pixel {
  cursor: pointer;
}
.pixel-menu {
  position: absolute;
  z-index: 99;
  bottom: 0;
}
.pixel {
  position:relative;
  display: inline-block;
  border: 1px solid;
  height: 48px;
  width: 48px;
  cursor: default;
  &.type-0 {
    border-color: #00BCD4;
    color: #00BCD4;
    &:hover {
      background: rgba(#00BCD4, 0.25);
    }
    &:active, &.selected {
      background: rgba(#00BCD4, 0.5);
    }
    &.is-active {
      background-color: #00BCD4;
      color: white;
      &:hover {
        background: rgba(#00BCD4, 0.75);
      }
    }
  }
  &.type-1 {
    border-color: #4CAF50;
    color: #4CAF50;
    &:hover {
      background: rgba(#4CAF50, 0.25);
    }
    &:active, &.selected {
      background: rgba(#4CAF50, 0.5);
    }
    &.is-active {
      background-color: #4CAF50;
      color: white;
      &:hover {
        background: rgba(#4CAF50, 0.75);
      }
    }
  }
  &.type-2 {
    border-color: #673AB7;
    color: #673AB7;
    &:hover {
      background: rgba(#673AB7, 0.25);
    }
    &:active, &.selected {
      background: rgba(#673AB7, 0.5);
    }
    &.is-active {
      background-color: #673AB7;
      color: white;
      &:hover {
        background: rgba(#673AB7, 0.75);
      }
    }
  }
}
</style>
