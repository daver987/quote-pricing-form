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

// const name = toRef(props, 'name')

// const {
//   value: inputValue,
//   errorMessage,
//   handleBlur,
//   handleChange,
//   meta,
// } = useField(name, undefined, {
//   initialValue: props.value,
// })

// const formattedId = computed(() => {
//   return `pac-${Math.random().toString(36).substring(2, 9)}`
// })

const mapsApiKey = useRuntimeConfig().public.GOOGLE_MAPS_API_KEY
const autocomplete = ref(null) as unknown as Ref<google.maps.places.Autocomplete>
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
const emitChange = (evt: Event) => {
  const place = evt.target
  emit('change', place)
  console.log(evt.target)
}

onMounted(() => {
  initAutocomplete()
})
const modelValue = ref('')
</script>

<template>

     <label
       :for="name"
       class="items-start iq-field row no-wrap q-field--outlined q-input q-field--float q-field--labeled q-field--dense q-field--error"
       >
       <div class='self-stretch q-field__inner relative-position col'>
         <div class='bg-white q-field__control relative-position row no-wrap'>

           <div class='q-field__control-container col relative-position row no-wrap q-anchor--skip'>
             <input
             class='q-field__native q-placeholder'
             :id="name"
             :name='name'
             type='text'
             :value='modelValue'
             @input='event => modelValue = $event.target.value'
             :placeholder='placeholder'
             ref="inputField"
           /><div class='absolute q-field__label no-pointer-events ellipsis'>{{ label }}</div></div>
         </div>
       </div>
     </label
     >
</template>

<style>
.label-class {
  display: flex;
  flex-wrap: nowrap;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.25rem;
}

.outer-wrapper {
  align-self: stretch;
  display: block;
  position: relative;
}

.inner-wrapper {
  display: flex;
  flex-wrap: nowrap;
  height: 40px;
  position: relative;
}

.wrapper {
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  max-width: 100%;
  min-width: 0;
}

.autocomplete-input {
  border: 0px;
  background: white;
  color: rgba(0, 0, 0, 0.87);
  display: block;
  padding-bottom: 2px;
  padding-top: 14px;
  width: 100%;
  outline: none;
}

.outer-label {
  backface-visibility: hidden;
  display: block;
  font-size: 14px;
  position: absolute;
  top: 10px;
  color: rgba(0, 0, 0, 0.54);
  font-weight: 400;
  text-overflow: ellipsis;
  transform: matrix(0.75, 0, 0, 0.75, 0 -6);
  transform-origin: 0 0;
  white-space: nowrap;
}
</style>
