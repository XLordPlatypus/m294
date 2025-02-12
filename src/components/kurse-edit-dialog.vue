<template>
  <v-card>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Update Kurs"
            variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Edit Kurs">
          <v-container>
            <v-combobox v-model="selectedItem" :items="tableItems" label="Select Entry"></v-combobox>
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
                item-value="id"
            ></v-combobox>
          </v-container>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Update" @click="onUpdateClicked"></v-btn>
            <v-btn text="Delete" @click="onDeleteClicked"></v-btn>
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
const selectedItem = ref<any>();

const url = "http://api.test:8080/kurse";
const { data } = useFetch(url).get().json();
const tableItems = ref<any[]>([]);

const dozentItems = ref<{ id_dozent: number; fullName: string }[]>([]);
const dozentUrl = "http://api.test:8080/dozenten";
const { data: dozentData } = useFetch(dozentUrl).get().json();

watch(data, (newData) => {
  if (newData?.data) {
    tableItems.value = newData.data;
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

watch(selectedItem, (newItem) => {
  if (newItem) {
    kursnummer.value = newItem.kursnummer || "";
    kursthema.value = newItem.kursthema || "";
    inhalt.value = newItem.inhalt || "";
    startdatum.value = newItem.startdatum || "";
    enddatum.value = newItem.enddatum || "";
    dauer.value = newItem.dauer || 0;
    selectedDozent.value = dozentItems.value.find(
        (dozent) => dozent.id_dozent === parseInt(newItem.fk_dozent)
    );
  }
});

const onUpdateClicked = () => {
  if (!selectedItem.value) {
    console.error("No item selected for update.");
    return;
  }

  const payload = {
    kursnummer: kursnummer.value,
    kursthema: kursthema.value,
    inhalt: inhalt.value,
    startdatum: startdatum.value,
    enddatum: enddatum.value,
    dauer: dauer.value,
    fk_dozent: selectedDozent.value?.id_dozent.toString() || ""
  };

  useFetch(`${url}/${selectedItem.value.id_kurs}`)
      .put(payload)
      .json()
      .then((response) => {
        console.log("Update successful:", response);
      })
      .catch((error) => {
        console.error("Error updating record:", error);
      });
};

const onDeleteClicked = () => {
  if (!selectedItem.value) {
    console.error("No item selected for deletion.");
    return;
  }

  useFetch(`${url}/${selectedItem.value.id_kurs}`)
      .delete()
      .json()
      .then((response) => {
        console.log("Deletion successful:", response);
        tableItems.value = tableItems.value.filter(
            (item) => item.id !== selectedItem.value.id
        );
        selectedItem.value = null;
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
};
</script>