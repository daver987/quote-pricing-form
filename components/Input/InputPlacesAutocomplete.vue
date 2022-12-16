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
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  successMessage: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
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

// const formattedId = computed(() => {
//   return `pac-${Math.random().toString(36).substring(2, 9)}`
// })

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
//
// watch(place, (newVal) => {
//   emit('change', newVal)
// })
const emit = defineEmits(['change'])
const emitChange = (evt) => {
  const place = evt.target
  emit('change', place)
  console.log(evt.target.target)
}

onMounted(() => {
  initAutocomplete()
})
const modelValue = ref('')
</script>

<template>
  <!--  <div-->
  <!--    :class="{ 'has-error': !!errorMessage, success: meta.valid }"-->
  <!--    class="w-full"-->
  <!--  >-->
  <!--    <label-->
  <!--      v-show="false"-->
  <!--      :for="name"-->
  <!--      class="mb-2 text-sm font-medium text-gray-700"-->
  <!--      ><span>{{ label }}</span></label-->
  <!--    >-->
  <!--    <div class="relative max-w-xl">-->
  <input
    ref="inputField"
    class="formkit-input"
    :name="name"
    :id="name"
    :type="type"
    :value="modelValue"
    @change="emitChange"
    :placeholder="placeholder"
  />
  <!--    </div>-->
  <!--  </div>-->
</template>

<style scoped></style>
