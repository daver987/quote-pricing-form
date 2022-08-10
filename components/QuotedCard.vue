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
})
//todo make images dynamic by making the strings reactive, improve layout on final quote page, reroute to home if there is no quote
//todo make the service type and vehicle type dynamic, make the vehicle image dynamic
//todo nice to have:have a popup for the vehicle types with images and information, tooltips to the vehicle and service types,
</script>

<template>
  <q-page padding>
    <q-card class="max-w-xl mx-auto">
      <q-toolbar>
        <q-avatar size="150px" square>
          <q-img
            src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/32f6ecb7-b792-4983-5f36-81963b3e2500/1024"
          />
        </q-avatar>
        <q-toolbar-title> Luxury Ride Service </q-toolbar-title>
      </q-toolbar>
      <q-card-section>
        <div class="text-h4">Billing Contact</div>
        <div class="subheading">{{ fullName }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-card-section class="max-w-lg p-6">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img
                  src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/041ea32d-630c-4f0c-a2ba-0c0c8f7d5f00/640"
                  alt="Luxury Ride Service"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>Luxury Ride Service Inc.</q-item-label>
              <q-item-label caption>Taking You Around In Style</q-item-label>
            </q-item-section>
          </q-item>
          <q-img :src="vehicleImage" alt="Standard Sedan" />
        </q-card-section>
        <h2 class="text-3xl font-bold tracking-wider text-center">
          {{ vehicleType }}
        </h2>
        <h3 class="text-2xl font-bold tracking-wider">Trip Details</h3>
        <p>{{ serviceType }}</p>
      </q-card-section>
      <q-separator />
      <q-card-section class="py-2">
        <div class="font-bold text-md">Your All Inclusive Price</div>
        <div class="text-lg font-bold">Trip Total: ${{ totalCost }}</div>
        <p>Please Confirm Trip Details are Accurate</p>
      </q-card-section>
      <q-card-actions>
        <q-btn color="primary" label="Start Over" @click="navigateHome" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>
