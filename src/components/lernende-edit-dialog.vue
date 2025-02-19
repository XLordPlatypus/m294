<template>
  <v-card>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Update Lernende"
            variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Edit Lernende">
          <v-container>
            <v-combobox
                v-model="selectedItem"
                :items="tableItems"
                label="Eintrag Auswählen"
                item-title="nachname"
                item-value="id_lernende"
            ></v-combobox>

            <v-text-field v-model="firstname" label="Vorname"></v-text-field>
            <v-text-field v-model="lastname" label="Nachname"></v-text-field>
            <v-text-field v-model="birthdate" type="date" label="Birthdate"></v-text-field>
            <v-text-field v-model="street" label="Strasse"></v-text-field>
            <v-text-field v-model="postalCode" label="Plz"></v-text-field>
            <v-text-field v-model="location" label="Ort"></v-text-field>
            <v-combobox v-model="sex" label="Geschlecht" :items="genders"></v-combobox>
            <v-text-field v-model="handy" label="Handy"></v-text-field>
            <v-text-field v-model="telefon" label="Telefon"></v-text-field>
            <v-text-field v-model="email" label="E-Mail"></v-text-field>
            <v-text-field v-model="privateEmail" label="Private E-Mail"></v-text-field>
            <v-combobox
                v-model="selectedCountry"
                label="Country"
                :items="countryItems"
                item-title="name"
                item-value="id_countries"
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

const genders: string[] = ["M", "W"];

const firstname = ref<string>("");
const lastname = ref<string>("");
const street = ref<string>("");
const postalCode = ref<string>("");
const location = ref<string>("");
const sex = ref<string>("");
const handy = ref<string>("")
const telefon = ref<string>("");
const email = ref<string>("");
const privateEmail = ref<string>("");
const birthdate = ref<string>("");
const selectedCountry = ref<any>();
const selectedItem = ref<any>();

const url = "http://api.test:8080/lernende";
const { data } = useFetch(url).get().json();
const tableItems = ref<any[]>([]);

const countryItems = ref<{ id_countries: number; name: string }[]>([]);
const countryUrl: string = "http://api.test:8080/laender";
const { data: countryData } = useFetch(countryUrl).get().json();

watch(data, (newData) => {
  if (newData?.data) {
    tableItems.value = newData.data;
  }
});

watch(countryData, (newData) => {
  if (newData?.data) {
    countryItems.value = newData.data.map((entry: any) => ({
      id_countries: entry.id_countries,
      name: entry.country,
    }));
  }
});

watch(selectedItem, (newItem) => {
  if (newItem) {
    firstname.value = newItem.vorname || "";
    lastname.value = newItem.nachname || "";
    street.value = newItem.strasse || "";
    postalCode.value = newItem.plz || "";
    location.value = newItem.ort || "";
    sex.value = newItem.geschlecht || "";
    handy.value = newItem.handy || "";
    telefon.value = newItem.telefon || "";
    email.value = newItem.email || "";
    privateEmail.value = newItem.email_privat || "";
    birthdate.value = newItem.birthdate || "";
    selectedCountry.value = newItem.fk_land; // Assign ID, not object
  }
});


const onUpdateClicked = () => {
  if (!selectedItem.value) {
    console.error("No item selected for update.");
    return;
  }

  const payload = {
    vorname: firstname.value,
    nachname: lastname.value,
    strasse: street.value,
    plz: postalCode.value,
    ort: location.value,
    geschlecht: sex.value,
    handy: handy.value,
    telefon: telefon.value,
    email: email.value,
    email_privat: privateEmail.value,
    birthdate: birthdate.value,
    fk_land: selectedCountry.value?.id_countries.toString() || "",
  };

  useFetch(`${url}/${selectedItem.value.id_lernende}`)
      .put(payload)
      .json()
      .then((response) => {
        console.log("Update successful:", response);
      })
      .catch((error) => {
        alert(error)
        console.error("Error updating record:", error);
      });
};

const onDeleteClicked = () => {
  if (!selectedItem.value) {
    console.error("No item selected for deletion.");
    return;
  }

  useFetch(`${url}/${selectedItem.value.id_lernende}`)
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
        alert(error)
        console.error("Error deleting record:", error);
      });
};
</script>