<template>
  <v-card>
    <v-card-text v-for="(apprentices, companyName) in groupedByCompany" :key="companyName" class="mb-6">
      <v-card>
        <v-card-title>{{ companyName }}</v-card-title>
        <v-data-table
            :headers="headers"
            :items="apprentices"
            :items-per-page="10"
            class="elevation-1">
        </v-data-table>
      </v-card>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="d-flex justify-space-between">
      <Lehrbetrieb_lernendeAddDialog></Lehrbetrieb_lernendeAddDialog>
      <LehrbetriebeEditDialog></LehrbetriebeEditDialog>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import {ref, watch, computed} from "vue";
import {useFetch} from "@vueuse/core";
import Lehrbetrieb_lernendeAddDialog from "../components/lehrbetrieb_lernende-add-dialog.vue";
import LehrbetriebeEditDialog from "../components/lehrbetriebe-edit-dialog.vue";

const url = ref("http://api.test:8080/lehrbetrieb_lernende");
const {data} = useFetch(url).get().json();
const items = ref<any[]>([]);

// Define table headers based on the actual response structure
const headers = [
  {title: 'Vorname', key: 'vorname'},
  {title: 'Nachname', key: 'nachname'},
  {title: 'Beruf', key: 'beruf'},
  {title: 'Start', key: 'start'},
  {title: 'Ende', key: 'ende'},
  {title: 'Email', key: 'email'},
  {title: 'Actions', key: 'actions', sortable: false}
];

// Watch for data changes and update items
watch(data, (newData) => {
  if (newData?.data) {
    items.value = newData.data;
  }
});

// Group items by company name
const groupedByCompany = computed(() => {
  const grouped: Record<string, any[]> = {};

  items.value.forEach(item => {
    const companyName = item.firma;
    if (!grouped[companyName]) {
      grouped[companyName] = [];
    }
    grouped[companyName].push(item);
  });

  return grouped;
});
</script>