<template>
  <v-card>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Add Apprenticeship"
            variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Add Apprenticeship Relationship">
          <v-container>
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

// Form data
const start = ref<string>("");
const ende = ref<string>("");
const beruf = ref<string>("");
const selectedLehrbetrieb = ref<any>();
const selectedLernende = ref<any>();

// API endpoints
const url = ref("http://api.test:8080/lehrbetrieb_lernende");
const lehrbetriebUrl = "http://api.test:8080/lehrbetriebe";
const lernendeUrl = "http://api.test:8080/lernende";

// Data fetching
const { data: relationData } = useFetch(url).get().json();
const { data: lehrbetriebData } = useFetch(lehrbetriebUrl).get().json();
const { data: lernendeData } = useFetch(lernendeUrl).get().json();

// Data storage
const tableItems = ref<any[]>([]);
const lehrbetriebItems = ref<any[]>([]);
const lernendeItems = ref<any[]>([]);

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

const onAddClicked = () => {
  if (!selectedLehrbetrieb.value || !selectedLernende.value) {
    console.error("Please select both company and apprentice.");
    return;
  }

  const payload = {
    fk_lehrbetrieb: selectedLehrbetrieb.value.id_lehrbetrieb.toString(),
    fk_lernende: selectedLernende.value.id_lernende.toString(),
    start: start.value,
    ende: ende.value,
    beruf: beruf.value
  };

  useFetch(url).post(payload).json()
      .then(response => {
        console.log("Response from server:", response);
        // Reset form
        start.value = "";
        ende.value = "";
        beruf.value = "";
        selectedLehrbetrieb.value = null;
        selectedLernende.value = null;
      })
      .catch(error => {
        console.error("Error submitting form:", error);
      });
}
</script>