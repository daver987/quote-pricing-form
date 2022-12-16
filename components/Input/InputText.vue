<template>
  <div
    class="formkit-wrapper"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
  >
    <label :for="name" class="formkit-label hidden"
      ><span>{{ label }}</span></label
    >
    <div class="formkit-inner">
      <input
        :name="name"
        :id="name"
        :type="type"
        :value="inputValue"
        :placeholder="placeholder"
        @input="handleChange"
        @blur="handleBlur"
        class="formkit-input"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

// const { errorMessage, value } = useField()
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  value: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
})
const name = toRef(props, 'name')

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
})
// defineEmits(['update:modelValue'])
//todo improve the props and add some default values
</script>
