<script setup lang="ts">
const router = useRouter()
const navigateHome = () => {
  router.push('/')
}
defineProps({
  serviceType: {
    default: 'Point To Point',
    type: String,
  },
  vehicleType: {
    default: 'Standard Sedan',
    type: String,
  },
  totalCost: {
    default: '0',
    type: String,
  },
  firstName: {
    default: 'Customer',
    type: String,
  },
  vehicleImage: {
    default:
      'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/8c7c6a8d-06ad-4278-1c70-9d497b1cb200/1024',
    type: String,
  },
  originLocation: {
    default: '',
    type: String,
  },
  destinationLocation: {
    default: '',
    type: String,
  },
  pickupDate: {
    default: '',
    type: String,
  },
})
//todo nice to have:have a popup for the vehicle types with images and information, tooltips to the vehicle and service types,
//todo add a name of the quote and a quote number, for when the email gets automatically sent
</script>

<template>
  <q-card class="max-w-xl mx-auto q-pa-sm">
    <q-card-section>
      <q-item>
        <q-item-section avatar>
          <q-avatar size="5rem">
            <img
              src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/ec6dca30-3187-4694-7605-de32caf23100/1024"
              alt="High Park Livery"
            />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h6">High Park Livery.</q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="text-h6">
        Custom Quote For:
        <span class="font-bold text-h5">{{ firstName }}</span>
      </div>
    </q-card-section>
    <q-card-section horizontal>
      <q-card-section class="col">
        <q-timeline color="primary">
          <q-timeline-entry heading>Trip Details</q-timeline-entry>
          <q-timeline-entry
            title="Pickup"
            :subtitle="pickupDate"
            icon="mdi-map-marker-radius"
            :body="originLocation"
          />
          <q-timeline-entry
            title="Drop Off"
            :subtitle="pickupDate"
            icon="mdi-map-marker-radius-outline"
            :body="destinationLocation"
          />
        </q-timeline>
      </q-card-section>
      <q-card-section class="col">
        <q-img :src="vehicleImage" alt="Vehicle Image" />
        <div class="font-bold text-center text-h5">{{ vehicleType }}</div>
      </q-card-section>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="font-bold text-md">Your All Inclusive Price</div>
      <div class="text-lg font-bold">Trip Total: ${{ totalCost }}</div>
      <div class="subheading2">Please Confirm Trip Details are Accurate</div>
    </q-card-section>
    <q-card-actions>
      <q-btn
        color="primary"
        label="Book Now"
        @click="navigateHome"
        href="https://highparklivery.com/reservations"
      />
    </q-card-actions>
  </q-card>
</template>
