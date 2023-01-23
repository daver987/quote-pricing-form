<script setup lang="ts">
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/20/solid'
import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
} from '@heroicons/vue/24/outline'

definePageMeta({
  name: 'Dashboard',
  layout: 'default',
  middleware: ['auth'],
})
const stats = [
  {
    id: 1,
    name: 'Total Quotes',
    stat: '71,897',
    icon: UsersIcon,
    change: '122',
    changeType: 'increase',
    href: '/quotes',
  },
  {
    id: 2,
    name: 'Converted Quotes',
    stat: '58.16%',
    icon: EnvelopeOpenIcon,
    change: '5.4%',
    changeType: 'increase',
    href: '/quotes',
  },
  {
    id: 3,
    name: 'Avg. Click Rate',
    stat: '24.57%',
    icon: CursorArrowRaysIcon,
    change: '3.2%',
    changeType: 'decrease',
    href: '/quotes',
  },
]
</script>

<template>
  <div class="p-6">
    <h3 class="text-lg font-medium leading-6 text-gray-900">Last 30 days</h3>

    <dl class="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="item in stats"
        :key="item.id"
        class="relative px-4 pt-5 pb-12 overflow-hidden bg-white rounded-lg shadow sm:px-6 sm:pt-6"
      >
        <dt>
          <div class="absolute p-3 rounded-md bg-brand">
            <component
              :is="item.icon"
              class="w-6 h-6 text-white"
              aria-hidden="true"
            />
          </div>
          <p class="ml-16 text-sm font-medium text-gray-500 truncate">
            {{ item.name }}
          </p>
        </dt>
        <dd class="flex items-baseline pb-6 ml-16 sm:pb-7">
          <p class="text-2xl font-semibold text-gray-900">{{ item.stat }}</p>
          <p
            :class="[
              item.changeType === 'increase'
                ? 'text-green-600'
                : 'text-red-600',
              'ml-2 flex items-baseline text-sm font-semibold',
            ]"
          >
            <ArrowUpIcon
              v-if="item.changeType === 'increase'"
              class="self-center flex-shrink-0 w-5 h-5 text-green-500"
              aria-hidden="true"
            />
            <ArrowDownIcon
              v-else
              class="self-center flex-shrink-0 w-5 h-5 text-red-500"
              aria-hidden="true"
            />
            <span class="sr-only">
              {{ item.changeType === 'increase' ? 'Increased' : 'Decreased' }}
              by
            </span>
            {{ item.change }}
          </p>
          <div class="absolute inset-x-0 bottom-0 px-4 py-4 bg-gray-50 sm:px-6">
            <div class="text-sm">
              <NuxtLink
                :to="item.href"
                class="font-medium text-brand-600 hover:text-brand"
              >
                View all<span class="sr-only">
                  {{ item.name }} stats</span
                ></NuxtLink
              >
            </div>
          </div>
        </dd>
      </div>
    </dl>
  </div>
</template>
