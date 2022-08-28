<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMapStore } from '~~/stores/useMapStore'

const mapStore = useMapStore()
const {
  origin_formatted_address,
  destination_formatted_address,
  vehicle_image,
  pickup_date,
  vehicle_type,
  service_type,
  total_cost,
} = storeToRefs(mapStore)

const { label: vehicleType, value: vehicleTypeValue } = vehicle_type.value
const { label: serviceType, value: serviceTypeValue } = service_type.value
const vehicleImage = ref(vehicle_image.value)
</script>

<template>
  <q-page padding>
    <QuotedCard
      :totalCost="total_cost"
      :vehicleType="vehicleType"
      :serviceType="serviceType"
      :vehicleImage="vehicleImage"
      :originLocation="origin_formatted_address"
      :destinationLocation="destination_formatted_address"
      :pickupDate="pickup_date"
    />
  </q-page>
</template>
