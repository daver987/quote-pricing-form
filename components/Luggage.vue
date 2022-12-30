<template>
  <BaseCard
    class="flex flex-col w-full md:max-w-3xl md:auto-rows-auto md:grid md:gap-4 md:grid-cols-3"
  >
    <ItemCount :kind="people" :amount="peopleAmount">
      <div class="text-body text-6xl i-bi-people" />
    </ItemCount>
    <ItemCount :kind="luggage" :amount="luggageAmount">
      <div class="text-body text-6xl i-ic-twotone-luggage" />
    </ItemCount>
    <div class="flex flex-col h-full justify-center items-center">
      <BaseButton
        kind="btn-primary"
        label="Reserve"
        to="/reservations"
        :nuxtLink="true"
      />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
defineProps({
  people: {
    type: String,
    default: 'people',
  },
  peopleAmount: {
    type: Number,
    default: 0,
  },
  luggage: {
    type: String,
    default: 'luggage',
  },
  luggageAmount: {
    type: Number,
    default: 0,
  },
})
</script>
