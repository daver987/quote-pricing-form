<script setup>
import { SecondaryNav } from '#components'

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    balance: '3.00',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    balance: '1.00',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    balance: '0.00',
  },
]
const secondaryNavigation = [
  { name: 'Overview', href: '/drivers', current: true },
  { name: 'History', href: '#', current: false },
  { name: 'Payouts', href: '#', current: false },
  { name: 'Vehicles', href: '#', current: false },
  { name: 'Integrations', href: '#', current: false },
]
const headers = ['User', 'Commit', 'Status', 'Duration', 'Deployed at']
</script>

<template>
  <main>
    <header class="border-b border-white/5">
      <SecondaryNav :secondaryNavigation="secondaryNavigation" />
    </header>
    <DataTable :headers="headers" :data="people" sortable> </DataTable>
  </main>
</template>
