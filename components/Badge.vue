<script lang="ts" setup>
const props = defineProps({
  isBooked: {
    type: Boolean,
    required: true,
  },
})
let { isBooked } = props.params
</script>

<template>
  <span
    :class="[
      isBooked ? 'bg-pink-100 text-pink-800' : 'bg-green-100 text-green-800',
    ]"
    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase"
    >{{ isBooked ? 'Quoted' : 'Booked' }}</span
  >
</template>

<style scoped></style>
