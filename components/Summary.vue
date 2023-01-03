<script setup lang="ts">
import useFareCalculator from '@/composables/useFareCalculator'
const props = defineProps({
  quoteNumber: {
    default: '450',
    type: String,
  },
  firstname: {
    default: 'John',
    type: String,
  },
  lastname: {
    default: 'Doe',
    type: String,
  },
  isRoundTrip: {
    default: 'No',
    type: String,
  },
  subtotal: {
    default: 99.99,
    type: Number,
  },
  pickupDate: {
    default: '2021-01-01',
    type: String,
  },
  pickupTime: {
    default: '12:00',
    type: String,
  },
  origin: {
    default: 'Pearson Internation Airport',
    type: String,
  },
  destination: {
    default: '1265 Sixth Line, Oakville ON, L6H 1X2',
    type: String,
  },
  service: {
    default: 'Point To Point',
    type: String,
  },
  vehicle: {
    default: 'Standard Sedan',
    type: String,
  },
})

const baseAmount = computed(() => {
  return props.subtotal
})

const roundTrip = computed(() => {
  return props.isRoundTrip === 'Yes'
})

const fare = useFareCalculator(baseAmount.value, roundTrip.value)

const { subtotalWithoutTax, roundTripSubtotalWithoutTax, tax, totalAmount } =
  fare

const printSummary = () => {
  window.print()
}
const space = ' '
</script>

