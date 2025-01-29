<template>
  <v-app>
    <v-app-bar app>
      Title
    </v-app-bar>

    <navBar></navBar>

    <v-main>
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

<script setup>
import navBar from "./components/navBar.vue";
</script>