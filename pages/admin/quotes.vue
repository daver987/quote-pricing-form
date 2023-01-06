<script setup>
definePageMeta({
  name: 'Quotes',
  layout: 'admin',
  middleware: ['auth'],
})
const supabase = useSupabaseClient()
const quoteData = ref({})

const { data: quotes } = await useAsyncData('quotes', async () => {
  const { data } = await supabase.from('quotes').select()
  return data
})
quoteData.value = quotes.value
console.log('Quote Data: ', quoteData.value)
console.log('Quotes: ', quotes.value)

// const selectedPeople = ref([])
// const checked = ref(false)
// const indeterminate = computed(
//   () =>
//     selectedQuotes.value.length > 0 &&
//     selectedQuotes.value.length < quotes.length
// )
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center -mt-20">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900"></h1>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 sm:w-auto"
        >
          Add Quote
        </button>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                    Pickup
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Drop Off
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
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="quote in quoteData" :key="quote.id">
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-red-500 sm:pl-6 lg:pl-8"
                  >
                    HPL-2300
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900"
                  >
                    <span>{{ quote.firstName }} {{ quote.lastName }}</span
                    ><br />
                    <span>{{ quote.userEmail }}</span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span>{{ quote.vehicleTypeLabel }}</span
                    ><br />
                    <span>{{ quote.serviceTypeLabel }}</span>
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-ellipsis overflow-hidden max-w-[24ch]"
                  >
                    <span class="font-semibold font-sans text-gray-600"
                      >{{ quote.pickupDate }} {{ quote.pickupTime }}</span
                    ><br />
                    <span>{{ quote.originName }}</span
                    ><br />
                    <span>{{ quote.originFormattedAddress }}</span>
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-ellipsis overflow-hidden max-w-[24ch]"
                  >
                    <span>{{ quote.destinationName }}</span
                    ><br />
                    <span>{{ quote.destinationFormattedAddress }}</span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    ${{ quote.totalFare }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span
                      class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                      >Quoted</span
                    >
                  </td>
                  <td
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8"
                  >
                    <a href="#" class="text-brand-600 hover:text-brand-900"
                      >Book<span class="sr-only">, {{ quote.name }}</span></a
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
