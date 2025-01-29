<template>
  <v-card>
    <v-data-table :items="items"></v-data-table>
  </v-card>
</template>


<script setup lang="ts">
import {ref, watch} from "vue";
import {useFetch} from "@vueuse/core";

const url = ref("http://api.test/kurse");
const { data } = useFetch(url).get().json();
const items = ref<string[]>([]);

watch(data, (newData) => {
  if (newData?.data) {
    items.value = newData.data.map((entry: string) => entry);
  }
});
</script>
