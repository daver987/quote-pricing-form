<!--<template>-->
<!--  <Listbox as="div" v-model="value">-->
<!--    <ListboxLabel-->
<!--      v-show="false"-->
<!--      class="block text-sm font-medium dark:text-slate-300 text-slate-700"-->
<!--      >{{ label }}-->
<!--    </ListboxLabel>-->
<!--    <div class="relative mt-1">-->
<!--      <ListboxButton-->
<!--        :class="[isDisabled ? disabledClasses : enabledClasses]"-->
<!--      >-->
<!--        <span class="block truncate">{{-->
<!--          value?.[labelProp] || 'Select an Option'-->
<!--        }}</span>-->
<!--        <span-->
<!--          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"-->
<!--        >-->
<!--          <ChevronUpDownIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />-->
<!--        </span>-->
<!--      </ListboxButton>-->

<!--      <transition-->

<!--      >-->
<!--        <ListboxOptions-->
<!--          class="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded shadow-lg max-h-60 ring-1 ring-black dark:ring-slate-500 ring-opacity-5 focus:outline-none sm:text-sm"-->
<!--        >-->
<!--          <ListboxOption-->
<!--            v-slot="{ active, selected, disabled }"-->
<!--            v-for="option in options"-->
<!--            :key="option.keyProp"-->
<!--            :value="option"-->
<!--            :disabled="option.disabled"-->
<!--            class="disabled:text-gray-100 ui-active:bg-brand-600 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black relative cursor-default select-none py-2 pl-8 pr-4"-->
<!--          >-->
<!--            {{ option.name }}-->
<!--            <CheckIcon-->
<!--              v-show="selected"-->
<!--              aria-hidden="true"-->
<!--              class="h-7 w-7 text-brand absolute inset-y-0 left-0 flex items-center pl-3 hidden ui-selected:block"-->
<!--            />-->
<!--          </ListboxOption>-->
<!--        </ListboxOptions>-->
<!--      </transition>-->
<!--    </div>-->

<!--    <span class="text-sm text-red-500">{{ errorMessage }}</span>-->
<!--  </Listbox>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import '~/assets/css/tailwind.css'-->
<!--import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'-->
<!--import { useField } from 'vee-validate'-->

<!--const props = defineProps({-->
<!--  options: {-->
<!--    type: Array,-->
<!--    required: true,-->
<!--  },-->
<!--  modelValue: {-->
<!--    type: null,-->
<!--  },-->
<!--  keyProp: {-->
<!--    type: String,-->
<!--    required: true,-->
<!--  },-->
<!--  labelProp: {-->
<!--    type: String,-->
<!--    required: true,-->
<!--  },-->
<!--  name: {-->
<!--    type: String,-->
<!--    required: true,-->
<!--    Default: 'Select an option',-->
<!--  },-->
<!--  rules: {-->
<!--    type: null,-->
<!--    default: null,-->
<!--  },-->
<!--  isDisabled: {-->
<!--    type: Boolean,-->
<!--    default: false,-->
<!--  },-->
<!--  label: {-->
<!--    type: String,-->
<!--    required: false,-->
<!--    default: 'Label Area',-->
<!--  },-->
<!--})-->

<!--const { value, errorMessage } = useField(props.name, props.rules, {-->
<!--  initialValue: props.modelValue,-->
<!--})-->
<!--const disabledClasses =-->
<!--  'relative w-full rounded border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm'-->
<!--const enabledClasses =-->
<!--  'relative w-full cursor-default rounded border ui-selected:dark:text-slate-300 text-slate-500 border-slate-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-300 dark:disabled:text-slate-700 disabled:bg-slate-800 disabled:text-gray-400 sm:text-sm dark:bg-slate-800 dark:text-slate-500'-->
<!--</script>-->
<template>
  <Listbox as="div" v-model="selected" :name="name">
    <ListboxLabel v-if="false" class="block text-sm font-medium text-gray-700"
      >{{ label }}
    </ListboxLabel>
    <div class="relative mt-1">
      <ListboxButton
        class="relative w-full cursor-default rounded border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand sm:text-sm"
      >
        <span class="block truncate">{{ selected.label }}</span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
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
            as="template"
            v-for="option in options"
            :key="option.value"
            :value="option"
            :disabled="option.disabled"
            v-slot="{ active, selected }"
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
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'

// const options = [
//   { value: 1, label: 'Wade Cooper' },
//   { value: 2, label: 'Arlene Mccoy' },
//   { value: 3, label: 'Devon Webb' },
//   { value: 4, label: 'Tom Cook' },
//   { value: 5, label: 'Tanya Fox' },
//   { value: 6, label: 'Hellen Schmvaluet' },
//   { value: 7, label: 'Caroline Schultz' },
//   { value: 8, label: 'Mason Heaney' },
//   { value: 9, label: 'Claudie Smitham' },
//   { value: 10, label: 'Emil Schaefer' },
// ]

const selected = ref(props.options[0])

const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: [{ value: 0, label: 'Wade Cooper' }],
  },
  label: {
    type: String,
    required: false,
    default: 'Label Area',
  },
  name: {
    type: String,
    required: false,
    default: 'Select an option',
  },
})
</script>
