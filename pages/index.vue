<script setup lang="ts">
import { servicesHome } from '~/data/servicesHome'
import { features } from '~/data/features'
definePageMeta({
  name: 'Home',
  layout: 'default',
})

const fleetImage = 'background-image: url("/images/cadillac-xts-8.jpg")'
</script>

<template>
  <div>
    <div
      class="relative min-h-screen overflow-hidden"
      style="background-image: url('/icons/gradient-background.svg')"
    >
      <AppNavigation />
      <div class="relative">
        <div class="mt-16 sm:mt-24">
          <div class="mx-auto max-w-7xl">
            <div class="lg:grid lg:grid-cols-12 lg:gap-8">
              <div
                class="px-4 sm:px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left"
              >
                <div class="flex flex-col align-center lg:align-start">
                  <h1
                    class="mb-2 text-3xl text-center text-white capitalize sm:text-4xl md:text-5xl font-heading md:text-left"
                  >
                    Experience Toronto's Finest Car Service
                  </h1>
                  <p class="text-center subheading md:text-left">
                    High Park Livery
                  </p>
                  <NuxtPicture
                    :img-attrs="{
                      class:
                        'self-center object-cover object-center max-w-sm mt-8 md:max-w-lg md:self-start',
                    }"
                    alt="Lincoln Continental"
                    src="/images/lincoln-continental-1.png"
                  />
                </div>
              </div>
              <div class="px-3 pb-8 mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BaseSection>
      <BaseContainer
        class="grid grid-cols-1 md:grid-cols-2 lg:max-w-7xl lg:grid-cols-4 gap-3 @container"
      >
        <IconBlockAbout
          v-for="feature in features"
          :key="feature.title"
          :altText="feature.altText"
          :body="feature.body"
          :image="feature.image"
          :title="feature.title"
        />
      </BaseContainer>
    </BaseSection>
    <BaseSection
      class="pt-10 bg-center bg-no-repeat bg-fit"
      :style="fleetImage"
    >
      <BaseContainer
        class="flex flex-col justify-between place-items-center lg:flex-row"
      >
        <div class="space-y-4 mb-4">
          <p class="text-center subheading lg:text-left">
            The Many Types of Comfort We offer
          </p>
          <h2 class="text-center text-white capitalize heading lg:text-left">
            Our Fleet
          </h2>
        </div>
        <div>
          <BaseButton
            kind="btn-light"
            label="View All"
            :nuxtLink="true"
            to="/fleet"
          />
        </div>
      </BaseContainer>
    </BaseSection>
    <BaseSection class="px-4 pt-0 sm:px-6 lg:px-8">
      <BaseContainer
        class="grid grid-cols-6 gap-6 -mt-6 bg-white shadow-xl md:grid-cols-12"
      >
        <div class="col-span-6 p-6 md:col-span-7">
          <p class="text-sm text-gray-400 font-body">
            <span class="text-gray-400">
              Experience luxury and reliability with
              <span class="text-sm font-bold uppercase font-body text-brand"
                >High Park Livery's</span
              >
              Toronto car service. For over a decade, we have consistently
              maintained a fleet of top-of-the-line vehicles to meet the demands
              of the Toronto GTA market. Our clients can expect only the best in
              chauffeur service with our selection of premium cars, including
              the Cadillac XTS, Lincoln Navigator SUV, Cadillac Escalade SUV,
              and Lincoln Continental. <br /><br />Our highly trained drivers
              provide exceptional service for even the most discerning
              clientele. As a full-service transportation company,
              <strong class="text-brand"
                >we have a variety of vehicles to meet any transportation need,
                including specialty 6+ person vehicles for larger tour
                groups.</strong
              >
              Contact us to explore the various options available from our limo
              service.
            </span>
          </p>
        </div>
        <div
          class="col-span-2 p-6 w-full flex justify-center place-items-center"
        >
          <NuxtPicture
            class="w-96 self-center"
            src="/icons/24-hours.svg"
            alt="24 hours icon"
          />
        </div>
      </BaseContainer>
    </BaseSection>
    <BaseSection>
      <BaseContainer
        class="flex flex-col max-w-4xl mx-auto mb-8 md:flex-none md:mb-4 md:grid md:grid-cols-2 md:grid-rows-1 md:items-stretch lg:max-w-7xl"
      >
        <IconBlockFleet
          heading="Cadillac XTS"
          class="order-1 md:order-first md:w-full md:col-span-1 md:col-start-1 md:self-center"
        />
        <IconBlockFleetImage
          altText="XTS Interior"
          image="/images/cadillac-xts-2.jpg"
          class="md:col-span-1 md:col-start-2"
        />
      </BaseContainer>
      <BaseContainer
        class="flex flex-col items-stretch max-w-4xl mx-auto gap-x-2 md:flex-none md:grid md:grid-cols-2 lg:max-w-7xl"
      >
        <IconBlockFleet
          class="order-2 mb-8 w-full md:mb-4 md:max-w-[80%] md:col-span-1 md:col-start-1 md:row-start-2 md:justify-self-end"
          heading="Cadillac Escalade"
        />
        <IconBlockFleetImage
          altText="Escalade Interior"
          class="order-1 md:mb-0 md:col-span-1 md:col-start-1 md:row-start-1 md:row-end-2 md:self-end"
          image="/images/cadillac-escalade-5.jpg"
        />
        <IconBlockFleet
          class="order-4 w-full md:order-first md:max-w-[80%] md:pb-8 md:place-self-end md:justify-self-end"
          heading="Lincoln Continental"
        />
        <IconBlockFleetImage
          altText="Continental Interior"
          class="order-3 md:-mt-8 md:col-start-2 md:row-start-2"
          image="/images/lincoln-continental-3.jpg"
        />
      </BaseContainer>
    </BaseSection>
    <BaseSection class="pb-0">
      <NuxtPicture
        alt="Toronto Skyline"
        :img-attrs="{
          class: 'object-cover object-center lg:mx-auto lg:max-w-6xl',
        }"
        src="/images/toronto-3.jpg"
        width="1364"
        height="459"
        format="webp"
        quality="80"
      />
    </BaseSection>
    <BaseSection class="px-4 pt-0 sm:px-6 lg:px-8">
      <BaseContainer class="pt-32 pb-16 -mt-16 bg-white">
        <p class="text-center subheading">WHAT High Park Livery OFFERS YOU</p>
        <h2 class="mt-4 text-center heading">We Offer</h2>
      </BaseContainer>
      <BaseContainer
        class="bg-white shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-4 @container -mt-8 pb-6"
      >
        <IconBlockAbout
          v-for="service in servicesHome"
          :key="service.title"
          :alt-text="service.altText"
          :body="service.body"
          :image="service.image"
          :title="service.title"
          class="shadow-none"
        />
      </BaseContainer>
    </BaseSection>
    <BaseSection>
      <BaseContainer class="space-y-8">
        <p class="text-center subheading">High Park Livery PARTNERS</p>
        <h2 class="text-center heading">They Trust Us</h2>
      </BaseContainer>
      <TheLogoCloud />
    </BaseSection>
  </div>
</template>
