<script setup lang="ts">
interface Stat {
  name: string
  value: string
  unit?: string
}

interface Props {
  stats: Stat[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
    <div
      v-for="(stat, statIdx) in props.stats"
      :key="stat.name"
      :class="[
        statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
        'border-t border-white/5 px-4 py-6 sm:px-6 lg:px-8',
      ]"
    >
      <p class="text-sm font-medium leading-6 text-gray-400">
        {{ stat.name }}
      </p>
      <p class="mt-2 flex items-baseline gap-x-2">
        <span class="text-4xl font-semibold tracking-tight text-white">{{
          stat.value
        }}</span>
        <span v-if="stat.unit" class="text-sm text-gray-400">{{
          stat.unit
        }}</span>
      </p>
    </div>
  </div>
</template>
