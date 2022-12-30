<script setup lang="ts">
import { ourServices, Service } from '~/data/services'
import { ourTours, Tour } from '~/data/tours'
definePageMeta({
  title: 'Services',
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
useHead({
  title: 'High Park Livery | Services',
})
const services = ourServices as Service[]
const tours = ourTours as Tour[]
const headerInfo = {
  aboveHeading: 'WHAT WE OFFER YOU',
  heading: 'OUR SERVICES',
  image: 'background-image: url("/images/toronto-5.jpg")',
  body: "High Park Livery is here to help you get from place to place. It's our job to provide you with the means of transportation, and we won't stop until it's done right.",
}
</script>

<template>
  <div>
    <AppHeader
      :aboveHeading="headerInfo.aboveHeading"
      :body="headerInfo.body"
      :heading="headerInfo.heading"
      :image="headerInfo.image"
    />
    <section class="mt-6 md:mb-20 px-6">
      <div class="container mx-auto max-w-7xl bg-white shadow-xl">
        <div
          class="bg-white mx-auto -mt-8 py-6 z-20 relative overflow-hidden md:-mt-20 md:px-2 grid lg:px-4 md:grid-cols-2 grid-cols-1"
        >
          <div class="p-4 col-span-1">
            <h2 class="text-center mb-4 subheading lg:text-left">
              CHECK OUT OUR SERVICES
            </h2>
            <p class="max-w-[65ch]">
              Luxury Ride Service puts you or your business at the forefront of
              Toronto car service. For nearly a decade, we have maintained a
              fleet of new model vehicles. We have constantly upgraded to meet
              the Toronto GTA car service market demands. ensuring that our
              clients receive only the very best chauffeur service available in
              Toronto. Our car service includes the safe and reliable Cadillac
              XTS, Lincoln Navigator, Cadillac Escalade, and Lincoln
              Continental. Our drivers are thoroughly trained to provide the
              highest level of service for even the most discriminating
              clientele. As a full-service transportation company, we have a
              wide range of vehicles available to accommodate any need.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="mb-8 mt-12 md:mt-0 px-6">
      <div class="container mx-auto max-w-7xl md:grid md:gap-4 md:grid-cols-2">
        <div
          :class="service.boxPosition"
          v-for="service in services"
          :key="service.title"
        >
          <div :class="service.imagePosition">
            <img
              :alt="service.altText"
              :src="service.image"
              class="object-cover object-center"
            />
          </div>
          <div :class="service.infoPosition" class="flex">
            <div
              :class="service.infoBoxPosition"
              class="space-y-4 py-7 px-5 md:py-12 md:px-10"
            >
              <h2 class="subheading">{{ service.aboveHeading }}</h2>
              <h2 class="mt-4 text-4xl heading">{{ service.title }}</h2>
              <p class="mt-2 text-body text-sm mb-8">{{ service.body }}</p>
              <BaseButton
                class="mt-4"
                kind="btn-primary"
                label="Contact Us"
                to="/contact"
                :nuxtLink="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-background mb-8">
      <div
        class="bg-center bg-no-repeat bg-cover py-8 px-6 z-10 relative sm:px-8 md:py-16 lg:py-20"
        style="background-image: url('/images/niagara-falls-1.jpg')"
      >
        <h2 class="text-center subheading">High Park Livery Tours</h2>
        <h2 class="mt-2 text-center text-heading-light text-4xl heading">
          Tour Services Available
        </h2>
      </div>
      <div class="bg-background px-6">
        <div
          class="bg-white mx-auto shadow-xl -mt-6 max-w-4xl grid pt-4 z-20 grid-cols-1 relative place-items-center md:-mt-12 md:px-6 md:pb-4 lg:max-w-7xl lg:grid-cols-2"
        >
          <IconBlockServices
            v-for="tour in tours"
            :key="tour.title"
            :alt-text="tour.altText"
            :body="tour.body"
            :image="tour.image"
            :title="tour.title"
          />
        </div>
      </div>
    </section>
  </div>
</template>
