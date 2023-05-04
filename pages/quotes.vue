<script setup lang="ts">
import { SecondaryNav } from '#components'

const { data, pending, error, refresh } = await useFetch('/api/quotes')

const cols = ['Quote', 'Date', 'Name', 'Email', 'Phone', 'Total', 'Details']

const secondaryNavigation = [
  { name: 'Overview', href: '/drivers', current: true },
  { name: 'History', href: '#', current: false },
  { name: 'Payouts', href: '#', current: false },
  { name: 'Vehicles', href: '#', current: false },
  { name: 'Integrations', href: '#', current: false },
]
</script>

<template>
  <div>
    <header class="border-b border-white/5">
      <SecondaryNav :secondaryNavigation="secondaryNavigation" />
    </header>
    <DataTable :headers="cols" />
  </div>
</template>
