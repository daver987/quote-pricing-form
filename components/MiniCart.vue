<script setup lang="ts">
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { useQuoteStore } from '~/stores/useQuoteStore'
import { storeToRefs } from 'pinia'
import { useCartStore } from '~/stores/useCartStore'

const cartStore = useCartStore()
const { addedToCart } = storeToRefs(cartStore)
const quoteStore = useQuoteStore()
const { isRoundTrip } = storeToRefs(quoteStore)

const products = [
  {
    id: 1,
    name: 'Point to Point',
    color: '00-00-0000',
    imageSrc:
      'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/8c7c6a8d-06ad-4278-1c70-9d497b1cb200/1024',
    imageAlt: 'Point to Point',
  },
]

const itemsInCart = () => {
  if (addedToCart.value && isRoundTrip.value) {
    return 2
  }
  if (addedToCart.value && !isRoundTrip.value) {
    return 1
  }
  return 0
}
</script>

<template>
  <Popover class="ml-4 flow-root text-sm lg:relative lg:ml-8">
    <PopoverButton class="group -m-2 flex items-center p-2">
      <ShoppingBagIcon
        class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
      <span
        :class="[
          addedToCart
            ? 'dark:text-gray-300 dark:group-hover:text-gray-400 text-gray-700 group-hover:text-gray-800'
            : 'text-brand-600 group-hover:text-brand-700',
        ]"
        class="ml-2 text-sm font-medium"
        >{{ itemsInCart() }}</span
      >
      <span class="sr-only">items in cart, view bag</span>
    </PopoverButton>
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <PopoverPanel
        class="absolute inset-x-0 z-10 top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5"
      >
        <h2 class="sr-only">Shopping Cart</h2>

        <form class="mx-auto max-w-2xl px-4" @submit.prevent>
          <ul role="list" class="divide-y divide-gray-200">
            <li class="flex items-center py-6" v-if="!addedToCart">
              <Icon
                name="teenyicons:mood-sad-outline"
                class="h-16 w-16 flex-none rounded-md"
              />
              <div class="ml-4 flex-auto">
                <h3 class="font-medium text-lg font-sans text-gray-900">
                  Cart is Empty
                </h3>
              </div>
            </li>
            <li
              v-else
              v-for="product in products"
              :key="product.id"
              class="flex items-center py-6"
            >
              <NuxtPicture
                :src="product.imageSrc"
                :alt="product.imageAlt"
                class="h-16 w-16 flex-none rounded-md border object-contain border-gray-200"
              />
              <div class="ml-4 flex-auto">
                <h3 class="font-medium font-sans text-gray-900">
                  <NuxtLink :to="product.href">{{ product.name }}</NuxtLink>
                </h3>
                <p class="text-gray-500 font-sans">{{ product.color }}</p>
              </div>
            </li>
          </ul>

          <button
            v-if="addedToCart"
            type="submit"
            class="w-full uppercase font-sans tracking-wider rounded-md border border-transparent bg-brand-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            Book Now
          </button>

          <p v-if="addedToCart" class="mt-6 text-center">
            <button
              @click="cartStore.removeFromCart()"
              class="text-sm font-medium font-sans text-brand-600 hover:text-brand"
            >
              Remove From Cart
            </button>
          </p>
        </form>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
