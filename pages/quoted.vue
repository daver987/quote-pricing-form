<script setup lang="ts">
// import { storeToRefs } from 'pinia'
// import { useMapStore } from '~~/stores/useMapStore'
//
// // full_name.value = first_name.value + ' ' + last_name.value
//
// const mapStore = useMapStore()
// const {
//   origin_location,
//   destination_location,
//   origin_formatted_address,
//   destination_formatted_address,
//   first_name,
//   last_name,
//   vehicle_image,
//   pickup_date,
//   pickup_time,
//   vehicle_type,
//   service_type,
//   number_of_hours,
//   num_passengers,
//   is_round_trip,
//   total_cost,
// } = storeToRefs(mapStore)
//
// const { label: vehicleType, value: vehicleTypeValue } = vehicle_type.value
// const { label: serviceType, value: serviceTypeValue } = service_type.value
// const vehicleImage = ref(vehicle_image.value)
// const vehicleImages = () => {
//   if (vehicle_type.value.label === 'Standard Sedan') {
//     return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/8c7c6a8d-06ad-4278-1c70-9d497b1cb200/1024'
//   } else if (vehicle_type.value.label === 'Premium Sedan') {
//     return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d171f30-de2f-447c-a602-95ccf248c600/1024'
//   } else if (vehicle_type.value.label === 'Standard SUV') {
//     return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/b4bf6461-ba55-48bd-e0ba-d613ae383000/1024'
//   } else {
//     return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d80107f-4800-45ae-8e20-c4adf2792f00/1024'
//   }
// }
// const vehicleImage =  vehicleImages() as unknown as string
// vehicle_image.value = vehicleImage
</script>

<template>
  <DatePicker />

  <!--  <q-page padding>-->
  <!--    <QuotedCard-->
  <!--      :totalCost="total_cost"-->
  <!--      :vehicleType="vehicleType"-->
  <!--      :serviceType="serviceType"-->
  <!--      :vehicleImage="vehicleImage"-->
  <!--      :originLocation="origin_formatted_address"-->
  <!--      :destinationLocation="destination_formatted_address"-->
  <!--      :pickupDate="pickup_date"-->
  <!--    />-->
  <!--  </q-page>-->
</template>
