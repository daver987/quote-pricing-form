<script lang="ts" setup>
useHead({
  title: 'Cancel',
  meta: [
    {
      name: 'description',
      content: 'Cancel page',
    },
  ],
})
</script>

<template>
  <section class="min-h-screen bg-primary">
    <AppNavigation />
    <div class="p-6 text-center">
      <p class="text-3xl font-bold mb-4">
        Forgot to add something? Shop around then come back to pay!
      </p>
      <p class="font-bold mb-6">
        Don't forget to check out our current promotions:
      </p>
      <div class="grid md:grid-cols-2 gap-4 place-items-center">
        <div>Book early and get a complimentary vehicle upgrade!!</div>
        <div>Book a round trip and get an extra 10% OFF!</div>
      </div>
    </div>
    <div class="p-12 flex flex-row justify-center items-center">
      <NuxtLink
        class="bg-black px-12 py-4 rounded-md text-white"
        to="https://highparklivery.com"
        >HOME</NuxtLink
      >
    </div>
  </section>
</template>

<style scoped></style>
