<template>
  <v-card>
    <v-card-text>
      <v-data-table :headers="headers" :items="items"></v-data-table>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="d-flex justify-space-between">
      <LernendeAddDialog></LernendeAddDialog>
      <LernendeEditDialog></LernendeEditDialog>
    </v-card-actions>
  </v-card>
</template>


<script setup lang="ts">
import {ref, watch} from "vue";
import {useFetch} from "@vueuse/core";
import LernendeAddDialog from "../components/lernende-add-dialog.vue";
import LernendeEditDialog from "../components/lernende-edit-dialog.vue";

const url = ref("http://api.test:8080/lernende");
const {data} = useFetch(url).get().json();
const items = ref<string[]>([]);

const headers = [
  {title: 'Vorname', key: 'vorname'},
  {title: 'Nachname', key: 'nachname'},
  {title: 'Strasse', key: 'strasse'},
  {title: 'Plz', key: 'plz'},
  {title: 'Ort', key: 'ort'},
  {title: 'Geschlecht', key: 'geschlecht'},
  {title: 'Telefon', key: 'telefon'},
  {title: 'Handy', key: 'handy'},
  {title: 'Email', key: 'email'},
  {title: 'Email Privat', key: 'email_privat'},
  {title: 'Geburtsdatum', key: 'birthdate'},
];

watch(data, (newData) => {
  if (newData?.data) {
    items.value = newData.data.map((entry: string) => entry);
  }
});
</script>
