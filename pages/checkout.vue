<script lang="ts" setup>
import { Query } from '~/types/query'
import { ReturnType } from '~/types/returnType'

definePageMeta({
  title: 'Checkout',
  layout: 'store',
})

const route = useRoute().query as unknown as Query
console.log(route)
const subtotal = parseFloat(route.amount)

const createSession = async () => {
  const { data } = await useFetch(`/api/create-checkout-session`, {
    query: route,
  })
  console.log(data)
  const { statusCode, url, customer } = data.value as ReturnType
  console.log(statusCode, url, customer)
  await navigateTo(url, {
    redirectCode: 303,
    external: true,
  })
  return {
    url,
    customer,
  }
}
</script>

<template>
  <div class="dark:bg-grey-900">
    <ShoppingCart :is-it-quote="false" />
    <BaseContainer>
      <TosTable />
    </BaseContainer>
  </div>
</template>
