<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white pt-6 pb-3 px-2 shadow-xl transition-all sm:my-8 sm:w-full max-w-sm"
            >
              <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                  @click="open = false"
                >
                  <span class="sr-only">Close</span>
                  Close
                </button>
              </div>
              <Calendar class="mx-auto" @date="updateDate" />
              <button
                class="bg-brand-400 px-12 mt-3 rounded-md py-2"
                @click="toggleCalendar"
              >
                Close
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <div>
    <label :for="name" class="block text-xs font-medium text-gray-700">{{
      label
    }}</label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3">
        <CalendarIcon
          @click="toggleCalendar"
          class="h-5 w-5 text-gray-400"
          aria-hidden="true"
          role="button"
        />
      </div>
      <input
        type="text"
        :aria-label="label"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        v-model="inputValue"
        class="block w-full rounded-md border-gray-300 pl-10 focus:border-brand focus:ring-brand sm:text-sm"
      />
    </div>
    <div v-if="showError" class="flex">
      <div class="block text-red-700 text-xs">
        <div role="alert">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CalendarIcon } from '@heroicons/vue/20/solid'
import {
  DialogPanel,
  TransitionChild,
  TransitionRoot,
  Dialog,
} from '@headlessui/vue'
defineProps({
  label: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  id: {
    type: String,
    required: false,
  },
  required: {
    type: Boolean,
    required: false,
  },
  autocomplete: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  errorMessage: {
    type: String,
    required: false,
    default: 'Required -*',
  },
  showError: {
    type: Boolean,
    required: false,
    default: false,
  },
})
const inputValue = ref('')
const emit = defineEmits(['change'])
const open = ref(false)
const selectedDate = ref('')
const toggleCalendar = () => {
  open.value = !open.value
}
const updateDate = (date: string) => {
  selectedDate.value = date
  inputValue.value = date
  console.log('date', date)
}
</script>
