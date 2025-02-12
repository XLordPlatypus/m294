<template>
  <v-card>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Add Kurs"
            variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Add Kurs">
          <v-container>
            <v-text-field v-model="kursnummer" label="Kursnummer"></v-text-field>
            <v-text-field v-model="kursthema" label="Kursthema"></v-text-field>
            <v-textarea v-model="inhalt" label="Inhalt"></v-textarea>
            <v-text-field v-model="startdatum" type="date" label="Startdatum"></v-text-field>
            <v-text-field v-model="enddatum" type="date" label="Enddatum"></v-text-field>
            <v-text-field v-model="dauer" type="number" label="Dauer"></v-text-field>
            <v-combobox
                v-model="selectedDozent"
                label="Dozent"
                :items="dozentItems"
                item-title="fullName"
                item-value="id_dozent"
            ></v-combobox>
          </v-container>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Add" @click="onAddClicked"></v-btn>
            <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useFetch } from "@vueuse/core";

const kursnummer = ref<string>("");
const kursthema = ref<string>("");
const inhalt = ref<string>("");
const startdatum = ref<string>("");
const enddatum = ref<string>("");
const dauer = ref<number>(0);
const selectedDozent = ref<any>();

const url = ref("http://api.test:8080/kurse");
const { data } = useFetch(url).get().json();
const tableItems = ref<string[]>([]);

const dozentItems = ref<{ id_dozent: number; fullName: string }[]>([]);
const dozentUrl = "http://api.test:8080/dozenten";
const { data: dozentData } = useFetch(dozentUrl).get().json();

watch(data, (newData) => {
  if (newData?.data) {
    tableItems.value = newData.data.map((entry: any) => entry);
  }
});

watch(dozentData, (newData) => {
  if (newData?.data) {
    dozentItems.value = newData.data.map((entry: any) => ({
      id_dozent: entry.id_dozent,
      fullName: `${entry.vorname} ${entry.nachname}`
    }));
  }
});

const onAddClicked = () => {
  if (!selectedDozent.value) {
    console.error("Please select a dozent.");
    return;
  }
  const payload = {
    kursnummer: kursnummer.value,
    kursthema: kursthema.value,
    inhalt: inhalt.value,
    startdatum: startdatum.value,
    enddatum: enddatum.value,
    dauer: dauer.value,
    fk_dozent: selectedDozent.value.id_dozent.toString()
  };

  useFetch(url).post(payload).json()
      .then(response => {
        console.log("Response from server:", response);
      })
      .catch(error => {
        console.error("Error submitting form:", error);
      });
}
</script>