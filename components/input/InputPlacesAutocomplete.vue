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

const mapsApiKey = useRuntimeConfig().public.GOOGLE_MAPS_API_KEY
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
      // fields: ['place_id', 'formatted_address', 'geometry', 'name'],
      fields: ['place_id'],
    })
    autocomplete.value.setFields(['place_id'])
    autocomplete.value.addListener('place_changed', getAutocompleteComponents)
  })
}

const getAutocompleteComponents = () => {
  place.value = autocomplete.value.getPlace()
  const { place_id } = place.value
  console.log(place_id)
  return place_id
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
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
      />
    </div>
  </div>
</template>

<style scoped></style>
