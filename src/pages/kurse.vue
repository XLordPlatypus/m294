<template>
  <v-card>
    <v-card-text>
      <v-data-table :headers="headers" :items="items"></v-data-table>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="d-flex justify-space-between">
      <KurseAddDialog></KurseAddDialog>
      <KurseEditDialog></KurseEditDialog>
    </v-card-actions>
  </v-card>
</template>


<script setup lang="ts">
import {ref, watch} from "vue";
import {useFetch} from "@vueuse/core";
import KurseAddDialog from "../components/kurse-add-dialog.vue";
import KurseEditDialog from "../components/kurse-edit-dialog.vue";

const url = ref("http://api.test:8080/kurse");
const {data} = useFetch(url).get().json();
const items = ref<string[]>([]);

const headers = [
  { title: 'Kursnummer', key: 'kursnummer' },
  { title: 'Kursthema', key: 'kursthema' },
  { title: 'Inhalt', key: 'inhalt' },
  { title: 'Stardatum', key: 'startdatum' },
  { title: 'Enddatum', key: 'enddatum' },
  { title: 'Dauer', key: 'dauer' },
  { title: 'Vorname', key: 'vorname' },
  { title: 'Nachname', key: 'nachname' },
  { title: 'Strasse', key: 'strasse' },
  { title: 'Plz', key: 'plz' },
  { title: 'Ort', key: 'ort' },
  { title: 'Geschlecht', key: 'geschlecht' },
  { title: 'Telefon', key: 'telefon' },
  { title: 'Handy', key: 'handy' },
  { title: 'Email', key: 'email' },
  { title: 'Geburtsdatum', key: 'birthdate' },
];

watch(data, (newData) => {
  if (newData?.data) {
    items.value = newData.data.map((entry: string) => entry);
  }
});
</script>
