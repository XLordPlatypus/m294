<template>
  <v-card>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Update Apprenticeship"
            variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Edit Apprenticeship Relationship">
          <v-container>
            <!-- Relationship Selection -->
            <v-combobox
                v-model="selectedItem"
                :items="tableItems"
                label="Select Apprenticeship"
                :item-title="getRelationshipLabel"
            ></v-combobox>

            <!-- Company Selection -->
            <v-combobox
                v-model="selectedLehrbetrieb"
                label="Company"
                :items="lehrbetriebItems"
                item-title="firma"
                item-value="id_lehrbetrieb"
            ></v-combobox>

            <!-- Apprentice Selection -->
            <v-combobox
                v-model="selectedLernende"
                label="Apprentice"
                :items="lernendeItems"
                item-title="fullName"
                item-value="id_lernende"
            ></v-combobox>

            <!-- Apprenticeship Details -->
            <v-text-field v-model="start" type="date" label="Start Date"></v-text-field>
            <v-text-field v-model="ende" type="date" label="End Date"></v-text-field>
            <v-text-field v-model="beruf" label="Profession"></v-text-field>
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

// Form data
const start = ref<string>("");
const ende = ref<string>("");
const beruf = ref<string>("");
const selectedItem = ref<any>();
const selectedLehrbetrieb = ref<any>();
const selectedLernende = ref<any>();

// API endpoints
const url = "http://api.test:8080/lehrbetrieb_lernende";
const lehrbetriebUrl = "http://api.test:8080/lehrbetrieb";
const lernendeUrl = "http://api.test:8080/lernende";

// Data fetching
const { data: relationData } = useFetch(url).get().json();
const { data: lehrbetriebData } = useFetch(lehrbetriebUrl).get().json();
const { data: lernendeData } = useFetch(lernendeUrl).get().json();

// Data storage
const tableItems = ref<any[]>([]);
const lehrbetriebItems = ref<any[]>([]);
const lernendeItems = ref<any[]>([]);

// Helper function to generate readable labels for relationships
const getRelationshipLabel = (item: any) => {
  const company = lehrbetriebItems.value.find(l => l.id_lehrbetrieb === item.fk_lehrbetrieb);
  const apprentice = lernendeItems.value.find(l => l.id_lernende === item.fk_lernende);
  return `${company?.firma || 'Unknown Company'} - ${apprentice?.vorname || ''} ${apprentice?.nachname || 'Unknown Apprentice'} (${item.beruf})`;
};

// Watch for data changes
watch(relationData, (newData) => {
  if (newData?.data) {
    tableItems.value = newData.data;
  }
});

watch(lehrbetriebData, (newData) => {
  if (newData?.data) {
    lehrbetriebItems.value = newData.data;
  }
});

watch(lernendeData, (newData) => {
  if (newData?.data) {
    lernendeItems.value = newData.data.map((entry: any) => ({
      ...entry,
      fullName: `${entry.vorname} ${entry.nachname}`
    }));
  }
});

// Watch selected item to populate form
watch(selectedItem, (newItem) => {
  if (newItem) {
    start.value = newItem.start || "";
    ende.value = newItem.ende || "";
    beruf.value = newItem.beruf || "";
    selectedLehrbetrieb.value = lehrbetriebItems.value.find(
        l => l.id_lehrbetrieb === newItem.fk_lehrbetrieb
    );
    selectedLernende.value = lernendeItems.value.find(
        l => l.id_lernende === newItem.fk_lernende
    );
  }
});

const onUpdateClicked = () => {
  if (!selectedItem.value || !selectedLehrbetrieb.value || !selectedLernende.value) {
    console.error("Please select all required fields.");
    return;
  }

  const payload = {
    fk_lehrbetrieb: selectedLehrbetrieb.value.id_lehrbetrieb.toString(),
    fk_lernende: selectedLernende.value.id_lernende.toString(),
    start: start.value,
    ende: ende.value,
    beruf: beruf.value
  };

  useFetch(`${url}/${selectedItem.value.id_lehrbetrieb_lernende}`)
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

  useFetch(`${url}/${selectedItem.value.id_lehrbetrieb_lernende}`)
      .delete()
      .json()
      .then((response) => {
        console.log("Deletion successful:", response);
        tableItems.value = tableItems.value.filter(
            (item) => item.id_lehrbetrieb_lernende !== selectedItem.value.id_lehrbetrieb_lernende
        );
        selectedItem.value = null;
        // Reset form
        start.value = "";
        ende.value = "";
        beruf.value = "";
        selectedLehrbetrieb.value = null;
        selectedLernende.value = null;
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
};
</script>