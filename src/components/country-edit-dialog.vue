<template>
  <v-card>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Update Land"
            variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Edit Land">
          <v-container>
            <v-combobox
                v-model="selectedItem"
                :items="tableItems"
                label="Select Entry"
                item-title="country"
                item-value="id_countries"
            ></v-combobox>
            <v-text-field v-model="country" label="Land"></v-text-field>
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

const country = ref<string>("");
const selectedItem = ref<any>();

const url = "http://api.test:8080/laender";
const { data } = useFetch(url).get().json();
const tableItems = ref<any[]>([]);

watch(data, (newData) => {
  if (newData?.data) {
    tableItems.value = newData.data;
  }
});

watch(selectedItem, (newItem) => {
  if (newItem) {
    country.value = newItem.country || "";
  }
});

const onUpdateClicked = () => {
  if (!selectedItem.value) {
    console.error("No item selected for update.");
    return;
  }

  const payload = {
    country: country.value
  };

  useFetch(`${url}/${selectedItem.value.id_countries}`)
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

  // Add confirmation dialog before deletion since countries are referenced by other tables
  if (!confirm("Are you sure you want to delete this country? This may affect related records.")) {
    return;
  }

  useFetch(`${url}/${selectedItem.value.id_countries}`)
      .delete()
      .json()
      .then((response) => {
        console.log("Deletion successful:", response);
        tableItems.value = tableItems.value.filter(
            (item) => item.id_countries !== selectedItem.value.id_countries
        );
        selectedItem.value = null;
        country.value = "";
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
};
</script>