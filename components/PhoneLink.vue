<script lang="ts" setup>
const props = defineProps({
  params: Object as PropType<{
    href: string
  }>,
})
const href = props.params.valueFormatted
  ? props.params.valueFormatted
  : props.params.value
</script>

<template>
  <a
    :href="`tel:${href}`"
    class="text-sm font-medium text-indigo-500 hover:text-indigo-700"
    >{{ href }}</a
  >
</template>

<style scoped></style>
