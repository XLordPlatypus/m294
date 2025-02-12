<template>
  <v-card>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Add Land"
            variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Add Land">
          <v-container>
            <v-text-field v-model="country" label="Land"></v-text-field>
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

const country = ref<string>("");

const url = ref("http://api.test:8080/laender");
const { data } = useFetch(url).get().json();
const tableItems = ref<string[]>([]);

watch(data, (newData) => {
  if (newData?.data) {
    tableItems.value = newData.data.map((entry: any) => entry);
  }
});

const onAddClicked = () => {
  const payload = {
    country: country.value
  };

  useFetch(url).post(payload).json()
      .then(response => {
        console.log("Response from server:", response);
        country.value = ""; // Reset form after successful addition
      })
      .catch(error => {
        console.error("Error submitting form:", error);
      });
}
</script>