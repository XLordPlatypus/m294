<template>
  <v-card>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Add Lehrbetrieb"
            variant="flat"
        >
        </v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Add Lehrbetrieb">
          <v-container>
            <v-text-field v-model="firma" label="Firma"></v-text-field>
            <v-text-field v-model="street" label="Strasse"></v-text-field>
            <v-text-field v-model="postalCode" label="PLZ"></v-text-field>
            <v-text-field v-model="location" label="Ort"></v-text-field>
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
import { ref } from "vue";
import { useFetch } from "@vueuse/core";

const firma = ref<string>("");
const street = ref<string>("");
const postalCode = ref<string>("");
const location = ref<string>("");
const url = "http://api.test/lehrbetriebe";

const onAddClicked = () => {
  const payload = {
    firma: firma.value,
    strasse: street.value,
    plz: postalCode.value,
    ort: location.value,
  };

  useFetch(url)
      .post(payload)
      .json()
      .then((response) => {
        console.log("Lehrbetrieb added:", response);
      })
      .catch((error) => {
        console.error("Error adding Lehrbetrieb:", error);
      });
};
</script>