<script setup lang="ts">
import {useAppStore} from "../store/app-store";
import {computed, watch, ref, toRefs, ComputedRef} from "vue";


import {Pixel} from "../domain/pixel";

/* setup */
const props = defineProps({
  isOpen: { type: Boolean, required: true },
  pixelNumber: { type: Number }
})
const { isOpen, pixelNumber } = toRefs(props);
const emits = defineEmits(['close'])

const store = useAppStore();
const pixel: ComputedRef<Pixel | null> = computed(() => {
  if (!pixelNumber?.value || pixelNumber.value > -1) {
    return null;
  } else {
    return store.installation.pixels[pixelNumber.value];
  }
});

const canSubmit = false;

function submit() {

}

/* dialog open */
const localIsOpen = ref(props.isOpen);
watch(isOpen, (newValue) => {
  localIsOpen.value = newValue
});
watch(localIsOpen, (newValue) => {
  if (!newValue) {
    emits('close');
  }
})
</script>

<template>
  <v-dialog
      v-model="localIsOpen"
      max-width="500px"
      :persistent="true"
  >
    <v-card>
      <v-card-title>Assign Pixels Artnet Values</v-card-title>
      <v-card-text>

      </v-card-text>
      <v-card-actions>
        <v-btn
            class="ml-auto"
            variant="outlined"
            color="secondary"
            :disabled="!canSubmit"
            @click="submit"
        >
          Submit
        </v-btn>
        <v-btn
            variant="outlined"
            color="error"
            @click="localIsOpen = false"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
