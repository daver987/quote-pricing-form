<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div class="dark:bg-grey-900 min-h-screen">
    <AppNavigation />
    <ShoppingCart :is-it-quote="false" />
  </div>
</template>
