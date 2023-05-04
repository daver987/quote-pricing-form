<script setup lang="ts">
import type { Component } from 'vue'

const props = defineProps<{
  item: {
    href: string
    icon: Component
    name: string
  }
}>()
</script>

<template>
  <li>
    <NuxtLink
      :to="item.href"
      exact-active-class="bg-gray-800 text-white"
      class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
    >
      <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
      {{ item.name }}
    </NuxtLink>
  </li>
</template>
