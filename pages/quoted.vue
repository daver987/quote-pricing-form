<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useContactsStore } from '~~/stores/useContactStore'
import { useDealStore } from '~~/stores/useDealStore'
import { useQuoteStore } from '~~/stores/useQuoteStore'
import { useMapStore } from '~~/stores/useMapStore'

//import map info from the store
const mapStore = useMapStore()
const { origin_location, destination_location } = mapStore


//import contact info from store
const contacts = useContactsStore()
const { first_name, last_name, full_name } = storeToRefs(contacts)

full_name.value = first_name.value + ' ' + last_name.value

const deal = useDealStore()
const {
  pickup_date,
  pickup_time,
  vehicle_type,
  service_type,
  num_hours,
  num_passengers,
  is_round_trip,
} = storeToRefs(deal)

const quote = useQuoteStore()
const { total_cost } = storeToRefs(quote)
const { label: vehicleType, value: vehicleTypeValue } = vehicle_type.value
const { label: serviceType, value: serviceTypeValue } = service_type.value



const vehicleImages = () => {
  if (vehicle_type.value.label === 'Standard Sedan') {
    return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/8c7c6a8d-06ad-4278-1c70-9d497b1cb200/1024'
  } else if (vehicle_type.value.label === 'Premium Sedan') {
    return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d171f30-de2f-447c-a602-95ccf248c600/1024'
  } else if (vehicle_type.value.label === 'Standard SUV') {
    return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/b4bf6461-ba55-48bd-e0ba-d613ae383000/1024'
  } else {
    return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d80107f-4800-45ae-8e20-c4adf2792f00/1024'
  }
}
const vehicleImage = ref(vehicleImages()) as unknown as string
</script>

<template>
  <q-page padding>
    <QuotedCard :totalCost="total_cost" :vehicleType="vehicleType" :serviceType="serviceType" :fullName="full_name" :vehicleImage="vehicleImage" :originLocation="origin_location" :destinationLocation="destination_location" :pickupDate="pickup_date" />
  </q-page>
</template>
