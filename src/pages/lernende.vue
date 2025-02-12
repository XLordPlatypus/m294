<template>
  <v-card>
    <v-data-table :items="items"></v-data-table>
    <LernendeAddDialog></LernendeAddDialog>
    <LernendeEditDialog></LernendeEditDialog>
  </v-card>
</template>


<script setup lang="ts">
import {ref, watch} from "vue";
import {useFetch} from "@vueuse/core";
import LernendeAddDialog from "../components/lernende-add-dialog.vue";
import LernendeEditDialog from "../components/lernende-edit-dialog.vue";

const url = ref("http://api.test:8080/lernende");
const { data } = useFetch(url).get().json();
const items = ref<string[]>([]);

watch(data, (newData) => {
  if (newData?.data) {
    items.value = newData.data.map((entry: string) => entry);
  }
});
</script>
