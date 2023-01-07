<script setup>
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { PlusIcon as PlusIconMini } from '@heroicons/vue/20/solid'

definePageMeta({
  name: 'Rates',
  layout: 'admin',
  middleware: ['auth'],
})

const rates = [
  {
    id: 1,
    name: 'Standard Sedan',
    per_km: 1.7,
    per_hour: 80,
    min_hours_hourly: 2,
    min_rate_distance: 80,
    min_distance: 25,
    min_rate_hourly: 160,
    max_passengers: 3,
    max_luggage: 3,
    type: 'Active',
    vehicle_image_alt: 'Standard Sedan',
    vehicle_image_src: '/images/cadillac-xts-1.png',
  },
  {
    id: 2,
    name: 'Premium Sedan',
    per_km: 1.95,
    per_hour: 90,
    min_hours_hourly: 2,
    min_rate_distance: 90,
    min_distance: 25,
    min_rate_hourly: 180,
    max_passengers: 3,
    max_luggage: 3,
    type: 'Active',
    vehicle_image_alt: 'Premium Sedan',
    vehicle_image_src: '/images/cadillac-xts-1.png',
  },
  {
    id: 3,
    name: 'Standard SUV',
    per_km: 2.2,
    per_hour: 105,
    min_hours_hourly: 2,
    min_rate_distance: 105,
    min_distance: 25,
    min_rate_hourly: 210,
    max_passengers: 7,
    max_luggage: 7,
    type: 'Active',
    vehicle_image_alt: 'Standard SUV',
    vehicle_image_src: '/images/cadillac-xts-1.png',
  },
  {
    id: 4,
    name: 'Premium SUV',
    per_km: 2.7,
    per_hour: 128,
    min_hours_hourly: 2,
    min_rate_distance: 128,
    min_distance: 25,
    min_rate_hourly: 256,
    max_passengers: 6,
    max_luggage: 6,
    type: 'Active',
    vehicle_image_alt: 'Premium SUV',
    vehicle_image_src: '/images/cadillac-xts-1.png',
  },
]

const openSurcharges = ref(false)
const toggleSurcharges = () => {
  openSurcharges.value = !openSurcharges.value
  console.log(openSurcharges.value)
}
const openVehicleType = ref(false)

const toggleVehicleType = () => {
  openVehicleType.value = !openVehicleType.value
  console.log(openVehicleType.value)
}

const supabase = useSupabaseClient()
const { data: vehicleType } = await useAsyncData('vehicle_type', async () => {
  const { data } = await supabase.from('vehicle_type').select()
  return data
})
console.log(vehicleType.value)

const { data: surcharges } = await useAsyncData('surcharges', async () => {
  const { data } = await supabase.from('surcharges').select()
  return data
})
console.log(surcharges.value)
</script>