<template>
  <Container class="px-4 mx-auto sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Order Summary</h1>
        <p class="mt-2 text-sm font-bold text-gray-700">
          <span class="text-base font-bold leading-relaxed text-gray-900"
            >Quote Number: </span
          ><span class="text-base font-bold leading-relaxed text-red-600">
            HPL-2{{ quoteNumber }}</span
          ><br />
          For:
          <span class="font-normal">{{ firstname }} {{ space }}</span>
          <span class="font-normal"> {{ lastname }}</span
          ><br />
          Pick up Date:
          <time class="font-normal" :datetime="pickupDate">{{
    pickupDate
}}</time>
          <br />
          Pick up Time:
          <time class="font-normal" :datetime="pickupTime">{{
    pickupTime
}}</time>
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click="printSummary"
          type="button"
          class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium tracking-wider text-white uppercase border border-transparent rounded-md shadow-sm bg-primary hover:bg-primary focus:ring-primary focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto"
        >
          Print
        </button>
      </div>
    </div>
    <div class="flex flex-col mt-8 -mx-4 sm:-mx-6 md:mx-0">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
            >
              <span class="sm:hidden">Details</span>
              <span class="invisible sm:visible">Routing</span>
            </th>

            <th
              scope="col"
              class="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Service Type
            </th>
            <th
              scope="col"
              class="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Vehicle Type
            </th>
            <th
              scope="col"
              class="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
            >
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200">
            <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
              <div class="mt-0.5 text-gray-500 sm:hidden">
                <span class="font-bold text-gray-900">Routing </span>
              </div>
              <div class="font-normal text-gray-500">
                <span class="font-bold text-gray-900">PU: </span>{{ origin }}
              </div>
              <div class="font-normal text-gray-500">
                <span class="font-bold text-gray-900">DO: </span>
                {{ destination }}
              </div>
              <div class="mt-0.5 text-gray-500 sm:hidden">
                <span class="font-bold text-gray-900">Vehicle Type: </span>
                {{ service }}<br /><span class="font-bold text-gray-900"
                  >Service Type: </span
                >{{ vehicle }}
              </div>
            </td>
            <td
              class="hidden px-3 py-4 text-sm text-right text-gray-500 sm:table-cell"
            >
              {{ service }}
            </td>
            <td
              class="hidden px-3 py-4 text-sm text-right text-gray-500 sm:table-cell"
            >
              {{ vehicle }}
            </td>
            <td
              class="py-4 pl-3 pr-4 text-sm text-right text-gray-500 sm:pr-6 md:pr-0"
            >
              ${{ subtotalWithoutTax }}
            </td>
          </tr>
          <tr v-if="isRoundTrip === 'Yes'" class="border-b border-gray-200">
            <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
              <div class="mt-0.5 text-gray-500 sm:hidden">
                <span class="font-bold text-gray-900">Routing </span>
              </div>
              <div class="font-normal text-gray-500">
                <span class="font-bold text-gray-900">PU: </span
                >{{ destination }}
              </div>
              <div class="font-normal text-gray-500">
                <span class="font-bold text-gray-900">DO: </span>
                {{ origin }}
              </div>
              <div class="mt-0.5 text-gray-500 sm:hidden">
                <span class="font-bold text-gray-900">Vehicle Type: </span>
                {{ service }}<br /><span class="font-bold text-gray-900"
                  >Service Type: </span
                >{{ vehicle }}
              </div>
            </td>
            <td
              class="hidden px-3 py-4 text-sm text-right text-gray-500 sm:table-cell"
            >
              {{ service }}
            </td>
            <td
              class="hidden px-3 py-4 text-sm text-right text-gray-500 sm:table-cell"
            >
              {{ vehicle }}
            </td>
            <td
              class="py-4 pl-3 pr-4 text-sm text-right text-gray-500 sm:pr-6 md:pr-0"
            >
              ${{ subtotalWithoutTax }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th
              scope="row"
              colspan="3"
              class="hidden pt-6 pl-6 pr-3 text-sm font-normal text-right text-gray-500 sm:table-cell md:pl-0"
            >
              Subtotal
            </th>
            <th
              scope="row"
              class="pt-6 pl-4 pr-3 text-sm font-normal text-left text-gray-500 sm:hidden"
            >
              Subtotal
            </th>
            <td
              class="pt-6 pl-3 pr-4 text-sm text-right text-gray-500 sm:pr-6 md:pr-0"
            >
              ${{ roundTripSubtotalWithoutTax }}
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              colspan="3"
              class="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-gray-500 sm:table-cell md:pl-0"
            >
              HST
            </th>
            <th
              scope="row"
              class="pt-4 pl-4 pr-3 text-sm font-normal text-left text-gray-500 sm:hidden"
            >
              HST
            </th>
            <td
              class="pt-4 pl-3 pr-4 text-sm text-right text-gray-500 sm:pr-6 md:pr-0"
            >
              ${{ tax }}
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              colspan="3"
              class="hidden pt-4 pl-6 pr-3 text-sm font-semibold text-right text-gray-900 sm:table-cell md:pl-0"
            >
              Total
            </th>
            <th
              scope="row"
              class="pt-3 pl-4 pr-3 text-sm font-semibold text-left text-gray-900 sm:hidden"
            >
              Total
            </th>
            <td
              class="pt-3 pl-3 pr-4 text-sm font-semibold text-right text-gray-900 sm:pr-6 md:pr-0"
            >
              ${{ totalAmount }}
            </td>
          </tr>
        </tfoot>
      </table>
      <table class="mt-4">
        <tr class="pb-4 border-t border-gray-200">
          <td class="py-2">
            <Container>
              <div
                class="flex flex-col items-start gap-4 mt-4 mb-6 med:justify-between md:flex-row"
              >
                <div class="flex flex-col mb-2">
                  <p class="text-base font-bold text-black">
                    We require a credit card to hold your reservation
                  </p>
                  <p class="text-sm text-red-700 max-w-[65ch]">
                    Please note, 24 hours before the scheduled pickup time, an
                    authorization hold will be placed on your credit card for
                    the full amount of your reservation.
                  </p>
                </div>
                <div class="flex flex-col">
                  <p class="text-base font-bold text-black">
                    Card is not charged until the completion of your trip
                  </p>
                  <p class="text-sm text-red-700">
                    All prices include taxes, surcharges and gratuity
                  </p>
                  <p class="text-sm text-red-700">
                    **Does not include hwy tolls, parking fees, or any extra
                    fees incurred during the trip
                  </p>
                </div>
              </div>
            </Container>
          </td>
        </tr>
      </table>
    </div>
  </Container>
</template>
