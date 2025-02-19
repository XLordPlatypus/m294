<template>
  <v-card>
    <div v-for="(courses, studentName) in groupedByStudent" :key="studentName" class="mb-6">
      <v-card-text>
        <v-card-title>{{ studentName }}</v-card-title>
        <v-data-table
            :headers="headers"
            :items="courses"
            :items-per-page="5"
            class="elevation-1"
        >
        </v-data-table>
      </v-card-text>
    </div>

    <v-divider></v-divider>

    <v-card-actions class="d-flex justify-space-between">
    <Kurse_lernendeAddDialog></Kurse_lernendeAddDialog>
    <Kurse_lernendeEditDialog></Kurse_lernendeEditDialog>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useFetch } from "@vueuse/core";
import Kurse_lernendeAddDialog from "../components/kurse_lernende-add-dialog.vue";
import Kurse_lernendeEditDialog from "../components/kurse_lernende-edit-dialog.vue";

const url = ref("http://api.test:8080/kurse_lernende");
const { data } = useFetch(url).get().json();
const items = ref<any[]>([]);

// Define table headers for course information
const headers = [
  { title: 'Kursnummer', key: 'kursnummer' },
  { title: 'Kursthema', key: 'kursthema' },
  { title: 'Startdatum', key: 'startdatum' },
  { title: 'Enddatum', key: 'enddatum' },
  { title: 'Dauer', key: 'dauer' },
  { title: 'Rolle', key: 'role' },
];

// Watch for data changes and update items
watch(data, (newData) => {
  if (newData?.data) {
    items.value = newData.data;
  }
});

// Group items by student name (combining first and last name)
const groupedByStudent = computed(() => {
  const grouped: Record<string, any[]> = {};

  items.value.forEach(item => {
    // Create a full name for the student
    const studentName = `${item.vorname} ${item.nachname}`;

    if (!grouped[studentName]) {
      grouped[studentName] = [];
    }
    grouped[studentName].push(item);
  });

  return grouped;
});
</script>