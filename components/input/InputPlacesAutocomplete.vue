<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader'
import { Ref } from 'vue'
import { useField } from 'vee-validate'

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

const formattedId = computed(() => {
  return 'pac-' + Math.random().toString(36).substring(2, 9)
})

const mapsApiKey = useRuntimeConfig().public.MAPS_API_KEY
const autocomplete = ref(null) as Ref<google.maps.places.Autocomplete>
const inputField = ref(null) as Ref<HTMLInputElement>
const place = ref(null) as Ref<google.maps.places.PlaceResult>

const loader = new Loader({
  apiKey: mapsApiKey,
  version: 'weekly',
  libraries: ['places'],
})

const initAutocomplete = async () => {
  await loader.load().then(() => {
    autocomplete.value = new google.maps.places.Autocomplete(inputField.value, {
      componentRestrictions: { country: ['us', 'ca'] },
      fields: ['place_id', 'formatted_address', 'geometry', 'name'],
    })
    autocomplete.value.setFields(['place_id'])
    autocomplete.value.addListener('place_changed', getAutocompleteComponents)
  })
}

const getAutocompleteComponents = () => {
  place.value = autocomplete.value.getPlace()
  const { place_id, formatted_address, geometry, name } = place.value
  inputValue.value = `${name} ${formatted_address}`
  console.log(place_id, formatted_address, geometry, name)
}

watch(place, (newVal) => {
  emit('change', newVal)
})

const emit = defineEmits(['change'])

onMounted(() => {
  initAutocomplete()
})

//todo add props to make component more reusable
</script>

<template>
  <div :class="{ 'has-error': !!errorMessage, success: meta.valid }">
    <label
      v-show="false"
      :for="name"
      class="mb-2 text-sm font-medium text-gray-700"
      ><span class="label-text">{{ label }}</span></label
    >
    <div class="relative max-w-xl">
      <input
        ref="inputField"
        :name="name"
        :id="formattedId"
        :type="type"
        :value="inputValue"
        :placeholder="placeholder"
        @change="emit('change', place)"
        @input="handleChange"
        @blur="handleBlur"
        class="w-full placeholder-gray-500 rounded-none shadow-md focus:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-1 focus-visible:ring-offset-primary sm:text-sm"
      />
    </div>
  </div>
</template>

<style scoped></style>
