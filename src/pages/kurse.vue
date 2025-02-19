<template>
  <v-card>
    <v-card-text>
      <v-data-table :items="items"></v-data-table>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="d-flex justify-space-between">
      <KurseAddDialog></KurseAddDialog>
      <KurseEditDialog></KurseEditDialog>
    </v-card-actions>
  </v-card>
</template>


<script setup lang="ts">
import {ref, watch} from "vue";
import {useFetch} from "@vueuse/core";
import KurseAddDialog from "../components/kurse-add-dialog.vue";
import KurseEditDialog from "../components/kurse-edit-dialog.vue";

const url = ref("http://api.test:8080/kurse");
const {data} = useFetch(url).get().json();
const items = ref<string[]>([]);

watch(data, (newData) => {
  if (newData?.data) {
    items.value = newData.data.map((entry: string) => entry);
  }
});
</script>
