<template>
  <HeadlessListbox as="div" v-model="value">
    <div class="relative mt-1">
      <HeadlessListboxButton
        :class="[isDisabled ? disabledClasses : enabledClasses]"
      >
        <span class="block truncate">{{ value?.[labelProp] || label }}</span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </HeadlessListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <HeadlessListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <HeadlessListboxOption
            v-slot="{ active, selected, disabled }"
            v-for="option in options"
            :key="option[keyProp]"
            :value="option"
            class="ui-selected:font-semibold ui-not-selected:font-normal block truncate relative cursor-default select-none py-2 pl-8 pr-4 ui-active:bg-brand-600 ui-active:text-white relative cursor-default select-none py-2 pl-8 pr-4 ui-not-active:text-gray-900"
          >
            {{ option[labelProp] }}
            <CheckIcon
              class="ui-not-active:invisible ui-active:visible h-5 w-5 ui-active:text-white ui-not-active:text-brand-600 ui-selected:block absolute inset-y-0 left-0 pl-1.5"
              aria-hidden="true"
            />
          </HeadlessListboxOption>
        </HeadlessListboxOptions>
      </transition>
    </div>

    <span class="text-red-500">{{ errorMessage }}</span>
  </HeadlessListbox>
</template>

<script setup lang="ts">
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
  labelProp: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rules: {
    type: null,
    default: null,
  },
  label: {
    type: String,
    default: 'Select an option',
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
})

const { value, errorMessage } = useField(props.name, props.rules, {
  initialValue: props.modelValue,
})
const disabledClasses =
  'relative w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm'
const enabledClasses =
  'relative w-full cursor-default rounded-md border text-gray-500 border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-300 disabled:text-gray-400 sm:text-sm'
</script>
