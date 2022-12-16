<script setup lang="ts">
import { createInput } from '@formkit/vue'
import { Ref } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import InputPlacesAutocomplete from '~/components/Input/InputPlacesAutocomplete.vue'

// const props = defineProps({
//   context: Object,
// })

const groupValues = ref({})

const autocompleteSchema = [
  {
    $cmp: InputPlacesAutocomplete,
    props: {
      context: '$node.context',
    },
  },
]

const mapsApiKey = useRuntimeConfig().public.GOOGLE_MAPS_API_KEY
const autocomplete = ref(null) as Ref<google.maps.places.Autocomplete>
const inputField = ref(null)
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
      fields: ['place_id', 'formatted_address', 'name'],
      // fields: ['place_id', 'formatted_address', 'geometry', 'name'],
      // fields: ['place_id'],
    })
    autocomplete.value.setFields(['place_id'])
    autocomplete.value.addListener('place_changed', getAutocompleteComponents)
  })
}
// @change="emit('change', place)"
//
const getAutocompleteComponents = () => {
  place.value = autocomplete.value.getPlace()
  const { place_id } = place.value
  console.log(place_id)
  return place_id
}

const data = () => ({
  inputField: inputField.value,
  place,
})

const inputAutocomplete = createInput(autocompleteSchema, {
  props: [],
})

const handleInput = (value: any) => {
  console.log('handleInput', value)
  groupValues.value = value
}
</script>

<template>
  <FormKit type="form" class="w-full">
    <FormKit
      :type="inputAutocomplete"
      label="Pickup Location"
      help="We use the custom prop location in our placeholder."
      @input="handleInput"
    />
  </FormKit>
</template>

<style scoped></style>
