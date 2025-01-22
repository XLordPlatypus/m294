<script setup lang="ts">
</script>

<template>
  <v-app>
    <nav>
      <v-navigation-drawer :width="500">
        <v-list-item title="Controllers" subtitle="API"></v-list-item>
        <v-divider></v-divider>
        <RouterLink to="/dozenten">
          <v-list-item link title="Dozenten"></v-list-item>
        </RouterLink>
        <RouterLink to="/kurse">
          <v-list-item link title="Kurse"></v-list-item>
        </RouterLink>
        <RouterLink to="/kurse-lernende">
          <v-list-item link title="Kurse-Lernende"></v-list-item>
        </RouterLink>
        <v-list-item link title="Länder"></v-list-item>
        <v-list-item link title="Lehrbetrieb-Lernende"></v-list-item>
        <v-list-item link title="Lehrbetriebe"></v-list-item>
        <v-list-item link title="Lernende"></v-list-item>
      </v-navigation-drawer>
    </nav>

    <main>
      <RouterView></RouterView>
    </main>
  </v-app>
</template>


