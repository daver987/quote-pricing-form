<template>
  <div class="flex flex-col h-full space-y-4 mb-8 items-center md:m-0">
    <slot></slot>
    <h4
      class="font-subheading text-body text-base text-center tracking-[0.75rem] uppercase"
    >
      {{ kind }}
    </h4>
    <p class="font-heading text-background-dark text-7xl">
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
