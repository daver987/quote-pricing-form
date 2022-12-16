<template>
  <div class="w-full col-span-6">
    <label v-show="showLabel" :for="name" class="label"
      ><span class="label-text">{{ label }}</span></label
    >
    <select
      :id="id"
      :name="name"
      class="w-full max-w-lg rounded-none select select-md select-bordered"
      :value="modelValue"
      @input="$emit('update:modelValue', handleInputChange($event))"
      :required="required"
    >
      <option disabled value="">
        {{ placeholder }}
      </option>
      <option v-for="option in options" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <span v-show="validation" class="label-text text-error">
      {{ validationErrorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { FormOptions } from '~~/types/FormOptions'

const handleInputChange = (event: Event): any =>
  (event.target as HTMLInputElement).value

interface Props {
  id: string
  name?: string
  label?: string
  placeholder?: string
  options: FormOptions[]
  required?: boolean
  validation?: boolean
  validationErrorMessage?: string
  showLabel?: boolean
  modelValue: string | number
}

defineProps<Props>()
defineEmits(['update:modelValue'])
</script>
