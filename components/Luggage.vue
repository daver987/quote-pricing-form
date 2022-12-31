<template>
  <BaseCard class="w-full md:max-w-2xl flex justify-center">
    <div class="w-full flex flex-col md:flex-row justify-around max-w-xl">
      <ItemCount :kind="people" :amount="peopleAmount">
        <Icon name="bi:people" class="w-16 h-auto text-gray-400" />
      </ItemCount>
      <ItemCount :kind="luggage" :amount="luggageAmount">
        <Icon
          name="fluent:luggage-28-regular"
          class="w-16 h-auto text-gray-400"
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
