<script setup lang="ts">
import { useUserStore } from '~/stores/useUserStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { userId } = storeToRefs(userStore)

onMounted(() => {
  function getUserId() {
    let userId = localStorage.getItem('userId')
    if (!userId) {
      userId = Math.random().toString(36).substring(2, 9)
      localStorage.setItem('userId', userId)
    }
    return userId
  }
  userId.value = getUserId()
  console.log('User id', userId.value)
})

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
