<template>
  <nav class="grid grid-cols-6 p-5 bg-black mx-auto max-w-6xl">
    <NuxtLink to="https://highparklivery.com" class="max-w-[120px] col-span-3">
      <NuxtImg
        src="/images/hpl-logo-3.png"
        height="568"
        width="960"
        alt="High Park Livery logo"
        class="w-full"
      />
    </NuxtLink>
    <div
      v-show="true"
      class="col-span-3 flex flex-row justify-end items-center"
    >
      <button
        @click="$emit('clicked:booked', true)"
        v-if="show"
        type="button"
        class="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Proceed To Book
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
const show = true

defineEmits(['clicked:booked'])
</script>

<style scoped>
body {
  text-align: center;
  padding: 40px 0;
  background: #ebf0f5;
}

p {
  color: #a57c52;
  font-family: 'Nunito Sans', 'Helvetica Neue', sans-serif;
  font-size: 20px;
  margin: 0;
}

i {
  color: #a57c52;
  font-size: 100px;
  line-height: 200px;
  margin-left: -15px;
}
</style>
