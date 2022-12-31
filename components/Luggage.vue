<template>
  <BaseCard
    class="flex flex-col w-full md:max-w-3xl md:auto-rows-auto md:grid md:gap-4 md:grid-cols-3"
  >
    <ItemCount :kind="people" :amount="peopleAmount">
      <Icon name="bi:people" class="w-16 h-auto text-gray-500" />
    </ItemCount>
    <ItemCount :kind="luggage" :amount="luggageAmount">
      <Icon
        name="fluent:luggage-28-regular"
        class="w-16 h-auto text-gray-500"
      />
    </ItemCount>
    <div class="flex flex-col h-full justify-center items-center">
      <BaseButton
        kind="btn-brand"
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
