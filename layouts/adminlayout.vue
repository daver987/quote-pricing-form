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
const appUser = useSupabaseUser()

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
  { name: 'Quotes', href: '/admin/quotes', current: true },
  { name: 'Accounts', href: '/admin/users', current: false },
  { name: 'Orders', href: '/admin/orders', current: false },
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
    <Disclosure
      as="nav"
      class="border-b border-gray-200 bg-white"
      v-slot="{ open }"
    >
      <div class="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div class="flex flex-shrink-0 items-center">
              <NuxtImg
                class="block h-8 w-auto lg:hidden"
                src="/images/hpl-logo-2.png"
                alt="High Park Livery"
              />
              <NuxtImg
                class="hidden h-12 w-auto lg:block"
                src="/images/hpl-logo-2.png"
                alt="High Park Livery"
              />
            </div>
            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                @click="item.current = true"
                :class="[
                  item.current
                    ? 'border-brand text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</NuxtLink
              >
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              type="button"
              class="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
            >
              <span class="sr-only">View notifications</span>
              <Icon
                name="ri:logout-circle-r-line"
                class="h-6 w-6"
                aria-hidden="true"
                @click="signOutUser"
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
                enter-active-class="transition ease-out duration-200"
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
          <div class="-mr-2 flex items-center sm:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
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

      <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 pt-2 pb-3">
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            as="NuxtLink"
            :to="item.href"
            :class="[
              item.current
                ? 'bg-brand-100 border-brand text-brand-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
              'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
            ]"
            :aria-current="item.current ? 'page' : undefined"
            >{{ item.name }}
          </DisclosureButton>
        </div>
        <div class="border-t border-gray-200 pt-4 pb-3">
          <div class="flex items-center px-4">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">
                {{ user.name }}
              </div>
              <div class="text-sm font-medium text-gray-500">
                {{ user.email }}
              </div>
            </div>
            <button
              type="button"
              class="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
            >
              <span class="sr-only">View notifications</span>
              <Icon
                name="ri:logout-circle-r-line"
                class="h-6 w-6"
                aria-hidden="true"
              />
            </button>
          </div>
          <div class="mt-3 space-y-1">
            <DisclosureButton
              v-for="item in userNavigation"
              :key="item.id"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              @click="item.onClick"
            >
              {{ item.name }}
            </DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <div class="py-10">
      <header>
        <div class="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8"></div>
      </header>
      <slot />
    </div>
  </div>
</template>
