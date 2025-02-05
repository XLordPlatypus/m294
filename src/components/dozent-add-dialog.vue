<template>
  <v-card>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Add Dozent"
            variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Add Dozent">
          <v-container>
            <v-text-field v-model="firstname" label="Vorname"></v-text-field>
            <v-text-field v-model="lastname" label="Nachname"></v-text-field>
            <v-text-field v-model="birthdate" type="date"></v-text-field>
            <v-text-field v-model="street" label="Strasse"></v-text-field>
            <v-text-field v-model="postalCode" label="Plz"></v-text-field>
            <v-text-field v-model="location" label="Ort"></v-text-field>
            <v-combobox v-model="sex" label="Geschlecht" :items="genders"></v-combobox>
            <v-text-field v-model="handy" label="Handy"></v-text-field>
            <v-text-field v-model="telefon" label="Telefon"></v-text-field>
            <v-text-field v-model="email" label="E-Mail"></v-text-field>
            <v-combobox
                v-model="selectedCountry"
                label="Country"
                :items="countryItems"
                item-title="name"
                item-value="id"
            ></v-combobox>
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
import {ref, watch} from "vue";
import {useFetch} from "@vueuse/core";

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
const birthdate = ref<string>("");
const selectedCountry = ref();

const url = ref("http://api.test/dozenten");
const {data} = useFetch(url).get().json();
const tableItems = ref<string[]>([]);

const countryItems = ref<{ id_countries: number; name: string }[]>([]);
const countryUrl: string = "http://api.test/laender";
const {data: countryData} = useFetch(countryUrl).get().json();

watch(data, (newData) => {
  if (newData?.data) {
    tableItems.value = newData.data.map((entry: any) => entry);
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

const onAddClicked = () => {
  if (!selectedCountry.value) {
    console.error("Please select a country.");
    return;
  }

  const payload = {
    vorname: firstname.value,
    nachname: lastname.value,
    strasse: street.value,
    plz: postalCode.value,
    ort: location.value,
    fk_land: selectedCountry.value["id_countries"].toString(),
    geschlecht: sex.value,
    telefon: telefon.value,
    handy: handy.value,
    email: email.value,
    birthdate: birthdate.value,
  };

  useFetch(url).post(payload).json()
      .then(response => {
        console.log("Response from server:", response);
      })
      .catch(error => {
        console.error("Error submitting form:", error);
      });
}
</script>