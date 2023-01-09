<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
const showNotification = ref<boolean>(false)
</script>

<template>
  <div class="dark:bg-grey-900 min-h-screen">
    <AppNavigation />
    <ShoppingCart />
    <Notification
      :show="showNotification"
      message1="Your Quote Has been Submitted"
      message2="A copy of the quote has been sent to your email address"
    />
  </div>
</template>
