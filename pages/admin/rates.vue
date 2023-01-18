<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { PlusIcon as PlusIconMini } from '@heroicons/vue/20/solid'

definePageMeta({
  name: 'Rates',
  layout: 'admin',
  middleware: ['auth'],
})

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
                  class="inline-flex items-center p-1 text-white border border-transparent rounded-full shadow-sm bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                >
                  <PlusIconMini class="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div class="mt-2 overflow-hidden bg-white shadow sm:rounded-md">
              <ul role="list" class="divide-y divide-gray-200">
                <li v-for="rate in vehicleType" :key="rate.id">
                  <div class="block hover:bg-gray-50">
                    <div class="px-4 py-4 sm:px-6">
                      <div class="flex items-center justify-between">
                        <p
                          class="font-sans text-sm font-medium truncate text-brand-600"
                        >
                          {{ rate.name }}
                        </p>
                        <div class="flex flex-shrink-0 ml-2">
                          <p
                            class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                          >
                            {{ rate.is_active ? 'Active' : 'Inactive' }}
                          </p>
                        </div>
                      </div>
                      <div class="mt-2 sm:flex sm:justify-between">
                        <div class="flex flex-col">
                          <p
                            class="flex items-center font-sans text-sm font-semibold text-gray-500"
                          >
                            <span
                              class="mr-2 font-sans font-medium text-gray-900"
                              >Price Per Km:
                            </span>
                            {{ rate.per_km }}
                          </p>
                          <p
                            class="flex items-center font-sans text-sm font-semibold text-gray-500"
                          >
                            <span
                              class="mr-2 font-sans font-medium text-gray-900"
                              >Min Price:
                            </span>
                            {{ rate.min_rate_distance }}
                          </p>
                          <p
                            class="flex items-center font-sans text-sm font-semibold text-gray-500"
                          >
                            <span
                              class="mr-2 font-sans font-medium text-gray-900"
                              >Min Km Included:
                            </span>
                            {{ rate.min_distance }}
                          </p>
                        </div>
                        <div class="flex flex-col">
                          <p
                            class="flex items-center font-sans text-sm font-semibold text-gray-500"
                          >
                            <span
                              class="mr-2 font-sans font-medium text-gray-900"
                              >Price Per Hour:
                            </span>
                            {{ rate.per_hour }}
                          </p>
                          <p
                            class="flex items-center font-sans text-sm font-semibold text-gray-500"
                          >
                            <span
                              class="mr-2 font-sans font-medium text-gray-900"
                              >Min Price Per Hour:
                            </span>
                            {{ rate.min_rate_hourly }}
                          </p>
                          <p
                            class="flex items-center font-sans text-sm font-semibold text-gray-500"
                          >
                            <span
                              class="mr-2 font-sans font-medium text-gray-900"
                              >Min Hours Included:
                            </span>
                            {{ rate.min_hours_hourly }}
                          </p>
                        </div>
                        <div class="flex flex-col">
                          <p
                            class="flex items-center font-sans text-sm font-semibold text-gray-500"
                          >
                            <span
                              class="mr-2 font-sans font-medium text-gray-900"
                              >Max Passengers:
                            </span>
                            {{ rate.max_passengers }}
                          </p>
                          <p
                            class="flex items-center font-sans text-sm font-semibold text-gray-500"
                          >
                            <span
                              class="mr-2 font-sans font-medium text-gray-900"
                              >Max luggage:
                            </span>
                            {{ rate.max_luggage }}
                          </p>
                        </div>

                        <div
                          class="flex items-center mt-2 text-sm text-gray-500 sm:mt-0"
                        >
                          <Icon
                            name="heroicons:pencil"
                            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <p>
                            <button
                              class="font-sans font-medium text-indigo-600"
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
                  @click="openSurcharges = !openSurcharges"
                  type="button"
                  class="inline-flex items-center p-1 text-white border border-transparent rounded-full shadow-sm bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                >
                  <PlusIconMini class="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div class="mt-2 overflow-hidden bg-white shadow sm:rounded-md">
              <ul role="list" class="divide-y divide-gray-200">
                <li v-for="surcharge in surcharges" :key="surcharge.id">
                  <div class="block hover:bg-gray-50">
                    <div class="px-4 py-4 sm:px-6">
                      <div class="flex items-center justify-between">
                        <p
                          class="font-sans text-sm font-medium truncate text-brand-600"
                        >
                          {{ surcharge.name }}
                        </p>
                        <div class="flex flex-shrink-0 ml-2">
                          <p
                            class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                          >
                            {{ surcharge.is_active ? 'Active' : 'Inactive' }}
                          </p>
                        </div>
                      </div>
                      <div class="mt-2 sm:flex sm:justify-between">
                        <div class="flex flex-col">
                          <p
                            class="flex items-center font-sans text-sm font-semibold text-gray-500"
                          >
                            <span
                              class="mr-2 font-sans font-medium text-gray-900"
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
                          class="flex items-center mt-2 text-sm text-gray-500 sm:mt-0"
                        >
                          <Icon
                            name="heroicons:pencil"
                            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <p>
                            <button
                              class="font-sans font-medium text-indigo-600"
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
    <SettingsSurcharges v-bind:isOpen="openSurcharges" :open="openSurcharges" />
    <SettingsVehicleType :open="openVehicleType" />
  </div>
</template>
