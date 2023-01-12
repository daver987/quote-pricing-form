<script setup lang="ts">
import { useUserStore } from '~/stores/useUserStore'
import { storeToRefs } from 'pinia'

const supabase = useSupabaseClient()

const userStore = useUserStore()
const { hplUserId } = storeToRefs(userStore)

onMounted(() => {
  async function getUserId() {
    hplUserId.value = localStorage.getItem('hplUserId')
    if (hplUserId.value === null || hplUserId.value === 'hpl_new_user') {
      hplUserId.value = 'hpl_new_user'
      localStorage.setItem('hplUserId', hplUserId.value)
      console.log('hplUserId:', hplUserId.value)
    } else {
      const { data: userData } = await useAsyncData('user', async () => {
        const { data } = await supabase
          .from('user')
          .select('*')
          .eq('id', hplUserId.value)
          .single()
        return data
      })
      if (userData.value) {
        userStore.setUserData(userData.value)
        console.log('userData:', userData.value)
      }
    }
  }
  getUserId()
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
