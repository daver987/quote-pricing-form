<script setup lang="ts">
definePageMeta({
  title: 'Sign In',
  layout: 'auth',
})
</script>

<template>
  <div class="flex min-h-screen dark:bg-grey-900">
    <div
      class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <SigninForm />
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <NuxtImg
        class="absolute inset-0 h-full w-full object-cover"
        src="/images/toronto-6.jpeg"
        alt="Toronto skyline"
      />
    </div>
  </div>
</template>
