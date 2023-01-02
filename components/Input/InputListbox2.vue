<template>
  <Listbox as="div" v-model="value" v-slot="{ disabled }" :name="name">
    <ListboxLabel v-if="false" class="block text-sm font-medium text-gray-700"
      >{{ value?.label }}
    </ListboxLabel>
    <div class="relative mt-1">
      <ListboxButton
        :class="classes"
        class="relative w-full cursor-default rounded border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand sm:text-sm"
      >
        <span class="block truncate">{{
          value?.label || 'Please select an option'
        }}</span>
        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <ChevronUpDownIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-for="option in options"
            :key="option.keyProp"
            :value="option"
            as="template"
            :disabled="option.isDisabled"
            v-slot="{ active, selected, disabled }"
          >
            <li
              :class="[
                active ? 'text-white bg-brand-600' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-8 pr-4',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-semibold' : 'font-normal',
                  'block truncate',
                  active ? 'text-white' : 'text-gray-900',
                  disabled
                    ? 'cursor-not-allowed text-opacity-50'
                    : 'text-gray-900',
                ]"
                >{{ option.label }}</span
              >
              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-brand-600',
                  'absolute inset-y-0 left-0 flex items-center pl-1.5',
                ]"
              >
                <CheckIcon class="w-5 h-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
    <span class="text-red-500">{{ errorMessage }}</span>
  </Listbox>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  ListboxLabel,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useField } from 'vee-validate'

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: null,
  },
  keyProp: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  classes: {
    type: String,
    required: false,
    default: 'text-gray-900',
  },
  rules: {
    type: null,
    default: null,
  },
})

const { value, errorMessage } = useField(props.name, props.rules, {
  initialValue: props.modelValue,
})
</script>
