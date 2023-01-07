<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

defineProps({
  open: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const surchargeName = ref('')
const surchargeAmount = ref(0)
const isPercentage = ref(false)
const isTaxable = ref(false)
const isFlat = ref(false)
const enabled = ref(false)
const surchargeDescription = ref('')

const supabase = useSupabaseClient()

const createSurcharge = async () => {
  const { data: surcharges } = await useAsyncData('surcharges', async () => {
    try {
      const { data, error } = await supabase.from('surcharges').insert({
        name: surchargeName.value,
        amount: surchargeAmount.value,
        is_percentage: isPercentage.value,
        is_taxable: isTaxable.value,
        is_flat: isFlat.value,
        is_active: enabled.value,
        description: surchargeDescription.value,
      })
      console.log('Surcharges', surcharges)
      console.log('Data: ', data)
      return { data, error }
    } catch (error) {
      console.log('Error: ', error)
    }
  })
}
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <div class="fixed inset-0" />

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <form
                  class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                >
                  <div class="h-0 flex-1 overflow-y-auto">
                    <div class="bg-brand-700 py-6 px-4 sm:px-6">
                      <div class="flex items-center justify-between">
                        <DialogTitle class="text-lg font-medium text-white"
                          >New Surcharge
                        </DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            class="rounded-md bg-brand-700 text-brand-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            @click="open = false"
                          >
                            <span class="sr-only">Close panel</span>
                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div class="mt-1">
                        <p class="text-sm text-brand-300">
                          Get started by filling in the information below to
                          create your new surcharge.
                        </p>
                      </div>
                    </div>
                    <div class="flex flex-1 flex-col justify-between">
                      <div class="divide-y divide-gray-200 px-4 sm:px-6">
                        <div class="space-y-6 pt-6 pb-5">
                          <div>
                            <label
                              for="surcharge-name"
                              class="block text-sm font-medium text-gray-900"
                              >Surcharge name</label
                            >
                            <div class="mt-1">
                              <input
                                v-model="surchargeName"
                                type="text"
                                name="surcharge-name"
                                id="surcharge-name"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand sm:text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              for="surcharge-amount"
                              class="block text-sm font-medium text-gray-900"
                              >Surcharge amount</label
                            >
                            <div class="mt-1">
                              <input
                                v-model="surchargeAmount"
                                type="number"
                                name="surcharge-amount"
                                id="surcharge-amount"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand sm:text-sm"
                              />
                            </div>
                          </div>
                          <fieldset class="space-y-5">
                            <legend class="sr-only">Surcharges</legend>
                            <div class="relative flex items-start">
                              <div class="flex h-5 items-center">
                                <input
                                  v-model="isPercentage"
                                  id="percentage"
                                  aria-describedby="percentage-description"
                                  name="percentage"
                                  type="checkbox"
                                  class="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand"
                                />
                              </div>
                              <div class="ml-3 text-sm">
                                <label
                                  for="percentage"
                                  class="font-medium text-gray-700"
                                  >Percentage</label
                                >
                                <span
                                  id="percentage-description"
                                  class="text-gray-500"
                                  ><span class="sr-only">Percentage </span
                                  ><br />Is the surcharge a percentage of
                                  another value</span
                                >
                              </div>
                            </div>
                            <div class="relative flex items-start">
                              <div class="flex h-5 items-center">
                                <input
                                  v-model="isFlat"
                                  id="flat-rate"
                                  aria-describedby="rate-description"
                                  name="flat-rate"
                                  type="checkbox"
                                  class="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand"
                                />
                              </div>
                              <div class="ml-3 text-sm">
                                <label
                                  for="flat-rate"
                                  class="font-medium text-gray-700"
                                  >Flat Rate</label
                                >
                                <span
                                  id="rate-description"
                                  class="text-gray-500"
                                  ><span class="sr-only">Flat Rate </span
                                  ><br />Is the surcharge a flat amount</span
                                >
                              </div>
                            </div>
                            <div class="relative flex items-start">
                              <div class="flex h-5 items-center">
                                <input
                                  v-model="isTaxable"
                                  id="taxable"
                                  aria-describedby="taxable-description"
                                  name="taxable"
                                  type="checkbox"
                                  class="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand"
                                />
                              </div>
                              <div class="ml-3 text-sm">
                                <label
                                  for="taxable"
                                  class="font-medium text-gray-700"
                                  >Taxable</label
                                >
                                <span
                                  id="taxable-description"
                                  class="text-gray-500"
                                  ><span class="sr-only">Taxable </span><br />Is
                                  the surcharge taxable</span
                                >
                              </div>
                            </div>
                          </fieldset>
                          <div>
                            <label
                              for="description"
                              class="block text-sm font-medium text-gray-900"
                              >Description</label
                            >
                            <div class="mt-1">
                              <textarea
                                v-model="surchargeDescription"
                                id="description"
                                name="description"
                                rows="4"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand sm:text-sm"
                              />
                            </div>
                          </div>
                          <InputToggle
                            label="Enabled"
                            v-model:update="enabled"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-shrink-0 justify-end px-4 py-4">
                    <button
                      type="button"
                      class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                      @click="open = false"
                    >
                      Cancel
                    </button>
                    <button
                      @click="createSurcharge"
                      type="button"
                      class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-brand-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
