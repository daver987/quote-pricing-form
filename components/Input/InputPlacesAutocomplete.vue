<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader'
import { Ref } from 'vue'

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
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  errorMessage: {
    type: String,
    default: 'Required -*',
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  showError: {
    required: false,
    type: Boolean,
    default: false,
  },
})

const mapsApiKey = useRuntimeConfig().public.GOOGLE_MAPS_API_KEY
const autocomplete = ref(
  null
) as unknown as Ref<google.maps.places.Autocomplete>
const inputField = ref(null) as unknown as Ref<HTMLInputElement>
const place = ref(null) as unknown as Ref<google.maps.places.PlaceResult>

const loader = new Loader({
  apiKey: mapsApiKey,
  version: 'weekly',
  libraries: ['places'],
})

const initAutocomplete = async () => {
  await loader.load().then(() => {
    autocomplete.value = new google.maps.places.Autocomplete(inputField.value, {
      componentRestrictions: { country: ['us', 'ca'] },
      fields: ['place_id', 'formatted_address', 'name'],
    })
    autocomplete.value.setFields(['place_id'])
    autocomplete.value.addListener('place_changed', getAutocompleteComponents)
  })
}

const getAutocompleteComponents = () => {
  place.value = autocomplete.value.getPlace()
  const { place_id } = place.value
  console.log(place_id)
  emit('change', place.value)
  return place_id
}

const emit = defineEmits(['change'])

onMounted(() => {
  initAutocomplete()
})
const modelValue = ref('')
</script>

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
            :id="name"
            :name="name"
            type="text"
            :value="modelValue"
            @input="(event) => (modelValue = event.target.value)"
            :placeholder="placeholder"
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
