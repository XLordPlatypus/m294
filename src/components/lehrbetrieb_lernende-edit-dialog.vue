<template>
  <v-card>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Update Lehrbetrieb-Lernende"
            variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Edit Lehrbetrieb-Lernende">
          <v-container>
            <v-combobox
                v-model="selectedItem"
                :items="tableItems"
                item-title="fullRelation"
                item-value="id_lehrbetrieb_lernende"
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
                v-model="selectedLehrbetrieb"
                :items="lehrbetriebItems"
                item-title="firma"
                item-value="id_lehrbetrieb"
                label="Select Lehrbetrieb"
            ></v-combobox>
            <v-text-field v-model="start" type="date" label="Start Date"></v-text-field>
            <v-text-field v-model="end" type="date" label="End Date"></v-text-field>
            <v-text-field v-model="beruf" label="Beruf"></v-text-field>
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
const start = ref<string>("");
const end = ref<string>("");
const beruf = ref<string>("");

// Selected Items
const selectedItem = ref<any>();
const selectedLernende = ref<any>();
const selectedLehrbetrieb = ref<any>();

// API URLs
const lehrbetriebLernendeUrl = "http://api.test:8080/lehrbetrieb_lernende";
const lernendeUrl = "http://api.test:8080/lernende";
const lehrbetriebUrl = "http://api.test:8080/lehrbetriebe";

// Data from the backend
const tableItems = ref<any[]>([]);
const lernendeItems = ref<any[]>([]);
const lehrbetriebItems = ref<any[]>([]);

// Fetch data from backend
const { data: lehrbetriebLernendeData } = useFetch(lehrbetriebLernendeUrl).get().json();
const { data: lernendeData } = useFetch(lernendeUrl).get().json();
const { data: lehrbetriebData } = useFetch(lehrbetriebUrl).get().json();

// Watch for changes in data
watch(lehrbetriebLernendeData, (newData) => {
  if (newData?.data) {
    tableItems.value = newData.data.map((entry: any) => ({
      ...entry,
      fullRelation: `${entry.vorname} ${entry.nachname} - ${entry.firma}` // Display combination of lernende and lehrbetrieb
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

watch(lehrbetriebData, (newData) => {
  if (newData?.data) {
    lehrbetriebItems.value = newData.data.map((entry: any) => ({
      id_lehrbetrieb: entry.id_lehrbetrieb,
      firma: entry.firma
    }));
  }
});

watch(selectedItem, (newItem) => {
  if (newItem) {
    start.value = newItem.start || "";
    end.value = newItem.end || "";
    beruf.value = newItem.beruf || "";
    selectedLernende.value = lernendeItems.value.find(
        (item) => item.id_lernende === newItem.fk_lernende
    );
    selectedLehrbetrieb.value = lehrbetriebItems.value.find(
        (item) => item.id_lehrbetrieb === newItem.fk_lehrbetrieb
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
    fk_lehrbetrieb: selectedLehrbetrieb.value?.id_lehrbetrieb || "",
    beruf: beruf.value,
    start: start.value,
    end: end.value,
  };

  useFetch(`${lehrbetriebLernendeUrl}/${selectedItem.value.id_lehrbetrieb_lernende}`)
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

  useFetch(`${lehrbetriebLernendeUrl}/${selectedItem.value.id_lehrbetrieb_lernende}`)
      .delete()
      .json()
      .then((response) => {
        console.log("Deletion successful:", response);
        tableItems.value = tableItems.value.filter(
            (item) => item.id_lehrbetrieb_lernende !== selectedItem.value.id_lehrbetrieb_lernende
        );
        selectedItem.value = null;
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
};
</script>