<template>
  <div class="relative mx-auto max-w-7xl md:px-8 xl:px-0">
    <div class="divide-y divide-gray-200">
      <div class="mt-6">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <div class="flex justify-between px-4">
              <div class="space-y-1">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  Vehicle Types
                </h3>
                <p class="max-w-2xl text-sm text-gray-500">
                  These are your current Vehicle Types and Rates.
                </p>
              </div>
              <div class="pt-4">
                <button
                  @click="toggleVehicleType"
                  type="button"
                  class="inline-flex items-center rounded-full border border-transparent bg-brand-600 p-1 text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                >
                  <PlusIconMini class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div class="overflow-hidden bg-white shadow sm:rounded-md mt-2">
              <ul role="list" class="divide-y divide-gray-200">
                <li v-for="rate in vehicleType" :key="rate.id">
                  <div class="block hover:bg-gray-50">
                    <div class="px-4 py-4 sm:px-6">
                      <div class="flex items-center justify-between">
                        <p
                          class="truncate text-sm font-sans font-medium text-brand-600"
                        >
                          {{ rate.name }}
                        </p>
                        <div class="ml-2 flex flex-shrink-0">
                          <p
                            class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                          >
                            {{ rate.is_active ? 'Active' : 'Inactive' }}
                          </p>
                        </div>
                      </div>
                      <div class="mt-2 sm:flex sm:justify-between">
                        <div class="flex flex-col">
                          <p
                            class="flex items-center text-sm font-sans font-semibold text-gray-500"
                          >
                            <span
                              class="font-sans text-gray-900 font-medium mr-2"
                              >Price Per Km:
                            </span>
                            {{ rate.per_km }}
                          </p>
                          <p
                            class="flex items-center text-sm font-sans font-semibold text-gray-500"
                          >
                            <span
                              class="font-sans text-gray-900 font-medium mr-2"
                              >Min Price:
                            </span>
                            {{ rate.min_rate_distance }}
                          </p>
                          <p
                            class="flex items-center text-sm font-sans font-semibold text-gray-500"
                          >
                            <span
                              class="font-sans text-gray-900 font-medium mr-2"
                              >Min Km Included:
                            </span>
                            {{ rate.min_distance }}
                          </p>
                        </div>
                        <div class="flex flex-col">
                          <p
                            class="flex items-center text-sm font-sans font-semibold text-gray-500"
                          >
                            <span
                              class="font-sans text-gray-900 font-medium mr-2"
                              >Price Per Hour:
                            </span>
                            {{ rate.per_hour }}
                          </p>
                          <p
                            class="flex items-center text-sm font-sans font-semibold text-gray-500"
                          >
                            <span
                              class="font-sans text-gray-900 font-medium mr-2"
                              >Min Price Per Hour:
                            </span>
                            {{ rate.min_rate_hourly }}
                          </p>
                          <p
                            class="flex items-center text-sm font-sans font-semibold text-gray-500"
                          >
                            <span
                              class="font-sans text-gray-900 font-medium mr-2"
                              >Min Hours Included:
                            </span>
                            {{ rate.min_hours_hourly }}
                          </p>
                        </div>
                        <div class="flex flex-col">
                          <p
                            class="flex items-center text-sm font-sans font-semibold text-gray-500"
                          >
                            <span
                              class="font-sans text-gray-900 font-medium mr-2"
                              >Max Passengers:
                            </span>
                            {{ rate.max_passengers }}
                          </p>
                          <p
                            class="flex items-center text-sm font-sans font-semibold text-gray-500"
                          >
                            <span
                              class="font-sans text-gray-900 font-medium mr-2"
                              >Max luggage:
                            </span>
                            {{ rate.max_luggage }}
                          </p>
                        </div>

                        <div
                          class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                        >
                          <Icon
                            name="heroicons:pencil"
                            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <p>
                            <button
                              class="text-indigo-600 font-sans font-medium"
                            >
                              Edit
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div class="flex justify-between px-4">
              <div class="space-y-1">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  Surcharges
                </h3>
                <p class="max-w-2xl text-sm text-gray-500">
                  These are your current surcharges.
                </p>
              </div>
              <div class="pt-4">
                <button
                  @click="toggleSurcharges"
                  type="button"
                  class="inline-flex items-center rounded-full border border-transparent bg-brand-600 p-1 text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                >
                  <PlusIconMini class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div class="overflow-hidden bg-white shadow sm:rounded-md mt-2">
              <ul role="list" class="divide-y divide-gray-200">
                <li v-for="surcharge in surcharges" :key="surcharge.id">
                  <div class="block hover:bg-gray-50">
                    <div class="px-4 py-4 sm:px-6">
                      <div class="flex items-center justify-between">
                        <p
                          class="truncate text-sm font-sans font-medium text-brand-600"
                        >
                          {{ surcharge.name }}
                        </p>
                        <div class="ml-2 flex flex-shrink-0">
                          <p
                            class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                          >
                            {{ surcharge.is_active ? 'Active' : 'Inactive' }}
                          </p>
                        </div>
                      </div>
                      <div class="mt-2 sm:flex sm:justify-between">
                        <div class="flex flex-col">
                          <p
                            class="flex items-center text-sm font-sans font-semibold text-gray-500"
                          >
                            <span
                              class="font-sans text-gray-900 font-medium mr-2"
                              >Rate Amount:
                            </span>
                            {{ surcharge.value }}
                          </p>
                        </div>
                        <div class="flex flex-col">
                          <SwitchGroup as="div" class="flex items-center">
                            <Switch
                              v-model="surcharge.is_percentage"
                              :class="[
                                surcharge.is_percentage
                                  ? 'bg-brand-600'
                                  : 'bg-gray-200',
                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2',
                              ]"
                            >
                              <span
                                aria-hidden="true"
                                :class="[
                                  surcharge.is_percentage
                                    ? 'translate-x-5'
                                    : 'translate-x-0',
                                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                ]"
                              />
                            </Switch>
                            <SwitchLabel as="span" class="ml-3">
                              <span class="text-sm font-medium text-gray-900"
                                >Percentage</span
                              >
                            </SwitchLabel>
                          </SwitchGroup>
                        </div>
                        <div class="flex flex-col">
                          <SwitchGroup as="div" class="flex items-center">
                            <Switch
                              v-model="surcharge.is_flat"
                              :class="[
                                surcharge.is_flat
                                  ? 'bg-brand-600'
                                  : 'bg-gray-200',
                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2',
                              ]"
                            >
                              <span
                                aria-hidden="true"
                                :class="[
                                  surcharge.is_flat
                                    ? 'translate-x-5'
                                    : 'translate-x-0',
                                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                ]"
                              />
                            </Switch>
                            <SwitchLabel as="span" class="ml-3">
                              <span class="text-sm font-medium text-gray-900"
                                >Flat</span
                              >
                            </SwitchLabel>
                          </SwitchGroup>
                        </div>
                        <div class="flex flex-col">
                          <SwitchGroup as="div" class="flex items-center">
                            <Switch
                              v-model="surcharge.is_taxable"
                              :class="[
                                surcharge.is_taxable
                                  ? 'bg-brand-600'
                                  : 'bg-gray-200',
                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2',
                              ]"
                            >
                              <span
                                aria-hidden="true"
                                :class="[
                                  surcharge.is_taxable
                                    ? 'translate-x-5'
                                    : 'translate-x-0',
                                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                ]"
                              />
                            </Switch>
                            <SwitchLabel as="span" class="ml-3">
                              <span class="text-sm font-medium text-gray-900"
                                >Taxable</span
                              >
                            </SwitchLabel>
                          </SwitchGroup>
                        </div>

                        <div
                          class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                        >
                          <Icon
                            name="heroicons:pencil"
                            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <p>
                            <button
                              class="text-indigo-600 font-sans font-medium"
                            >
                              Edit
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SettingsSurcharges :open="openSurcharges" />
    <SettingsVehicleType :open="openVehicleType" />
  </div>
</template>
