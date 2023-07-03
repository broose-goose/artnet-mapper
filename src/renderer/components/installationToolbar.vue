<script setup lang="ts">
import {ref, watch} from 'vue';
import {useAppStore} from "../store/app-store";
import {InstallationState} from "../domain/app";

const store = useAppStore();

const localActiveTool = ref(store.state);
watch(localActiveTool, (newValue) => {
  store.setInstallationState(newValue);
})
</script>

<template>
  <v-btn-toggle
      v-model="localActiveTool"
      :divided="true"
      :mandatory="true"
      class="toolbar"
  >
    <v-btn>
      <v-tooltip
          activator="parent"
          location="bottom"
          class='custom-tooltip'
      >
        Move
      </v-tooltip>
      <v-icon>fas fa-arrows</v-icon>
    </v-btn>
    <v-btn>
      <v-tooltip
          activator="parent"
          location="bottom"
          class='custom-tooltip'
      >
        Assign
      </v-tooltip>
      <v-icon>fas fa-plus</v-icon>
    </v-btn>
    <v-btn>
      <v-tooltip
          activator="parent"
          location="bottom"
          class='custom-tooltip'
      >
        Group
      </v-tooltip>
      <v-icon>fas fa-edit</v-icon>
    </v-btn>
    <v-btn>
      <v-tooltip
          activator="parent"
          location="bottom"
          class='custom-tooltip'
      >
        Toggle
      </v-tooltip>
      <v-icon>fas fa-lightbulb</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<style scoped>
.custom-tooltip :deep(.v-overlay__content) {
  background: rgba(189, 189, 189, 1) !important;
}
.toolbar {
  position: fixed;
  top: 80px;
  left: 16px;
}
</style>
