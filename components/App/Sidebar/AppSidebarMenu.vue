<script setup lang="ts">
import { Icon } from '#components'
import { Component } from 'vue'

interface Navigation {
  name: string
  href: string
  icon: Component
}

const Cog6ToothIcon = h(Icon, { name: 'heroicons:cog-6-tooth' })
const FolderIcon = h(Icon, { name: 'heroicons:folder' })
const GlobeAltIcon = h(Icon, { name: 'heroicons:globe-alt' })
const ServerIcon = h(Icon, { name: 'heroicons:server' })
const SignalIcon = h(Icon, { name: 'heroicons:signal' })
const ChartBarSquareIcon = h(Icon, { name: 'heroicons:chart-bar' })
const CarIcon = h(Icon, { name: 'material-symbols:directions-car-outline' })

const navigation: Navigation[] = [
  { name: 'My Office', href: '/', icon: FolderIcon },
  {
    name: 'Contacts',
    href: '/contacts',
    icon: ServerIcon,
  },
  { name: 'Quotes', href: '/quotes', icon: SignalIcon },
  { name: 'Rates', href: '/rates', icon: GlobeAltIcon },
  { name: 'Drivers', href: '/drivers', icon: CarIcon },
  { name: 'Invoicing', href: '/invoicing', icon: ChartBarSquareIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
]
</script>

<template>
  <nav class="flex flex-1 flex-col">
    <ul role="list" class="flex flex-1 flex-col gap-y-7">
      <li>
        <ul role="list" class="-mx-2 space-y-1">
          <AppSidebarMenuItem
            v-for="item in navigation"
            :key="item.name"
            :item="item"
          />
        </ul>
      </li>
      <li class="mt-auto">
        <NuxtLink
          to="/settings"
          class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
        >
          <Icon
            name="heroicons:cog-6-tooth"
            class="h-6 w-6 shrink-0"
            aria-hidden="true"
          />
          Settings
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
