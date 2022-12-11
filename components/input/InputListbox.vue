<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useField } from 'vee-validate'

// import { useField } from 'vee-validate'
interface Props {
  modelValue: {
    value: number
    label: string
  }
  options: {
    value: number
    label: string
  }
  name: string
  rules?: null | string
  keyProp?: string
  labelProp?: string
}

const {
  options = {
    value: 1,
    label: 'Select Input',
  },
  modelValue = { value: 2, label: 'point to point' },
  name = 'select',
  rules = null,
} = defineProps<Props>()
// const emit = defineEmits(['update:modelValue'])

const { value, errorMessage } = useField(name, rules, {
  initialValue: modelValue,
})
</script>
<template>
  <Listbox as="div" v-model="value" :name="name">
    <div class="relative mt-1">
      <ListboxButton
        class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
      >
        <span class="block truncate">{{ modelValue.label }}</span>
        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <ChevronUpDownIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>
      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="option in options"
            :key="option[keyProp]"
            :value="option"
          >
            <li
              :class="[
                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-10 pr-4',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
                >{{ option.label }}</span
              >
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
              >
                <CheckIcon class="w-5 h-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
    <span v-show="false" class="text-xs text-red-500">{{ errorMessage }}</span>
  </Listbox>
</template>
