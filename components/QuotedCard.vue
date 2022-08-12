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
    default: 0,
    type: Number,
  },
  fullName: {
    default: '',
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
//todo reroute to home if there is no quote
//todo nice to have:have a popup for the vehicle types with images and information, tooltips to the vehicle and service types,
//todo add a name of the quote and a quote number, for when the email gets automatically sent
</script>

<template>
  <q-card class="max-w-xl mx-auto q-pa-sm">
    <q-card-section>
      <q-item>
        <q-item-section avatar>
          <q-avatar size="4rem">
            <img
              src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/041ea32d-630c-4f0c-a2ba-0c0c8f7d5f00/640"
              alt="Luxury Ride Service"
            />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h6">Luxury Ride Service Inc. </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="text-h6">
        Custom Quote For:
        <span class="font-bold text-h5">{{ fullName }}</span>
      </div>
    </q-card-section>
    <q-card-section horizontal>
      <q-card-section class="col">
        <q-timeline color="primary">
          <q-timeline-entry heading> Trip Details</q-timeline-entry>
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
      <q-btn color="primary" label="Start Over" @click="navigateHome" />
    </q-card-actions>
  </q-card>
</template>
