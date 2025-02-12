<template>
  <v-card>
    <v-data-table :items="items"></v-data-table>
    <Kurse_lernendeAddDialog></Kurse_lernendeAddDialog>
    <Kurse_lernendeEditDialog></Kurse_lernendeEditDialog>
  </v-card>
</template>


<script setup lang="ts">
import {ref, watch} from "vue";
import {useFetch} from "@vueuse/core";
import Kurse_lernendeAddDialog from "../components/kurse_lernende-add-dialog.vue";
import Kurse_lernendeEditDialog from "../components/kurse_lernende-edit-dialog.vue";

const url = ref("http://api.test:8080/kurse_lernende");
const { data } = useFetch(url).get().json();
const items = ref<string[]>([]);

watch(data, (newData) => {
  if (newData?.data) {
    items.value = newData.data.map((entry: string) => entry);
  }
});
</script>
