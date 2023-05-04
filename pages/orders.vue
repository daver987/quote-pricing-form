<script setup lang="ts">
definePageMeta({
  name: 'Orders',
  layout: 'default',
  middleware: ['auth'],
})

const { data: quotes } = useFetch('/api/quotes.get')
</script>

<template>
  <div class="bg-gray-100"></div>
</template>

<style scoped></style>
