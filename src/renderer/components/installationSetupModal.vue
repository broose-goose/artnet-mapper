<script setup lang="ts">
import {ref, toRef, watch, defineEmits, computed, nextTick} from "vue";

import {useAppStore} from "../store/app-store";

/* setup */
const props = defineProps({
  isOpen: { type: Boolean, required: true }
})
const emits = defineEmits({
  'update:isOpen': (value) => typeof value === 'boolean',
})

/* global state */
const store = useAppStore();
const installationStore = useAppStore().installation;

// localState
const loading = ref(false);

const width = ref(installationStore.width);
watch(toRef(installationStore, 'width'), (newValue) => {
  width.value = newValue;
});
const height = ref(installationStore.height);
watch(toRef(installationStore, 'height'), (newValue) => {
  height.value = newValue;
});
const isRgbw = ref(installationStore.colorCount === 4);
watch(toRef(installationStore, 'colorCount'), (newValue) => {
  isRgbw.value = newValue === 4;
});

const reset = () => {
  width.value = installationStore.width;
  height.value = installationStore.height;
  isRgbw.value = installationStore.colorCount === 4;
}

const hasChange = computed(() =>
    width.value !== installationStore.width ||
      height.value !== installationStore.height ||
      isRgbw.value !== (installationStore.colorCount === 4)
);
const hasBeenSet = computed(() => {
  return installationStore.width !== -1 && installationStore.height !== -1;
})
const isUnset = computed(() => {
  const intWidth = Number(width.value);
  const intHeight = Number(height.value);
  return intWidth <= 0 || intHeight <= 0 ||
      !Number.isInteger(intWidth) || !Number.isInteger(intHeight);
});
const canSubmit = computed(() => hasChange.value && !isUnset.value);

/* dialog open */
const localIsOpen = ref(props.isOpen);
watch(toRef(props, 'isOpen'), (newValue) => {
  localIsOpen.value = newValue
});
watch(localIsOpen, (newValue) => {
  emits('update:isOpen', newValue);
})

async function submit() {
  loading.value = true;
  await nextTick();
  store.setupInstallation(Number(width.value), Number(height.value), isRgbw.value);
  localIsOpen.value = false;
  await nextTick();
  loading.value = false;
}

</script>

<template>
  <v-dialog
      v-model="localIsOpen"
      max-width="500px"
      :persistent="true"
  >
    <v-card>
      <v-card-title>Setup Installation</v-card-title>
      <template v-if="!loading">
        <v-card-text>
          <v-container class="pa-0">
            <v-row no-gutters>
              <v-col class="mx-2">
                <v-text-field
                    label="Width"
                    v-model="width"
                    type="number"
                />
              </v-col>
              <v-col class="mx-2">
                <v-switch
                    v-model="isRgbw"
                    label="RGBW"
                    :inset="true"
                ></v-switch>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col class="mx-2">
                <v-text-field
                    label="Height"
                    v-model="height"
                    type="number"
                />
              </v-col>
              <v-col class="mx-2"></v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
              variant="outlined"
              :disabled="!hasChange"
              @click="reset"
          >
            Reset
          </v-btn>
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
              :disabled="!hasBeenSet"
              @click="localIsOpen = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </template>
      <v-card-text
          v-else
          class="my-8 text-center"
      >
        <v-progress-circular
            color="primary"
            indeterminate
            :size="80"
            :width="10"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
