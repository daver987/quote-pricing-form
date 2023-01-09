<script setup lang="ts">
import { Quote } from '~/schema/quote'
definePageMeta()

const supabase = useSupabaseClient()

interface QuoteNumber {
  latest_quote_number: number
}
//get the latest quote number
const getQuoteNumber = async () => {
  const { data } = await supabase
    .from('quote_number')
    .select('latest_quote_number')
    .single()
  console.log('This is the latest quote number', data)
  return data as QuoteNumber
}
const { latest_quote_number: quoteNumber } = await getQuoteNumber()

const { data: quoteFormData } = await useAsyncData('quotes', async () => {
  const { data } = await supabase
    .from('quotes')
    .select('*')
    .eq('quote_number', quoteNumber)
  return data as Quote[]
})

console.log('Quote Data: ', quoteFormData)
// console.log('Quote: ', quote.value)

const {
  pickupDate,
  pickupTime,
  returnDate,
  returnTime,
  isRoundTrip,
  vehicleTypeLabel,
  passengersLabel,
  serviceTypeLabel,
  totalFare,
  originName,
  destinationName,
  baseRate,
  gratuity,
  HST,
  fuelSurcharge,
  id,
  quote_number,
  isPearsonAirportPickup,
  isPearsonAirportDropoff,
  //@ts-ignore
} = quoteFormData.value[0] as Quote

const returnServiceTypeLabel = computed(() => {
  if (isRoundTrip && serviceTypeLabel === 'To Airport') return 'From Airport'
  if (isRoundTrip && serviceTypeLabel === 'From Airport') return 'To Airport'
  else return serviceTypeLabel
})

const roundTripFare = (roundTrip: boolean, fare: number) => {
  if (roundTrip) return fare * 2
  else return fare
}
const pearsonAirportFee = (isPickup: boolean, isDropoff: boolean) => {
  if (isPickup) return 15
  else if (isDropoff && isRoundTrip) return 15
  else return 0
}
const addPearsonFee = pearsonAirportFee(
  isPearsonAirportPickup,
  isPearsonAirportDropoff
)
const roundTripBaseRate = roundTripFare(isRoundTrip, baseRate).toFixed(2)
const roundTripGratuity = roundTripFare(isRoundTrip, gratuity).toFixed(2)
const roundTripHST = roundTripFare(isRoundTrip, HST).toFixed(2)
const roundTripFuelSurcharge = roundTripFare(
  isRoundTrip,
  fuelSurcharge
).toFixed(2)
const roundTripFareSubtotal = roundTripFare(isRoundTrip, totalFare)
const roundTripTotalFare = () => {
  if (addPearsonFee !== 15) return roundTripFareSubtotal
  else return roundTripFareSubtotal + addPearsonFee
}

const totalFareWithAirportFee = () => {
  if (addPearsonFee !== 15) return totalFare
  else return totalFare + addPearsonFee
}

function getCurrentDate() {
  const date = new Date()
  const month = date.toLocaleString('default', { month: 'long' })
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}

const currentDate = getCurrentDate()

const vehicleImage = () => {
  if (vehicleTypeLabel === 'Standard Sedan') {
    return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/8c7c6a8d-06ad-4278-1c70-9d497b1cb200/1024'
  } else if (vehicleTypeLabel === 'Premium Sedan') {
    return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d171f30-de2f-447c-a602-95ccf248c600/1024'
  } else if (vehicleTypeLabel === 'Standard SUV') {
    return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/b4bf6461-ba55-48bd-e0ba-d613ae383000/1024'
  } else {
    return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d80107f-4800-45ae-8e20-c4adf2792f00/1024'
  }
}
const vehicleImageSrc = vehicleImage()
const vehicleImageAlt = vehicleTypeLabel

const router = useRouter()
const loading = ref(false)
const submitOrder = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    router.push('/')
  }, 1000)
}

