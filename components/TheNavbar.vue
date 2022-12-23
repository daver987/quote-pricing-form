<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline'

const isOpen = ref(false)
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <nav
    class="w-full px-6 lg:px-10 z-30 py-4 row-start-1 self-start justify-self-stretch relative md:col-span-2"
  >
    <div class="relative grid grid-cols-2 mx-auto max-w-7xl">
      <div class="col-span-1 col-start-1">
        <NuxtLink
          to="/"
          class="max-w-[100px] md:max-w-[115px] block cursor-pointer"
        >
          <img
            src="/images/hpl-logo-3.png"
            alt="High Park Livery Logo"
            width="960"
            height="568"
          />
        </NuxtLink>
      </div>
      <div
        class="flex flex-row self-center justify-end col-span-1 col-start-2 col-end-3"
      >
        <button
          class="text-4xl text-white cursor-pointer i-gg-menu-right-alt hover:text-background"
          @click="toggleMenu"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="text-white w-8 h-8" />
        </button>
      </div>
      <SlideOutMenu :is-open="isOpen" />
    </div>
  </nav>
</template>
