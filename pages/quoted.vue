<script setup lang="ts">
definePageMeta({
  layout: 'store',
  name: 'Quoted',
})
const route = useRoute()
const notification = ref<boolean>(false)
const addToCartState = useAddToCart()
const showNotification = () => {
  if (route.fullPath === '/quoted' && addToCartState.value === false) {
    setTimeout(() => {
      notification.value = true
    }, 1000)
    setTimeout(() => {
      notification.value = false
    }, 7000)
  }
}
showNotification()
</script>

<template>
  <div class="min-h-screen dark:bg-grey-900">
    <AppNavigation />
    <ShoppingCart />
    <Notification
      :show="notification"
      message1="Your Quote Has been Submitted"
      message2="A copy of the quote has been sent to your email address"
    />
  </div>
</template>