defineProps({
  pageTitle: {
    type: String,
    default: 'Quote Details',
  },
  summaryHeading: {
    type: String,
    default: 'Quote Summary',
  },
  isItQuote: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <main class="mx-auto max-w-2xl px-4 pt-8 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1
      class="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
    >
      {{ isItQuote ? 'Quote' : 'Order' }} Details
    </h1>
    <div class="mt-2 text-sm sm:flex sm:justify-between">
      <dl class="flex">
        <dt class="text-gray-500 dark:text-gray-100">
          {{ isItQuote ? 'Quote' : 'Order' }} Number&nbsp;<span
            class="mx-2 text-gray-400 dark:text-gray-100"
            aria-hidden="true"
            >&middot;</span
          >
        </dt>
        <dd class="font-medium text-red-600">
          <span>HPL-{{ quote_number }}</span>
        </dd>
        <dt>
          <span class="sr-only">Date</span>
          <span class="mx-2 text-gray-400 dark:text-gray-100" aria-hidden="true"
            >&middot;</span
          >
        </dt>
        <dd class="font-medium text-gray-900 dark:text-gray-100">
          <time :datetime="currentDate">{{ currentDate }}</time>
        </dd>
      </dl>
      <div class="mt-4 sm:mt-0">
        <NuxtLink to="/" class="font-medium text-brand-600 hover:text-brand">
          Continue Browsing
          <span aria-hidden="true"> &rarr;</span>
        </NuxtLink>
      </div>
    </div>
    <form
      class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
    >
      <section aria-labelledby="cart-heading" class="lg:col-span-7">
        <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>
        <ul
          role="list"
          class="divide-y divide-gray-200 border-t border-b border-gray-200"
        >
          <li class="flex py-6 sm:py-10">
            <div class="flex-shrink-0">
              <NuxtImg
                :src="vehicleImageSrc"
                :alt="vehicleImageSrc"
                class="h-24 w-24 rounded-md object-contain object-center sm:h-48 sm:w-48"
              />
            </div>

            <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
              <div
                class="relative pr-9 sm:grid sm:grid-cols-1 sm:gap-x-6 sm:pr-0"
              >
                <div>
                  <div class="flex justify-between mb-2">
                    <h3 class="text-base">
                      <NuxtLink
                        to="#"
                        class="font-medium text-gray-700 dark:text-gray-200 dark:hover:text-gray-200 hover:text-gray-800"
                        >{{ serviceTypeLabel }}
                      </NuxtLink>
                    </h3>
                  </div>
                  <div class="mt-2 flex flex-col text-sm space-y-1">
                    <p class="dark:text-gray-100 text-gray-500">
                      <span class="text-brand-400">Date: </span>{{ pickupDate }}
                      <span class="text-brand-400">Time: </span>
                      {{ pickupTime }}
                    </p>
                    <p class="dark:text-gray-100 text-gray-500">
                      <span class="text-brand-400">PU: </span>{{ originName }}
                    </p>
                    <p class="dark:text-gray-100 text-gray-500">
                      <span class="text-brand-400">DO: </span>
                      {{ destinationName }}
                    </p>
                    <p class="dark:text-gray-100 text-gray-500">
                      <span class="text-brand-400">Vehicle Type: </span
                      >{{ vehicleTypeLabel }}
                    </p>
                    <p class="dark:text-gray-100 text-gray-500">
                      <span class="text-brand-400">Passengers: </span
                      >{{ passengersLabel }}
                    </p>
                  </div>
                  <p class="mt-3 text-sm font-medium">
                    <span class="text-brand-400">Subtotal: </span>$
                    {{ baseRate.toFixed(2) }}
                  </p>
                </div>

                <div class="mt-4 sm:mt-0 sm:pr-9">
                  <div class="absolute top-0 right-0">
                    <button
                      type="button"
                      class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span class="sr-only">Remove</span>
                      <Icon
                        name="heroicons:x-mark-20-solid"
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <p
                class="mt-4 flex space-x-2 text-sm text-gray-700 dark:text-gray-200"
              >
                <Icon
                  name="heroicons:check-20-solid"
                  v-if="isRoundTrip"
                  class="h-5 w-5 flex-shrink-0 text-green-500"
                  aria-hidden="true"
                />
                <Icon
                  name="heroicons:clock-20-solid"
                  v-else
                  class="h-5 w-5 flex-shrink-0 text-gray-300"
                  aria-hidden="true"
                />
                <span>{{ isRoundTrip ? 'Round Trip' : `One Way Trip` }}</span>
              </p>
            </div>
          </li>
          <li v-if="isRoundTrip" class="flex py-6 sm:py-10">
            <div class="flex-shrink-0">
              <NuxtImg
                :src="vehicleImageSrc"
                :alt="vehicleImageAlt"
                class="h-24 w-24 rounded-md object-contain object-center sm:h-48 sm:w-48"
              />
            </div>

            <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
              <div
                class="relative pr-9 sm:grid sm:grid-cols-1 sm:gap-x-6 sm:pr-0"
              >
                <div>
                  <div class="flex justify-between mb-2">
                    <h3 class="text-base">
                      <NuxtLink
                        to="#"
                        class="font-medium text-gray-700 dark:text-gray-200 dark:hover:text-gray-200 hover:text-gray-800"
                        >{{ returnServiceTypeLabel }}
                      </NuxtLink>
                    </h3>
                  </div>
                  <div class="mt-2 flex flex-col text-sm space-y-1">
                    <p class="dark:text-gray-100 text-gray-500">
                      <span class="text-brand-400">Date: </span>{{ returnDate }}
                      <span class="text-brand-400">Time: </span>
                      {{ returnTime }}
                    </p>
                    <p class="dark:text-gray-100 text-gray-500">
                      <span class="text-brand-400">PU: </span
                      >{{ destinationName }}
                    </p>
                    <p class="dark:text-gray-100 text-gray-500">
                      <span class="text-brand-400">DO: </span>
                      {{ originName }}
                    </p>
                    <p class="dark:text-gray-100 text-gray-500">
                      <span class="text-brand-400">Vehicle Type: </span
                      >{{ vehicleTypeLabel }}
                    </p>
                    <p class="dark:text-gray-100 text-gray-500">
                      <span class="text-brand-400">Passengers: </span
                      >{{ passengersLabel }}
                    </p>
                  </div>
                  <p class="mt-3 text-sm font-medium">
                    <span class="text-brand-400">Subtotal: </span
                    >{{ baseRate.toFixed(2) }}
                  </p>
                </div>

                <div class="mt-4 sm:mt-0 sm:pr-9">
                  <div class="absolute top-0 right-0">
                    <button
                      type="button"
                      class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span class="sr-only">Remove</span>
                      <Icon
                        name="heroicons:x-mark-20-solid"
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <p
                class="mt-4 flex space-x-2 text-sm text-gray-700 dark:text-gray-200"
              >
                <Icon
                  name="heroicons:check-20-solid"
                  v-if="isRoundTrip"
                  class="h-5 w-5 flex-shrink-0 text-green-500"
                  aria-hidden="true"
                />
                <Icon
                  name="heroicons:clock-20-solid"
                  v-else
                  class="h-5 w-5 flex-shrink-0 text-gray-300"
                  aria-hidden="true"
                />
                <span>{{ isRoundTrip ? 'Round Trip' : `One Way Trip` }}</span>
              </p>
            </div>
          </li>
        </ul>
      </section>

      <!-- Order summary -->
      <section
        aria-labelledby="summary-heading"
        class="mt-16 rounded-lg bg-gray-100 dark:bg-grey-800 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
      >
        <h2
          id="summary-heading"
          class="text-lg font-medium dark:text-gray-100 text-gray-900"
        >
          {{ isItQuote ? 'Quote' : 'Order' }} Summary
        </h2>

        <dl class="mt-6 space-y-4">
          <div class="flex items-center justify-between">
            <dt class="text-sm dark:text-gray-300 text-gray-600">Subtotal</dt>
            <dd class="text-sm font-medium dark:text-gray-100 text-gray-900">
              $ {{ isRoundTrip ? roundTripBaseRate : baseRate.toFixed(2) }}
            </dd>
          </div>
          <div
            class="flex items-center justify-between border-t border-gray-200 pt-4"
          >
            <dt
              class="flex items-center text-sm dark:text-gray-300 text-gray-600"
            >
              <span>Fuel Surcharge</span>
              <a
                href="#"
                class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only"
                  >Learn more about how fuel surcharge is calculated</span
                >
                <Icon
                  name="heroicons:question-mark-circle-20-solid"
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </a>
            </dt>
            <dd class="text-sm font-medium dark:text-gray-100 text-gray-900">
              $
              {{
                isRoundTrip ? roundTripFuelSurcharge : fuelSurcharge.toFixed(2)
              }}
            </dd>
          </div>
          <div
            class="flex items-center justify-between border-t border-gray-200 pt-4"
          >
            <dt
              class="flex items-center text-sm dark:text-gray-300 text-gray-600"
            >
              <span>Gratuity</span>
              <a
                href="#"
                class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only"
                  >Learn more about how gratuity is calculated</span
                >
                <Icon
                  name="heroicons:question-mark-circle-20-solid"
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </a>
            </dt>
            <dd class="text-sm font-medium dark:text-gray-100 text-gray-900">
              $ {{ isRoundTrip ? roundTripGratuity : gratuity.toFixed(2) }}
            </dd>
          </div>
          <div
            v-if="addPearsonFee === 15"
            class="flex items-center justify-between border-t border-gray-200 pt-4"
          >
            <dt class="flex text-sm dark:text-gray-300 text-gray-600">
              <span>Airport Fee</span>
              <a
                href="#"
                class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only"
                  >Learn more about the Pearson Airport Fee</span
                >
                <Icon
                  name="heroicons:question-mark-circle-20-solid"
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </a>
            </dt>
            <dd class="text-sm font-medium dark:text-gray-100 text-gray-900">
              $ {{ addPearsonFee.toFixed(2) }}
            </dd>
          </div>
          <div
            class="flex items-center justify-between border-t border-gray-200 pt-4"
          >
            <dt class="flex text-sm dark:text-gray-300 text-gray-600">
              <span>HST</span>
              <a
                href="#"
                class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only"
                  >Learn more about how tax is calculated</span
                >
                <Icon
                  name="heroicons:question-mark-circle-20-solid"
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </a>
            </dt>
            <dd class="text-sm font-medium dark:text-gray-100 text-gray-900">
              $ {{ isRoundTrip ? roundTripHST : HST.toFixed(2) }}
            </dd>
          </div>
          <div
            class="flex items-center justify-between border-t border-gray-200 pt-4"
          >
            <dt class="text-base font-medium dark:text-gray-100 text-gray-900">
              {{ isItQuote ? 'Quote' : 'Order' }} total
            </dt>
            <dd class="text-base font-medium dark:text-gray-100 text-gray-900">
              {{
                isRoundTrip
                  ? roundTripTotalFare().toFixed(2)
                  : totalFareWithAirportFee().toFixed(2)
              }}
            </dd>
          </div>
        </dl>

        <div class="mt-6">
          <button
            v-if="isItQuote"
            @click="submitOrder"
            type="button"
            class="w-full rounded-md border border-transparent bg-red-600 py-3 px-4 text-base font-medium uppercase text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            {{ loading ? 'Loading...' : 'Add To Shopping Bag' }}
          </button>
          <button
            v-else
            @click="submitOrder"
            type="button"
            class="w-full rounded-md border border-transparent bg-red-600 py-3 px-4 text-base font-medium uppercase text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            {{ loading ? 'Loading...' : 'Checkout' }}
          </button>
        </div>
      </section>
    </form>
  </main>
</template>
