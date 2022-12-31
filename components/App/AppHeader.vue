<script setup lang="ts">
defineProps({
  aboveHeading: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  companyPhone: {
    type: String,
    required: false,
    default: '647.360.9631',
  },
  companyEmail: {
    type: String,
    required: false,
    default: 'info@highparklivery.com',
  },
})
</script>

<template>
  <header
    class="relative overflow-hidden min-h-screen"
    style="background-image: url('/icons/gradient-background.svg')"
  >
    <AppNavigation />
    <BaseContainer
      class="relative grid grid-cols-1 md:grid-cols-2 h-full mt-20"
    >
      <div
        :style="image"
        class="relative bg-black md:col-span-2 py-32 md:px-10 bg-opacity-60 bg-cover bg-center bg-no-repeat bg-blend-darken"
      >
        <div class="space-y-4 text-center md:text-left">
          <p
            class="text-center font-subheading text-sm tracking-widest text-brand md:text-left"
          >
            {{ aboveHeading }}
          </p>
          <h1
            class="text-center leading-tight text-white font-heading md:text-left"
          >
            {{ heading }}
          </h1>
          <p class="max-w-xs mx-auto md:m-0 md:text-left">
            {{ body }}
          </p>
          <div
            class="tracking-wide md:transform md:-rotate-90 md:absolute md:-left-20 bottom-1/2"
          >
            <a
              :href="`tel:${companyPhone}`"
              class="text-center text-sm font-body text-gray-300"
              ><span class="text-brand md:text-white">CALL :</span>
              {{ companyPhone }}</a
            >
          </div>
          <div
            class="my-1 md:transform md:rotate-90 md:absolute md:-right-36 bottom-1/2"
          >
            <a
              :href="`mailto:${companyEmail}`"
              class="text-center text-sm uppercase tracking-wide font-body text-gray-300"
              ><span class="text-brand md:text-white">EMAIL :</span>
              {{ companyEmail }}
            </a>
          </div>
        </div>
      </div>
    </BaseContainer>
  </header>
</template>
