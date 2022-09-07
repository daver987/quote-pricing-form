<script setup lang="ts">
const { label, value, inputClasses, wrapperClasses, placeholder } =
  defineProps<{
    label?: string
    value?: string
    inputClasses?: string
    wrapperClasses?: string
    placeholder?: string
  }>()
</script>

<template>
  <div class="input-text" :class="wrapperClasses">
    <label for="input-text">{{ label }}</label>
    <input
      id="input-text"
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :placeholder="placeholder"
      :class="inputClasses"
    />
  </div>
</template>
