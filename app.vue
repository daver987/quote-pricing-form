<script setup lang="ts">
const userCookie = useCookie('hpl_user')
userCookie.value = 'New User'
console.log('user cookie', userCookie.value)
// import { UAParser } from 'ua-parser-js'
//
// const parser = ref(new UAParser())
// console.log(parser.value, parser.value.getResult())
//npx supabase gen types typescript --project-id ssnrhskkuvkhgliiywdw --schema public > types/supabase.ts
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
