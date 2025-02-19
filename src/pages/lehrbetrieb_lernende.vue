<template>
  <div>
    <h1 class="mb-4">Apprentices by Company</h1>

    <!-- Loop through each company group -->
    <div v-for="(apprentices, companyName) in groupedByCompany" :key="companyName" class="mb-6">
      <v-card>
        <v-card-title>{{ companyName }}</v-card-title>
        <v-data-table
            :headers="headers"
            :items="apprentices"
            :items-per-page="10"
            class="elevation-1"
        >
          <!-- Optional: Add action buttons -->
          <template v-slot:item.actions="{ item }">
            <v-btn icon small @click="editItem(item)">
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon small @click="deleteItem(item)" class="ml-2">
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </div>

    <Lehrbetrieb_lernendeAddDialog></Lehrbetrieb_lernendeAddDialog>
    <LehrbetriebeEditDialog></LehrbetriebeEditDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useFetch } from "@vueuse/core";
import Lehrbetrieb_lernendeAddDialog from "../components/lehrbetrieb_lernende-add-dialog.vue";
import LehrbetriebeEditDialog from "../components/lehrbetriebe-edit-dialog.vue";

const url = ref("http://api.test:8080/lehrbetrieb_lernende");
const { data } = useFetch(url).get().json();
const items = ref<any[]>([]);

// Define table headers based on the actual response structure
const headers = [
  { title: 'Vorname', key: 'vorname' },
  { title: 'Nachname', key: 'nachname' },
  { title: 'Beruf', key: 'beruf' },
  { title: 'Start', key: 'start' },
  { title: 'Ende', key: 'ende' },
  { title: 'Email', key: 'email' },
  { title: 'Actions', key: 'actions', sortable: false }
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

// Functions for handling edit and delete actions (implement as needed)
const editItem = (item: any) => {
  console.log('Edit item:', item);
  // Implement edit functionality
};

const deleteItem = (item: any) => {
  console.log('Delete item:', item);
  // Implement delete functionality
};
</script>