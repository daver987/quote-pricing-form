<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon as XMarkIconOutline,
} from '@heroicons/vue/24/outline'
import { navigation, NavigationItem } from '~/data/navigation'

const nav = navigation as NavigationItem[]

const open = ref<boolean>(false)
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-40 lg:hidden" @close="open = false">
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel
            class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
          >
            <div class="flex px-4 pt-5 pb-2">
              <button
                type="button"
                class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                @click="open = false"
              >
                <span class="sr-only">Close menu</span>
                <XMarkIconOutline class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div class="space-y-6 border-t border-gray-200 py-6 px-4">
              <div v-for="page in nav" :key="page.id" class="flow-root">
                <NuxtLink
                  active-class="text-brand hover:text-brand-600"
                  :to="page.href"
                  class="-m-2 block p-2 font-medium text-gray-900 capitalize"
                  >{{ page.name }}</NuxtLink
                >
              </div>
            </div>

            <div class="space-y-6 border-t border-gray-200 py-6 px-4">
              <div class="flow-root">
                <NuxtLink
                  to="/signin"
                  class="-m-2 block p-2 font-medium text-gray-900"
                  >Sign in</NuxtLink
                >
              </div>
              <div class="flow-root">
                <NuxtLink
                  to="/signup"
                  class="-m-2 block p-2 font-medium text-gray-900"
                  >Create account</NuxtLink
                >
              </div>
            </div>

            <div class="border-t border-gray-200 py-6 px-4">
              <NuxtLink href="#" class="-m-2 flex items-center p-2">
                <NuxtImg
                  src="https://tailwindui.com/img/flags/flag-canada.svg"
                  alt=""
                  class="block h-auto w-5 flex-shrink-0"
                />
                <span class="ml-3 block text-base font-medium text-brand-600"
                  >CAD</span
                >
                <span class="sr-only">, change currency</span>
              </NuxtLink>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
  <header class="bg-transparent relative">
    <p
      v-if="false"
      class="flex max-w-7xl mx-auto h-8 items-center justify-center bg-brand px-4 text-sm font-medium text-gray-900 lg:px-6"
    >
      Get free delivery on orders over $100
    </p>
    <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="py-2 border-b border-gray-200/30">
        <div class="flex h-16 w-full justify-center lg:items-center">
          <button
            type="button"
            class="rounded bg-transparent flex-shrink-0 text-gray-400 hover:text-gray-500 p-2 text-gray-400 lg:hidden"
            @click="open = true"
          >
            <span class="sr-only">Open menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Logo -->
          <div
            class="ml-2 flex justify-center w-full lg:w-auto lg:justify-start lg:ml-0"
          >
            <NuxtLink to="/" class="self-center">
              <span class="sr-only">High Park Livery</span>
              <NuxtImg
                class="h-12 lg:h-14 w-auto"
                src="/images/hpl-logo-3.png"
                alt="High Park Livery Logo"
              />
            </NuxtLink>
          </div>

          <!-- Flyout menus -->
          <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
            <div class="flex h-full space-x-8">
              <Popover
                v-for="category in navigation.categories"
                :key="category.name"
                class="flex"
                v-slot="{ open }"
              >
                <div class="relative flex">
                  <PopoverButton
                    :class="[
                      open
                        ? 'border-brand-600 text-brand-600'
                        : 'border-transparent text-gray-100 hover:text-brand',
                      'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out',
                    ]"
                  >
                    {{ category.name }}
                  </PopoverButton>
                </div>

                <transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0"
                  enter-to-class="opacity-100"
                  leave-active-class="transition ease-in duration-150"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <PopoverPanel
                    class="absolute inset-x-0 top-full z-10 text-sm text-gray-500"
                  >
                    <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                    <div
                      class="absolute inset-0 top-1/2 bg-white shadow"
                      aria-hidden="true"
                    />

                    <div class="relative bg-white">
                      <div class="mx-auto max-w-7xl px-8">
                        <div class="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                          <!--                          <div class="col-start-2 grid grid-cols-2 gap-x-8">-->
                          <!--                            <div-->
                          <!--                              v-for="item in category.featured"-->
                          <!--                              :key="item.name"-->
                          <!--                              class="group relative text-base sm:text-sm"-->
                          <!--                            >-->
                          <!--                              <div-->
                          <!--                                class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"-->
                          <!--                              >-->
                          <!--                                <img-->
                          <!--                                  :src="item.imageSrc"-->
                          <!--                                  :alt="item.imageAlt"-->
                          <!--                                  class="object-cover object-center"-->
                          <!--                                />-->
                          <!--                              </div>-->
                          <!--                              <NuxtLink-->
                          <!--                                :to="item.href"-->
                          <!--                                exact-active-class="text-brand hover:text-brand-600"-->
                          <!--                                class="mt-6 block font-medium text-gray-100 hover:text-brand"-->
                          <!--                              >-->
                          <!--                                <span-->
                          <!--                                  class="absolute inset-0 z-10"-->
                          <!--                                  aria-hidden="true"-->
                          <!--                                />-->
                          <!--                                {{ item.name }}-->
                          <!--                              </NuxtLink>-->
                          <!--                              <p aria-hidden="true" class="mt-1">Shop now</p>-->
                          <!--                            </div>-->
                          <!--                          </div>-->
                          <div
                            class="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm"
                          >
                            <div
                              v-for="section in category.sections"
                              :key="section.name"
                            >
                              <p
                                :id="`${section.name}-heading`"
                                class="font-medium text-gray-100 hover:text-brand"
                              >
                                {{ section.name }}
                              </p>
                              <ul
                                role="list"
                                :aria-labelledby="`${section.name}-heading`"
                                class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                              >
                                <li
                                  v-for="item in section.items"
                                  :key="item.name"
                                  class="flex"
                                >
                                  <NuxtLink
                                    :to="item.href"
                                    class="hover:text-gray-800"
                                    exact-active-class="text-brand hover:text-brand-600"
                                    >{{ item.name }}</NuxtLink
                                  >
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverPanel>
                </transition>
              </Popover>
              <template v-for="page in nav" :key="page.id">
                <NuxtLink
                  :to="page.href"
                  class="flex items-center text-sm font-medium capitalize tracking-wider text-gray-100 hover:text-brand"
                  exact-active-class="text-brand hover:text-brand-600"
                  >{{ page.name }}</NuxtLink
                >
              </template>
            </div>
          </PopoverGroup>

          <div class="ml-auto flex items-center">
            <div
              class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
            >
              <NuxtLink
                to="/signin"
                class="text-sm font-medium text-gray-100 hover:text-brand"
                >Sign in</NuxtLink
              >
              <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
              <NuxtLink
                to="/signup"
                class="text-sm font-medium text-gray-100 hover:text-brand"
                >Create account</NuxtLink
              >
            </div>

            <div class="hidden lg:ml-8 lg:flex">
              <a
                href="#"
                class="flex items-center text-gray-100 hover:text-brand"
              >
                <NuxtImg
                  src="https://tailwindui.com/img/flags/flag-canada.svg"
                  alt="Canada Flag"
                  class="block h-auto w-5 flex-shrink-0"
                />
                <span class="ml-3 block text-sm font-medium">CAD</span>
                <span class="sr-only">, change currency</span>
              </a>
            </div>

            <!-- Search -->
            <div v-if="false" class="flex lg:ml-6">
              <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
                <span class="sr-only">Search</span>
                <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
              </a>
            </div>

            <!-- Cart -->
            <div class="ml-4 flow-root lg:ml-6">
              <MiniCart />
              <!--              <a href="#" class="group -m-2 flex items-center p-2">-->
              <!--                <ShoppingBagIcon-->
              <!--                  class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"-->
              <!--                  aria-hidden="true"-->
              <!--                />-->
              <!--                <span-->
              <!--                  class="ml-2 text-sm font-medium text-gray-100 hover:text-brand"-->
              <!--                  >0</span-->
              <!--                >-->
              <!--                <span class="sr-only">items in cart, view bag</span>-->
              <!--              </a>-->
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
