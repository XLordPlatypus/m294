<template>
  <v-card>
    <v-data-table :items="items"></v-data-table>
    <Lehrbetrieb_lernendeAddDialog></Lehrbetrieb_lernendeAddDialog>
    <LehrbetriebeEditDialog></LehrbetriebeEditDialog>
  </v-card>
</template>


<script setup lang="ts">
import {ref, watch} from "vue";
import {useFetch} from "@vueuse/core";
import Lehrbetrieb_lernendeAddDialog from "../components/lehrbetrieb_lernende-add-dialog.vue";
import LehrbetriebeEditDialog from "../components/lehrbetriebe-edit-dialog.vue";

const url = ref("http://api.test:8080/lehrbetriebe_lernende");
const { data } = useFetch(url).get().json();
const items = ref<string[]>([]);

watch(data, (newData) => {
  if (newData?.data) {
    items.value = newData.data.map((entry: string) => entry);
  }
});
</script>
