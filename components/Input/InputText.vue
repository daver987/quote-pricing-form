<template>
  <div
    class="rounded border border-gray-300 px-3 bg-white shadow-sm focus-within:border-brand-600 focus-within:ring-1 focus-within:ring-brand-600"
  >
    <label :for="name" class="block text-xxs font-regular text-gray-700">{{
      label
    }}</label>
    <input
      :aria-label="label"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      :type="type"
      @update="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="block w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm pb-0.5 -mt-1"
    />
    <div v-if="showError" class="flex">
      <div class="block text-red-700 text-xs">
        <div role="alert">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  modelValue: {
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
const emit = defineEmits(['change'])
</script>
