<template>
  <div class="py-3 text-center bg-brand">
    <p class="text-sm text-gray-50 uppercase">
      &copy;<span>{{ currentYear }}</span> High Park Livery Inc. All rights
      reserved
    </p>
  </div>
</template>
<script setup lang="ts">
const currentYear = new Date().getFullYear()

// defineProps({
//   copyright: {
//     default: '© LUXURY RIDE SERVICE - ALL RIGHTS RESERVED',
//   },
// })
</script>
