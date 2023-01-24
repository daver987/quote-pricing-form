<script lang="ts" setup>
const props = defineProps({
  params: Object as PropType<{
    text: string
  }>,
})
let { text } = props.params
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center rounded-full border border-transparent bg-brand-600 px-5 py-0.5 text-xs font-medium text-white uppercase shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
  >
    {{ text }}
  </button>
</template>

<style scoped></style>
