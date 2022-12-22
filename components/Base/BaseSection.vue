<script setup lang="ts">
interface Props {
  container?: boolean
}

const { container = false } = defineProps<Props>()
</script>

<template>
  <section class="w-full px-6 py-16">
    <div v-if="container" class="container mx-auto max-w-7xl">
      <slot />
    </div>
    <slot v-else />
  </section>
</template>
