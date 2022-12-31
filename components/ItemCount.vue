<template>
  <div class="flex flex-col h-full space-y-4 mb-8 items-center md:m-0">
    <slot></slot>
    <h4
      class="font-semibold text-gray-500 text-base text-center tracking-widest uppercase"
    >
      {{ kind }}
    </h4>
    <p class="font-heading text-gray-700 text-5xl">
      {{ amount }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  kind: {
    type: String,
    default: 'luggage',
  },
  amount: {
    type: Number,
    default: 3,
  },
})
</script>
