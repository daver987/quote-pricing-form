<script setup lang="ts">
// scripts here
</script>

<template>
  <q-layout view="lHr lpR lFr">
    <q-header v-show="false">
      <q-toolbar>
        <q-toolbar-title> </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <NuxtPage />
    </q-page-container>

    <q-footer v-show="false"> </q-footer>
  </q-layout>
</template>

<style>
html {
  height: 100% !important;
}
body {
  background-color: #fafafa;
  height: 100%;
  width: 100%;
}
</style>
