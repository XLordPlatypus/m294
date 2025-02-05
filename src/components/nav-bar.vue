<template>
  <v-navigation-drawer
      permanent
      expand-on-hover
      app
  >
    <v-list>
      <v-list-item title="Controllers" subtitle="API"></v-list-item>
      <v-divider></v-divider>
      <v-list-item to="/" title="Home" value="home"></v-list-item>
      <v-list-item to="/dozenten" title="Dozenten" value="dozenten"></v-list-item>
      <v-list-item to="/kurse" title="Kurse" value="kurse"></v-list-item>
      <v-list-item to="/kurse-lernende" title="Kurse-Lernende" value="kurse-lernende"></v-list-item>
      <v-list-item to="/laender" title="Länder" value="laender"></v-list-item>
      <v-list-item to="/lehrbetrieb-lernende" title="Lehrbetrieb-Lernende" value="lehrbetrieb-lernende"></v-list-item>
      <v-list-item to="/lehrbetriebe" title="Lehrbetriebe" value="lehrbetriebe"></v-list-item>
      <v-list-item to="/lernende" title="Lernende" value="lernende"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
