<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="overflow-hidden bg-white">
    <div class="px-4 py-5 sm:p-6">
      <div class="sm:flex">
        <div class="flex-shrink-0 mb-4 sm:mr-4 sm:mb-0">
          <NuxtImg
            :alt="altText"
            :src="`icons/${image}.svg`"
            width="5rem"
            class="w-20"
          />
        </div>
        <div>
          <h3
            class="text-base tracking-widest uppercase subheading text-primary"
          >
            {{ title }}
          </h3>
          <p>
            {{ body }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
