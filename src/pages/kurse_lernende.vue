<template>
  <div>
    <h1 class="mb-4">Courses by Student</h1>

    <!-- Loop through each student group -->
    <div v-for="(courses, studentName) in groupedByStudent" :key="studentName" class="mb-6">
      <v-card>
        <v-card-title>{{ studentName }}</v-card-title>
        <v-data-table
            :headers="headers"
            :items="courses"
            :items-per-page="5"
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

    <Kurse_lernendeAddDialog></Kurse_lernendeAddDialog>
    <Kurse_lernendeEditDialog></Kurse_lernendeEditDialog>
  </div>
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
  { title: 'Course Number', key: 'kursnummer' },
  { title: 'Course Topic', key: 'kursthema' },
  { title: 'Start Date', key: 'startdatum' },
  { title: 'End Date', key: 'enddatum' },
  { title: 'Duration', key: 'dauer' },
  { title: 'Role', key: 'role' },
  { title: 'Actions', key: 'actions', sortable: false }
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

// Functions for handling edit and delete actions
const editItem = (item: any) => {
  console.log('Edit item:', item);
  // Implement edit functionality or trigger dialog
};

const deleteItem = (item: any) => {
  console.log('Delete item:', item);
  // Implement delete functionality
};
</script>