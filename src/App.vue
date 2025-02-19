<template>
  <v-app>
    <v-app-bar app>
      Kursverwaltung
    </v-app-bar>

    <navBar></navBar>

    <v-main>
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

<script setup>
import navBar from "./components/nav-bar.vue";
</script>