<template>
  <div :class="grid">
    <div
      class="bg-white flex flex-col space-y-6 shadow-xl py-12 px-8 md:px-4 lg:px-8"
    >
      <p class="text-center subheading md:text-left">luxury vehicle</p>
      <h2 class="text-center heading md:text-left">
        {{ heading }}
      </h2>
      <div class="max-w-lg">
        <BaseButton
          kind="btn-flat"
          label="View More"
          to="/fleet"
          :nuxtLink="true"
        >
          <Icon
            name="ic:twotone-arrow-right-alt"
            class="text-brand h-12 w-auto"
          />
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  heading: {
    type: String,
    required: true,
  },
  grid: {
    type: String,
    required: false,
  },
})
</script>
