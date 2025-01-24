<template>
  <v-app id="inspire">
    <v-app-bar app>
      Title
    </v-app-bar>

    <NavBar></NavBar>

    <v-main>
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

<script setup>
import {ref} from 'vue'
import NavBar from "./components/NavBar.vue";

const drawer = ref(null)
</script>

<script>
export default {
  data: () => ({drawer: null}),
}
</script>