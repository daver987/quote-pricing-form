<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  headers: string[]
  data: unknown[][]
  sortable?: boolean
}>()

const sortedColumn = ref(-1)
const sortOrder = ref('asc')
const sortedData = computed(() => {
  if (sortedColumn.value === -1 || !props.sortable) {
    return props.data
  }
  return [...props.data].sort((a, b) => {
    const order = sortOrder.value === 'asc' ? 1 : -1
    return (a[sortedColumn.value] > b[sortedColumn.value] ? 1 : -1) * order
  })
})

const sortTable = (index) => {
  if (!props.sortable) return
  if (sortedColumn.value === index) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortedColumn.value = index
    sortOrder.value = 'asc'
  }
}
</script>

<template>
  <div class="bg-gray-900 py-10">
    <div class="px-10 sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-white">Drivers</h1>
        <p class="mt-2 text-sm text-gray-300">
          A list of all the drivers in your account including their name, title,
          email and role.
        </p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          class="block rounded-md bg-brand-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Add Driver
        </button>
      </div>
    </div>
    <table class="mt-6 w-full whitespace-nowrap text-left">
      <thead
        class="border-b border-white/10 bg-gray-800 text-sm leading-6 text-white"
      >
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            @click="sortTable(index)"
            class="sticky top-0 z-10 cursor-pointer py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
            scope="col"
          >
            {{ header }}
            <span v-if="sortedColumn === index">
              {{ sortOrder === 'asc' ? '▲' : '▼' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5">
        <tr v-for="(row, rowIndex) in sortedData" :key="rowIndex">
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            class="py-4 pl-4 pr-8 text-white sm:pl-6 lg:pl-8"
          >
            <slot :name="`cell-${cellIndex}`" :cell-data="cell">
              {{ cell }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
