<template>
  <v-card>
    <v-data-table :items="items"></v-data-table>
    <CountryAddDialog></CountryAddDialog>
    <CountryEditDialog></CountryEditDialog>
  </v-card>
</template>


<script setup lang="ts">
import {ref, watch} from "vue";
import {useFetch} from "@vueuse/core";
import CountryAddDialog from "../components/country-add-dialog.vue";
import CountryEditDialog from "../components/country-edit-dialog.vue";

const url = ref("http://api.test:8080/laender");
const { data } = useFetch(url).get().json();
const items = ref<string[]>([]);

watch(data, (newData) => {
  if (newData?.data) {
    items.value = newData.data.map((entry: string) => entry);
  }
});
</script>
