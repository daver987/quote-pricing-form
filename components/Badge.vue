<script lang="ts" setup>
const props = defineProps({
  params: Object as PropType<{
    isBooked: boolean
  }>,
})
const isBooked = props.params.valueFormatted
  ? props.params.valueFormatted
  : props.params.value
</script>

<template>
  <span
    :class="[
      isBooked ? 'bg-green-100 text-green-800' : 'bg-pink-100 text-pink-800',
    ]"
    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase"
    >{{ isBooked ? 'Booked' : 'Quoted' }}</span
  >
</template>

<style scoped></style>
