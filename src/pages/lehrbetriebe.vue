<template>
  <v-card>
    <v-card-text>
      <v-data-table :items="items"></v-data-table>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="d-flex justify-space-between">
      <LehrbetriebeAddDialog></LehrbetriebeAddDialog>
      <LehrbetriebeEditDialog></LehrbetriebeEditDialog>
    </v-card-actions>
  </v-card>
</template>


<script setup lang="ts">
import {ref, watch} from "vue";
import {useFetch} from "@vueuse/core";
import LehrbetriebeAddDialog from "../components/lehrbetriebe-add-dialog.vue";
import LehrbetriebeEditDialog from "../components/lehrbetriebe-edit-dialog.vue";

const url = ref("http://api.test:8080/lehrbetriebe");
const {data} = useFetch(url).get().json();
const items = ref<string[]>([]);

watch(data, (newData) => {
  if (newData?.data) {
    items.value = newData.data.map((entry: string) => entry);
  }
});
</script>
