<script setup lang="ts">
import { Ref } from 'vue'
import { Icon, SearchBar, AppSidebar } from '#components'

const navigationItems = [
  { name: 'Your profile', href: '/profile' },
  { name: 'Sign out', href: '#' },
]

const sidebarOpen: Ref<boolean> = ref(false)
</script>

<template>
  <div class="h-full">
    <AppSidebar />
    <div class="xl:pl-72">
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8"
      >
        <button
          type="button"
          class="-m-2.5 p-2.5 text-white xl:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Icon name="heroicons:bars-3" class="h-5 w-5" aria-hidden="true" />
        </button>
        <SearchBar />
        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">View notifications</span>
            <Icon name="heroicons:bell" class="h-6 w-6" aria-hidden="true" />
          </button>

          <Separator />
          <UserProfileMenu
            userName="David Robertson"
            :navigationItems="navigationItems"
            image-alt="Profile Pic"
            image-url="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>
