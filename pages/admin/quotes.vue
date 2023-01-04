<script setup>
definePageMeta({
  layout: 'adminlayout',
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

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  // More people...
]

const selectedPeople = ref([])
const checked = ref(false)
const indeterminate = computed(
  () =>
    selectedPeople.value.length > 0 &&
    selectedPeople.value.length < people.length
)
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Quotes</h1>
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
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div
            class="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
          >
            <div
              v-if="selectedPeople.length > 0"
              class="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16"
            >
              <button
                type="button"
                class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Bulk edit
              </button>
              <button
                type="button"
                class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Delete all
              </button>
            </div>
            <table class="min-w-full table-fixed divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
                    <input
                      type="checkbox"
                      class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand sm:left-6"
                      :checked="
                        indeterminate || selectedPeople.length === people.length
                      "
                      :indeterminate="indeterminate"
                      @change="
                        selectedPeople = $event.target.checked
                          ? people.map((p) => p.email)
                          : []
                      "
                    />
                  </th>
                  <th
                    scope="col"
                    class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Trip Type
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Origin
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Destination
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
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Book</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="quote in quoteData"
                  :key="quote.email"
                  :class="[
                    selectedPeople.includes(quote.email) && 'bg-gray-50',
                  ]"
                >
                  <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                    <div
                      v-if="selectedPeople.includes(quote.email)"
                      class="absolute inset-y-0 left-0 w-0.5 bg-brand-600"
                    ></div>
                    <input
                      type="checkbox"
                      class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand sm:left-6"
                      :value="quote.email"
                      v-model="selectedPeople"
                    />
                  </td>
                  <td
                    :class="[
                      'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                      selectedPeople.includes(quote.email)
                        ? 'text-brand-600'
                        : 'text-gray-900',
                    ]"
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
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span class="font-semibold font-sans text-gray-600"
                      >{{ quote.pickupDate }} {{ quote.pickupTime }}</span
                    ><br />
                    <span>{{ quote.originName }}</span
                    ><br />
                    <span>{{ quote.originFormattedAddress }}</span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span>{{ quote.destinationName }}</span
                    ><br />
                    <span>{{ quote.destinationFormattedAddress }}</span>
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm font-semibold font-sans text-gray-600"
                  >
                    ${{ quote.totalFare }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span
                      class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                      >Quoted</span
                    >
                  </td>
                  <td
                    class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
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
