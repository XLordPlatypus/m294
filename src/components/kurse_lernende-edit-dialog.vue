<template>
  <v-card>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Update Kurse-Lernende"
            variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Edit Kurse-Lernende">
          <v-container>
            <v-combobox
                v-model="selectedItem"
                :items="tableItems"
                item-title="fullRelation"
                item-value="id_kurs_lernende"
                label="Select Relation"
            ></v-combobox>
            <v-combobox
                v-model="selectedLernende"
                :items="lernendeItems"
                item-title="fullName"
                item-value="id_lernende"
                label="Select Lernende"
            ></v-combobox>
            <v-combobox
                v-model="selectedKurs"
                :items="kursItems"
                item-title="kursthema"
                item-value="id_kurs"
                label="Select Kurs"
            ></v-combobox>
            <v-text-field v-model="role" label="Role"></v-text-field>
            <v-text-field v-model="start" type="date" label="Start Date"></v-text-field>
            <v-text-field v-model="end" type="date" label="End Date"></v-text-field>
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

// Data references for the fields
const role = ref<string>("");
const start = ref<string>("");
const end = ref<string>("");

// Selected Items
const selectedItem = ref<any>();
const selectedLernende = ref<any>();
const selectedKurs = ref<any>();

// API URLs
const kurseLernendeUrl = "http://api.test:8080/kurse_lernende";
const lernendeUrl = "http://api.test:8080/lernende";
const kurseUrl = "http://api.test:8080/kurse";

// Data from the backend
const tableItems = ref<any[]>([]);
const lernendeItems = ref<any[]>([]);
const kursItems = ref<any[]>([]);

// Fetch data from backend
const { data: kurseLernendeData } = useFetch(kurseLernendeUrl).get().json();
const { data: lernendeData } = useFetch(lernendeUrl).get().json();
const { data: kurseData } = useFetch(kurseUrl).get().json();

// Watch for changes in data
watch(kurseLernendeData, (newData) => {
  if (newData?.data) {
    tableItems.value = newData.data.map((entry: any) => ({
      ...entry,
      fullRelation: `${entry.vorname} ${entry.nachname} - ${entry.kursnummer}` // Display combination of lernende and kurs
    }));
  }
});

watch(lernendeData, (newData) => {
  if (newData?.data) {
    lernendeItems.value = newData.data.map((entry: any) => ({
      id_lernende: entry.id_lernende,
      fullName: `${entry.vorname} ${entry.nachname}`
    }));
  }
});

watch(kurseData, (newData) => {
  if (newData?.data) {
    kursItems.value = newData.data.map((entry: any) => ({
      id_kurs: entry.id_kurs,
      kursthema: entry.kursthema
    }));
  }
});

watch(selectedItem, (newItem) => {
  if (newItem) {
    role.value = newItem.role || "";
    start.value = newItem.start || "";
    end.value = newItem.end || "";
    selectedLernende.value = lernendeItems.value.find(
        (item) => item.id_lernende === newItem.fk_lernende
    );
    selectedKurs.value = kursItems.value.find(
        (item) => item.id_kurs === newItem.fk_kurs
    );
  }
});

const onUpdateClicked = () => {
  if (!selectedItem.value) {
    console.error("No item selected for update.");
    return;
  }

  const payload = {
    fk_lernende: selectedLernende.value?.id_lernende || "",
    fk_kurs: selectedKurs.value?.id_kurs || "",
    role: role.value,
    start: start.value,
    end: end.value,
  };

  useFetch(`${kurseLernendeUrl}/${selectedItem.value.id_kurs_lernende}`)
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

  useFetch(`${kurseLernendeUrl}/${selectedItem.value.id_kurs_lernende}`)
      .delete()
      .json()
      .then((response) => {
        console.log("Deletion successful:", response);
        tableItems.value = tableItems.value.filter(
            (item) => item.id_kurs_lernende !== selectedItem.value.id_kurs_lernende
        );
        selectedItem.value = null;
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
};
</script>
