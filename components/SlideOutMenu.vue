<template>
  <div class="bg-white">
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="isOpen">
      <Dialog as="div" class="flex inset-0 z-40 fixed" @close="isOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-500"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="bg-black bg-opacity-75 inset-0 fixed" />
        </TransitionChild>

        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-500 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-500 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div
            class="bg-background-dark flex flex-col max-w-[375px] shadow-xl w-full pb-12 relative overflow-y-auto md:max-w-lg"
          >
            <div class="flex px-4 pt-5 pb-4">
              <button
                type="button"
                class="rounded-md -m-2 p-2 text-gray-400 inline-flex items-center justify-center"
                @click="isOpen = false"
              >
                <span class="sr-only">Close menu</span>
                <div
                  class="text-primary text-4xl i-mdi-window-close"
                  aria-hidden="true"
                />
              </button>
            </div>

            <div class="border-t space-y-6 border-gray-200 py-6 px-4">
              <div class="flow-root">
                <NuxtLink
                  class="font-body -m-2 text-white tracking-widest p-2 text-2xl block uppercase"
                  v-for="nav in navigation"
                  :to="nav.href"
                  :key="nav.name"
                  @click="isOpen = false"
                  >{{ nav.name }}
                </NuxtLink>
              </div>
              <div class="flow-root">
                <NuxtLink
                  class="border border-solid border-primary cursor-pointer font-light text-primary py-2 px-5 tracking-[0.4em] inline-flex items-center uppercase hover:border-primary hover:text-primary hover:transform hover:transition hover:ease-in-out hover:scale-x-105 hover:-translate-y-1 hover:duration-300 focus:border-primary focus:ring focus:ring-primary active:bg-primary/20"
                  to="/reservations"
                  @click="isOpen = false"
                  ><span>Reserve</span></NuxtLink
                >
              </div>
            </div>
            <div class="border-t space-y-6 border-gray-200 py-6 px-4" />
          </div>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import {
  TransitionChild,
  TransitionRoot,
  DialogOverlay,
  Dialog,
} from '@headlessui/vue'

const navigation = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Services',
    href: '/services',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
]
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
})
</script>
