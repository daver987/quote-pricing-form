<script setup lang="ts">
import { useUserStore } from '~/stores/useUserStore'
import { storeToRefs } from 'pinia'
import { Database } from '~/types/supabase'

const supabase = useSupabaseClient<Database>()

const userStore = useUserStore()
const { hplUserId } = storeToRefs(userStore)

async function getUserData() {
  hplUserId.value = localStorage.getItem('hplUserId')
  if (!hplUserId.value) {
    hplUserId.value = 'hpl_new_user'
    localStorage.setItem('hplUserId', hplUserId.value)
  } else {
    const { data: userData } = await useAsyncData('user', async () => {
      return await supabase
        .from('user')
        .select('*')
        .eq('id', hplUserId.value)
        .single()
    })
    console.log('userData:', userData.value?.data)
    console.log('hplUserId:', hplUserId.value)
  }
}

onMounted(async () => {
  setTimeout(async () => {
    await getUserData()
  }, 2000)
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
