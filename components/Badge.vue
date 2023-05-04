<template>
  <span
    class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
    :class="[
      statusClass[status].bgColor,
      statusClass[status].textColor,
      statusClass[status].ringColor,
    ]"
  >
    {{ text }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string
  status: string
}>()

const statusClass = {
  default: {
    bgColor: 'bg-gray-400/10',
    textColor: 'text-gray-400',
    ringColor: 'ring-gray-400/20',
  },
  red: {
    bgColor: 'bg-red-400/10',
    textColor: 'text-red-400',
    ringColor: 'ring-red-400/20',
  },
  yellow: {
    bgColor: 'bg-yellow-400/10',
    textColor: 'text-yellow-500',
    ringColor: 'ring-yellow-400/20',
  },
  green: {
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-400',
    ringColor: 'ring-green-500/20',
  },
  blue: {
    bgColor: 'bg-blue-400/10',
    textColor: 'text-blue-400',
    ringColor: 'ring-blue-400/30',
  },
  indigo: {
    bgColor: 'bg-indigo-400/10',
    textColor: 'text-indigo-400',
    ringColor: 'ring-indigo-400/30',
  },
  purple: {
    bgColor: 'bg-purple-400/10',
    textColor: 'text-purple-400',
    ringColor: 'ring-purple-400/30',
  },
  pink: {
    bgColor: 'bg-pink-400/10',
    textColor: 'text-pink-400',
    ringColor: 'ring-pink-400/20',
  },
}
</script>
