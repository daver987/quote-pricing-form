<script setup lang="ts">
import { Quote } from '~/schema/quote'

const supabase = useSupabaseClient()

const { data: quote } = await useAsyncData('quotes', async () => {
  const { data } = await supabase.from('quotes').select()
  return data as Quote[]
})
const quoteFormData = quote.value.pop() as Quote

console.log('Quote Data: ', quoteFormData)
console.log('Quote: ', quote.value)

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
} = quoteFormData as Quote

const returnServiceTypeLabel = computed(() => {
  if (isRoundTrip && serviceTypeLabel === 'To Airport') return 'From Airport'
  if (isRoundTrip && serviceTypeLabel === 'From Airport') return 'To Airport'
  else return serviceTypeLabel
})

const roundTripFare = (roundTrip: boolean, fare: number) => {
  if (roundTrip) return fare * 2
  else return fare
}

const roundTripBaseRate = roundTripFare(isRoundTrip, baseRate).toFixed(2)
const roundTripGratuity = roundTripFare(isRoundTrip, gratuity).toFixed(2)
const roundTripHST = roundTripFare(isRoundTrip, HST).toFixed(2)
const roundTripFuelSurcharge = roundTripFare(
  isRoundTrip,
  fuelSurcharge
).toFixed(2)
const roundTripTotalFare = roundTripFare(isRoundTrip, totalFare).toFixed(2)

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
</script>

<template>
  <div class="bg-white dark:bg-grey-900">
    <!-- Mobile menu -->
    <main
      class="mx-auto max-w-2xl px-4 pt-8 pb-24 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h1
        class="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
      >
        Quote Details
      </h1>
      <div class="mt-2 text-sm sm:flex sm:justify-between">
        <dl class="flex">
          <dt class="text-gray-500 dark:text-gray-100">
            Quote number&nbsp;<span
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
            <span
              class="mx-2 text-gray-400 dark:text-gray-100"
              aria-hidden="true"
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
                        <span class="text-brand-400">Date: </span
                        >{{ pickupDate }}
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
                        <span class="text-brand-400">Date: </span
                        >{{ returnDate }}
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
            Quote summary
          </h2>

          <dl class="mt-6 space-y-4">
            <div class="flex items-center justify-between">
              <dt class="text-sm dark:text-gray-300 text-gray-600">Subtotal</dt>
              <dd class="text-sm font-medium dark:text-gray-100 text-gray-900">
                $ {{ isRoundTrip ? roundTripBaseRate : baseRate }}
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
                    >Learn more about how shipping is calculated</span
                  >
                  <Icon
                    name="heroicons:question-mark-circle-20-solid"
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                </a>
              </dt>
              <dd class="text-sm font-medium dark:text-gray-100 text-gray-900">
                $ {{ isRoundTrip ? roundTripFuelSurcharge : fuelSurcharge }}
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
                    >Learn more about how shipping is calculated</span
                  >
                  <Icon
                    name="heroicons:question-mark-circle-20-solid"
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                </a>
              </dt>
              <dd class="text-sm font-medium dark:text-gray-100 text-gray-900">
                $ {{ isRoundTrip ? roundTripGratuity : gratuity }}
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
                $ {{ isRoundTrip ? roundTripHST : HST }}
              </dd>
            </div>
            <div
              class="flex items-center justify-between border-t border-gray-200 pt-4"
            >
              <dt
                class="text-base font-medium dark:text-gray-100 text-gray-900"
              >
                Order total
              </dt>
              <dd
                class="text-base font-medium dark:text-gray-100 text-gray-900"
              >
                {{ isRoundTrip ? roundTripTotalFare : totalFare }}
              </dd>
            </div>
          </dl>

          <div class="mt-6">
            <button
              type="submit"
              class="w-full rounded-md border border-transparent bg-red-600 py-3 px-4 text-base font-medium uppercase text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Proceed To Book
            </button>
          </div>
        </section>
      </form>

      <!-- Related products -->
      <!--      <section aria-labelledby="related-heading" class="mt-24">-->
      <!--        <h2 id="related-heading" class="text-lg font-medium text-gray-900">-->
      <!--          You may also like&hellip;-->
      <!--        </h2>-->

      <!--        <div-->
      <!--          class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"-->
      <!--        >-->
      <!--          <div-->
      <!--            v-for="relatedProduct in relatedProducts"-->
      <!--            :key="relatedProduct.id"-->
      <!--            class="group relative"-->
      <!--          >-->
      <!--            <div-->
      <!--              class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-80"-->
      <!--            >-->
      <!--              <img-->
      <!--                :src="relatedProduct.imageSrc"-->
      <!--                :alt="relatedProduct.imageAlt"-->
      <!--                class="h-full w-full object-cover object-center lg:h-full lg:w-full"-->
      <!--              />-->
      <!--            </div>-->
      <!--            <div class="mt-4 flex justify-between">-->
      <!--              <div>-->
      <!--                <h3 class="text-sm text-gray-700">-->
      <!--                  <a :href="relatedProduct.href">-->
      <!--                    <span aria-hidden="true" class="absolute inset-0" />-->
      <!--                    {{ relatedProduct.name }}-->
      <!--                  </a>-->
      <!--                </h3>-->
      <!--                <p class="mt-1 text-sm text-gray-500">-->
      <!--                  {{ relatedProduct.color }}-->
      <!--                </p>-->
      <!--              </div>-->
      <!--              <p class="text-sm font-medium text-gray-900">-->
      <!--                {{ relatedProduct.price }}-->
      <!--              </p>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </section>-->
    </main>
  </div>
</template>
