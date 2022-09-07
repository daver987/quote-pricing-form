<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMapStore } from '~~/stores/useMapStore'
import { Ref } from 'vue'

const mapStore = useMapStore()
const {
  origin_formatted_address,
  destination_formatted_address,
  vehicle_image,
  pickup_date,
  vehicle_type,
  service_type,
  total_cost,
  first_name,
} = storeToRefs(mapStore)

const { label: vehicleType } = vehicle_type.value
const { label: serviceType } = service_type.value
const vehicleImage = ref(vehicle_image.value) as Ref<string>
</script>

<template>
  <QPage padding>
    <QuotedCard
      :totalCost="total_cost"
      :vehicleType="vehicleType"
      :serviceType="serviceType"
      :vehicleImage="vehicleImage"
      :originLocation="origin_formatted_address"
      :destinationLocation="destination_formatted_address"
      :pickupDate="pickup_date"
      :firstName="first_name"
    />
  </QPage>
</template>
