<template>
  <v-card>
    <v-data-table :items="tableItems"></v-data-table>
    <DozentAddDialog></DozentAddDialog>
    <DozentEditDialog :items="tableItems"></DozentEditDialog>
  </v-card>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {useFetch} from "@vueuse/core";
import DozentAddDialog from "../components/dozent-add-dialog.vue";
import DozentEditDialog from "../components/dozent-edit-dialog.vue";

const url = ref("http://api.test:8080/dozenten");
const {data} = useFetch(url).get().json();
const tableItems = ref<string[]>([]);

watch(data, (newData) => {
  if (newData?.data) {
    tableItems.value = newData.data.map((entry: any) => entry);
  }
});
</script>
