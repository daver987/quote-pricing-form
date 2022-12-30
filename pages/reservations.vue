<script setup lang="ts">
useHead({
  title: 'Luxury Ride Service | Reservations',
  script: [
    {
      src: 'https://book.mylimobiz.com/v4/luxridesvc/widget/reservation',
      type: 'text/javascript',
    },
  ],
})
const headerInfo = {
  aboveHeading: 'GET IN TOUCH',
  heading: 'BOOK TODAY',
  body: "Your chauffeur is just a phone call away! Don't hesitate to contact us or get an online quote for rates and availability.",
  image: 'background-image: url("/images/Waiting-For-Car-Service.jpg");',
}
definePageMeta({
  title: 'Reservations',
  layout: 'default',
  pageTransition: {
    appear: true,
    enterFromClass: 'opacity-0',
    enterActiveClass: 'duration-[500ms]',
    leaveToClass: 'opacity-0',
    leaveActiveClass: 'duration-[500ms]',
    mode: 'out-in',
  },
})
</script>

<template>
  <div>
    <AppHeader
      :aboveHeading="headerInfo.aboveHeading"
      :body="headerInfo.body"
      :heading="headerInfo.heading"
      :image="headerInfo.image"
    />
    <section class="px-6">
      <div
        class="container mx-auto h-[125vh] -mt-16 mb-16 w-full max-w-7xl z-20 relative md:-mt-20"
      >
        <NuxtLink
          href="https://book.mylimobiz.com/v4/luxridesvc"
          data-ores-widget="website"
          data-ores-alias="luxridesvc"
          >Online Reservations
        </NuxtLink>
        <!--        <Script-->
        <!--          type="text/javascript"-->
        <!--          src="https://book.mylimobiz.com/v4/widgets/widget-loader.js"-->
        <!--        ></Script>-->
        <!--        <iframe-->
        <!--          src="https://book.mylimobiz.com/v4/luxridesvc"-->
        <!--          class="h-[130vh] shadow-xl w-full md:h-[120vh]"-->
        <!--        />-->
      </div>
    </section>
  </div>
</template>
