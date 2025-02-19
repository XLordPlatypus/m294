<template>
  <v-card>
    <v-card-text>
      <v-card-text></v-card-text>
      <v-data-table :headers="headers" :items="items"></v-data-table>
    </v-card-text>

    <v-card-actions class="d-flex justify-space-between">
      <CountryAddDialog></CountryAddDialog>
      <CountryEditDialog></CountryEditDialog>
    </v-card-actions>
  </v-card>
</template>


<script setup lang="ts">
import {ref, watch} from "vue";
import {useFetch} from "@vueuse/core";
import CountryAddDialog from "../components/country-add-dialog.vue";
import CountryEditDialog from "../components/country-edit-dialog.vue";

const url = ref("http://api.test:8080/laender");
const {data} = useFetch(url).get().json();
const items = ref<string[]>([]);

const headers = [
  {title: 'Land', key: 'country'},
];

watch(data, (newData) => {
  if (newData?.data) {
    items.value = newData.data.map((entry: string) => entry);
  }
});
</script>
