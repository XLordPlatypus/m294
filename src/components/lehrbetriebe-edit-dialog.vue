<template>
  <v-card>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Update Lehrbetrieb"
            variant="flat"
        >
        </v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Edit Lehrbetrieb">
          <v-container>
            <v-combobox v-model="selectedItem" :items="tableItems" label="Select Entry"></v-combobox>
            <v-text-field v-model="firma" label="Firma"></v-text-field>
            <v-text-field v-model="street" label="Strasse"></v-text-field>
            <v-text-field v-model="postalCode" label="PLZ"></v-text-field>
            <v-text-field v-model="location" label="Ort"></v-text-field>
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

const firma = ref<string>("");
const street = ref<string>("");
const postalCode = ref<string>("");
const location = ref<string>("");
const selectedItem = ref<any>(null);

const url = "http://api.test/lehrbetriebe";
const { data } = useFetch(url).get().json();
const tableItems = ref<any[]>([]);

watch(data, (newData) => {
  if (newData?.data) {
    tableItems.value = newData.data;
  }
});

watch(selectedItem, (newItem) => {
  if (newItem) {
    firma.value = newItem.firma || "";
    street.value = newItem.strasse || "";
    postalCode.value = newItem.plz || "";
    location.value = newItem.ort || "";
  }
});

const onUpdateClicked = () => {
  if (!selectedItem.value) {
    console.error("No item selected for update.");
    return;
  }

  const payload = {
    firma: firma.value,
    strasse: street.value,
    plz: postalCode.value,
    ort: location.value,
  };

  useFetch(`${url}/${selectedItem.value.id_lehrbetrieb}`)
      .put(payload)
      .json()
      .then((response) => {
        console.log("Lehrbetrieb updated:", response);
      })
      .catch((error) => {
        console.error("Error updating Lehrbetrieb:", error);
      });
};

const onDeleteClicked = () => {
  if (!selectedItem.value) {
    console.error("No item selected for deletion.");
    return;
  }

  useFetch(`${url}/${selectedItem.value.id_lehrbetrieb}`)
      .delete()
      .json()
      .then((response) => {
        console.log("Lehrbetrieb deleted:", response);
        tableItems.value = tableItems.value.filter(
            (item) => item.id_lehrbetrieb !== selectedItem.value.id_lehrbetrieb
        );
        selectedItem.value = null;
      })
      .catch((error) => {
        console.error("Error deleting Lehrbetrieb:", error);
      });
};
</script>