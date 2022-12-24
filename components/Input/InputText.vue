<template>
  <label class="flex no-wrap text-sm h-10 leading-5" :for="name">
    <div
      class="relative min-w-0 max-w-full text-left self-stretch block basis-0 grow shrink-1"
    >
      <div
        class="rounded flex no-wrap relative w-full focus:ring focus:ring-1 focus:border-brand"
      >
        <div class="max-w-full min-w-0 outline-0 relative w-full">
          <input
            class="outline-0 rounded-md block text-base pt-3 px-3 pb-0.5 leading-6 w-full placeholder-gray-400 outline-0"
            :aria-label="label"
            :name="name"
            :id="id"
            :required="required"
            :autocomplete="autocomplete"
            :placeholder="placeholder"
            :type="type"
            :value="modelValue"
            @input="(event) => (modelValue = event.target.value)"
            ref="inputField"
          />
          <div
            class="block text-xs h-5 px-3 absolute text-left overflow-hidden left-0 text-ellipsis top-0.5 font-extralight text-gray-800"
          >
            {{ label }}
          </div>
        </div>
      </div>
      <div v-if="showError" class="flex">
        <div class="block text-red-700 text-xs">
          <div role="alert">{{ errorMessage }}</div>
        </div>
      </div>
    </div>
  </label>
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
