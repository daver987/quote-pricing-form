<script setup lang="ts">
interface NavItem {
  name: string
  href: string
  current: boolean
}

interface Props {
  secondaryNavigation: NavItem[]
}

const props = defineProps<Props>()
</script>

<template>
  <nav class="flex overflow-x-auto border-b border-white/10 py-4">
    <ul
      role="list"
      class="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
    >
      <li v-for="item in props.secondaryNavigation" :key="item.name">
        <NuxtLink :href="item.href" :class="item.current ? 'text-brand' : ''">{{
          item.name
        }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
