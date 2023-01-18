<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="@sm:flex bg-white p-4 shadow-xl">
    <div class="mb-4 flex-shrink-0 @sm:mb-0 sm:mr-4">
      <NuxtImg :alt="altText" :src="`/icons/${image}.svg`" class="w-16" />
    </div>
    <div>
      <h4 class="text-lg font-body text-brand uppercase">{{ title }}</h4>
      <p class="mt-1 font-body text-sm text-gray-400">{{ body }}</p>
    </div>
  </div>
</template>
