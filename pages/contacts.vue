<script setup lang="ts">
import { Database } from '~/types/supabase'

definePageMeta({
  name: 'Contacts',
  layout: 'default',
  middleware: ['auth'],
})
const supabase = useSupabaseClient<Database>()
const quoteData = ref({})

const { data: quotes } = await useAsyncData('contacts.vue', async () => {
  const { data } = await supabase.from('quotes').select()
  return data
})
const sortedQuotes = async () =>
  (quoteData.value = [...quotes.value].sort(
    (a, b) => a.quote_number - b.quote_number
  ))
await sortedQuotes()

// quoteData.value = [...quotes.value].sort(
//   (a, b) => a.quote_number - b.quote_number
// )

const refresh = () => refreshNuxtData('quotes')

const bookingPending = ref(false)
const bookOrder = async (quoteInfo: any) => {
  console.log(quoteInfo)
  const { data, pending } = await useFetch('/api/book-order', {
    method: 'POST',
    body: quoteInfo,
  })
  await console.log(data.value)
  bookingPending.value = pending.value
  await refresh()
}

console.log('Quote Data: ', quoteData.value)
console.log('Quotes: ', quotes.value)
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="-mt-12 sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900"></h1>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          type="button"
          class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 sm:w-auto"
        >
          Add Quote
        </button>
      </div>
    </div>
    <div class="flex flex-col mt-8">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <div
            class="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    Quote Number
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Order Type
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Trip Routing
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Return Trip Routing
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                  >
                    <span class="sr-only">Book</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="quote in quoteData" :key="quote.quote_number">
                  <td
                    ref="tableRow"
                    class="py-4 pl-4 pr-3 text-sm text-red-500 whitespace-nowrap sm:pl-6 lg:pl-8"
                  >
                    HPL-{{ quote.quote_number }}
                  </td>
                  <td
                    class="px-3 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span>{{ quote.firstName }} {{ quote.lastName }}</span
                    ><br />
                    <a
                      class="text-indigo-600"
                      :href="`mailto:${quote.userEmail}`"
                      >{{ quote.userEmail }}</a
                    ><br />
                    <a
                      class="text-indigo-600"
                      :href="`tel:${quote.phone_number}`"
                      >{{ quote.phone_number }}</a
                    ><br />
                  </td>
                  <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                    <span>{{ quote.vehicleTypeLabel }}</span
                    ><br />
                    <span>{{ quote.serviceTypeLabel }}</span>
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-ellipsis overflow-hidden max-w-[24ch]"
                  >
                    <span class="font-sans font-semibold text-gray-600"
                      >{{ quote.pickupDate }} {{ quote.pickupTime }}</span
                    ><br />
                    <span>{{ quote.originName }}</span
                    ><br />
                    <span>{{ quote.destinationName }}</span>
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-ellipsis overflow-hidden max-w-[24ch]"
                  >
                    <div v-if="quote.isRoundTrip">
                      <span
                        class="font-sans font-semibold text-gray-600 text-ellipsis overflow-hidden max-w-[24ch]"
                        >{{ quote.returnDate }} {{ quote.returnTime }}</span
                      ><br />
                      <span
                        class="text-ellipsis overflow-hidden max-w-[24ch]"
                        >{{ quote.destinationName }}</span
                      >
                      <br />
                      <span
                        class="text-ellipsis overflow-hidden max-w-[24ch]"
                        >{{ quote.originName }}</span
                      >
                    </div>
                  </td>
                  <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                    ${{ quote.roundTripTotal.toFixed(2) }}
                  </td>
                  <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                    <span
                      v-if="!quote.isBooked"
                      class="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full"
                      >{{ bookingPending ? 'loading...' : 'Quoted' }}</span
                    >
                    <span
                      v-else
                      class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                      >{{ bookingPending ? 'loading...' : 'Booked' }}</span
                    >
                  </td>
                  <td
                    class="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6 lg:pr-8"
                  >
                    <span
                      @click="bookOrder(quote)"
                      class="text-brand-600 hover:text-brand-900 cursor-pointer"
                      >Book</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
