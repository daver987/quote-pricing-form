<script lang="ts" setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
const supabase = useSupabaseAuthClient()
const router = useRouter()
const pageName = computed(() => router.currentRoute.value.meta.name)
const loading = ref(false)

async function signOutUser() {
  try {
    loading.value = true
    let { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    setTimeout(() => {
      loading.value = false
      router.push('/admin/login')
    }, 1000)
  }
}

const user = {
  name: 'Robert',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Home', href: '/admin', current: true },
  { name: 'Quotes', href: '/admin/quotes', current: false },
  { name: 'Orders', href: '/admin/orders', current: false },
  { name: 'Rates', href: '/admin/rates', current: false },
]

const profile = () => {
  router.push('/admin/profile')
}
const settings = () => {
  router.push('/admin/settings')
}
const userNavigation = [
  { id: 0, name: 'Profile', href: '/admin/profile', onClick: profile },
  { id: 1, name: 'Settings', href: '/admin/settings', onClick: settings },
  { id: 2, name: 'Logout', href: '#', onClick: signOutUser },
]
</script>

<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-grey-800" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <NuxtLink to="/admin">
                <NuxtImg
                  class="block h-8 w-auto lg:hidden"
                  src="/images/hpl-logo-3.png"
                  alt="High Park Livery"
                />
                <NuxtImg
                  class="hidden h-12 w-auto lg:block"
                  src="/images/hpl-logo-3.png"
                  alt="High Park Livery"
                />
              </NuxtLink>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <NuxtLink
                  v-for="item in navigation"
                  exact-active-class="bg-grey-900 text-white"
                  class="px-3 py-2 rounded-md text-sm font-medium text-grey-100 hover:bg-grey-700 hover:text-white"
                  :key="item.name"
                  :to="item.href"
                  :aria-current="item.current ? 'page' : undefined"
                  >{{ item.name }}</NuxtLink
                >
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="sr-only">View notifications</span>
                <Icon
                  name="heroicons:bell-alert-20-solid"
                  class="h-6 w-6"
                  aria-hidden="true"
                />
              </button>

              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton
                    class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                  >
                    <span class="sr-only">Open user menu</span>
                    <NuxtImg
                      class="h-8 w-8 rounded-full"
                      :src="user.imageUrl"
                      alt=""
                    />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <MenuItem
                      v-for="item in userNavigation"
                      :key="item.name"
                      v-slot="{ active }"
                    >
                      <NuxtLink
                        :to="item.href"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                        @click="item.onClick"
                      >
                        {{ item.name }}
                      </NuxtLink>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="sr-only">Open main menu</span>
              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            as="a"
            :href="item.href"
            :class="[
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium',
            ]"
            :aria-current="item.current ? 'page' : undefined"
            >{{ item.name }}</DisclosureButton
          >
        </div>
        <div class="border-t border-gray-700 pt-4 pb-3">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-white">
                {{ user.name }}
              </div>
              <div class="text-sm font-medium text-gray-400">
                {{ user.email }}
              </div>
            </div>
            <button
              type="button"
              class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="sr-only">View notifications</span>
              <Icon
                name="heroicons:bell-alert-20-solid"
                class="h-6 w-6"
                aria-hidden="true"
              />
            </button>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <DisclosureButton
              v-for="item in userNavigation"
              :key="item.name"
              as="a"
              :href="item.href"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >{{ item.name }}</DisclosureButton
            >
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <header class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
        <h1 class="text-lg font-semibold leading-6 text-gray-900">
          {{ pageName }}
        </h1>
      </div>
    </header>
    <slot />
  </div>
</template>
