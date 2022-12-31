<template>
  <div class="bg-white overflow-hidden">
    <div class="py-5 px-4 sm:p-6">
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
            class="subheading text-base text-primary tracking-widest uppercase"
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

<script setup>
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
