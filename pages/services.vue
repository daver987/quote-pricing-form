<script setup lang="ts">
import { services, Service } from '~/data/services'
import { ourTours, Tour } from '~/data/tours'
definePageMeta({
  title: 'Services',
  layout: 'default',

})
useHead({
  title: 'High Park Livery | Services',
})
const service1 = services as Service[]
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
    <section class="px-6 mt-6 md:mb-20">
      <div class="container mx-auto bg-white shadow-xl max-w-7xl">
        <div
          class="relative z-20 grid grid-cols-1 py-6 mx-auto -mt-8 overflow-hidden bg-white md:-mt-20 md:px-2 lg:px-4 md:grid-cols-2"
        >
          <div class="col-span-1 p-4">
            <h2 class="mb-4 text-center subheading lg:text-left">
              CHECK OUT OUR SERVICES
            </h2>
            <p class="max-w-[65ch]">
              High Park Livery puts you or your business at the forefront of
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
    <section class="px-6 mt-12 mb-8 md:mt-0">
      <div class="container mx-auto max-w-7xl md:grid md:gap-4 md:grid-cols-2">
        <div
          :class="service.boxPosition"
          v-for="service in service1"
          :key="service.title"
        >
          <div :class="service.imagePosition">
            <NuxtImg
              :alt="service.altText"
              :src="service.image"
              class="object-cover object-center"
            />
          </div>
          <div :class="service.infoPosition" class="flex">
            <div
              :class="service.infoBoxPosition"
              class="px-5 space-y-4 py-7 md:py-12 md:px-10"
            >
              <h2 class="subheading">{{ service.aboveHeading }}</h2>
              <h2 class="mt-4 text-4xl heading">{{ service.title }}</h2>
              <p class="mb-8">{{ service.body }}</p>
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
    <section class="mb-8">
      <div
        class="relative z-10 px-6 py-8 bg-center bg-no-repeat bg-cover sm:px-8 md:py-16 lg:py-20"
        style="background-image: url('/images/niagara-falls-1.jpg')"
      >
        <h2 class="text-center subheading">High Park Livery Tours</h2>
        <h2 class="mt-2 text-4xl text-center text-heading-light heading">
          Tour Services Available
        </h2>
      </div>
      <div class="px-6 bg-background">
        <div
          class="relative z-20 grid max-w-4xl grid-cols-1 pt-4 mx-auto -mt-6 bg-white shadow-xl place-items-center md:-mt-12 md:px-6 md:pb-4 lg:max-w-7xl lg:grid-cols-2"
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
