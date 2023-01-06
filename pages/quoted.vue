<script setup lang="ts">
// import { useQuoteStore } from '~/stores/useQuoteStore'
// import { storeToRefs } from 'pinia'
// import { ValidationSchema } from '~/schema/quoteFormValues'
// import { Ref } from 'vue'
// import { rates } from '~/data/rates'
// import { getRateFromId } from '~~/composables/useRateCalculator'

// const quoteStore = useQuoteStore()
// const { quoteFormValues } = storeToRefs(quoteStore) as {
//   quoteFormValues: Ref<ValidationSchema>
// }

// const calculateBase = (distance: number, min: number, km: number) => {
//   return distance <= 25 ? minFare : (distance - 25) * km + min
// }
// const calculateTotal = (base: number) => 1.42 * base

// const {
// vehicleType,
// serviceType,
// originData,
// destinationData,
// pickupDate,
// firstName,
//   calculatedDistance,
// } = quoteFormValues.value

// const serviceId = vehicleType?.value as number
// const vehicleTypeLabel = vehicleType?.label as string
// const serviceTypeLabel = serviceType?.label as string
// const originAddress = originData?.formatted_address as string
// const destinationAddress = destinationData?.formatted_address as string
// const ratesFromId = getRateFromId(serviceId, rates)
// const minFare = ratesFromId?.min_rate_distance as number
// const perKm = ratesFromId?.per_km as number
// const total = calculateTotal(
//   calculateBase(calculatedDistance, minFare, perKm) as unknown as number
// )
// const formattedTotal = total.toFixed(2)
//
// const vehicleImage = ref<string>(
//   'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/8c7c6a8d-06ad-4278-1c70-9d497b1cb200/1024'
// )
</script>

<template>
  <div class="dark:bg-grey-900">
    <AppNavigation />
    <ShoppingCart />
  </div>
</template>
