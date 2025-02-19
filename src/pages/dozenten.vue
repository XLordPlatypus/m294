<template>
  <v-card>
    <v-card-title>Dozenten Verwaltung</v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="tableItems"></v-data-table>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="d-flex justify-space-between">
      <DozentAddDialog></DozentAddDialog>
      <DozentEditDialog :items="tableItems"></DozentEditDialog>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useFetch } from "@vueuse/core";
import DozentAddDialog from "../components/dozent-add-dialog.vue";
import DozentEditDialog from "../components/dozent-edit-dialog.vue";

const url = ref("http://api.test:8080/dozenten");
const { data } = useFetch(url).get().json();
const tableItems = ref<string[]>([]);

const headers = [
  { title: 'Vorname', key: 'vorname' },
  { title: 'Nachname', key: 'nachname' },
  { title: 'Strasse', key: 'strasse' },
  { title: 'Plz', key: 'plz' },
  { title: 'Ort', key: 'ort' },
  { title: 'Geschlecht', key: 'geschlecht' },
  { title: 'Telefon', key: 'telefon' },
  { title: 'Handy', key: 'handy' },
  { title: 'E-Mail', key: 'email' },
  { title: 'E-Mail Privat', key: 'email_privat' },
  { title: 'Geburtsdatum', key: 'birthdate' },
];

watch(data, (newData) => {
  if (newData?.data) {
    tableItems.value = newData.data.map((entry: any) => entry);
  }
});
</script>