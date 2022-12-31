<script setup lang="ts">
import { servicesHome } from '~/data/servicesHome'
import { features } from '~/data/features'

const fleetImage = 'background-image: url("/images/cadillac-xts-8.jpg")'
</script>

<template>
  <div>
    <div
      class="relative overflow-hidden min-h-screen"
      style="background-image: url('/icons/gradient-background.svg')"
    >
      <AppNavigation />
      <div class="relative">
        <main class="mt-16 sm:mt-24">
          <div class="mx-auto max-w-7xl">
            <div class="lg:grid lg:grid-cols-12 lg:gap-8">
              <div
                class="px-4 sm:px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left"
              >
                <div class="flex flex-col align-center lg:align-start">
                  <h1
                    class="text-center text-white sm:text-4xl text-3xl md:text-5xl font-heading md:text-left"
                  >
                    Experience Toronto's Finest Car Service
                  </h1>
                  <p class="text-center subheading md:text-left">
                    High Park Livery
                  </p>
                  <NuxtImg
                    alt="Lincoln Continental"
                    src="/images/lincoln-continental-1.png"
                    class="object-cover object-center max-w-sm md:max-w-lg self-center md:self-start mt-8"
                  />
                </div>
              </div>
              <div class="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0 px-3">
                <QuoteForm />
              </div>
            </div>
          </div>
        </main>
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
      class="bg-center bg-no-repeat bg-fit pt-10"
      :style="fleetImage"
    >
      <BaseContainer
        class="flex flex-col justify-between place-items-center lg:flex-row"
      >
        <div class="space-y-4">
          <p class="text-center subheading lg:text-left">
            The Many Types of Comfort We offer
          </p>
          <h2 class="text-center heading text-white capitalize lg:text-left">
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
    <BaseSection class="pt-0 px-4 sm:px-6 lg:px-8">
      <BaseContainer
        class="bg-white shadow-xl grid grid-cols-6 md:grid-cols-12 gap-6 -mt-6"
      >
        <div class="col-span-6 p-6 md:col-span-7">
          <p class="font-body text-sm text-body text-gray-400">
            <span class="font-bold font-body text-sm text-brand uppercase"
              >High Park Livery</span
            >
            <span class="text-gray-400">
              puts you or your business at the forefront of Toronto car service.
              For nearly a decade, we have maintained a fleet of new model
              vehicles. We have constantly upgraded to meet the Toronto GTA car
              service market demands. We are ensuring that our clients receive
              only the very best chauffeur service available in Toronto, Canada.
              Our car service includes the safe and reliable Cadillac XTS,
              Lincoln Navigator SUV, Cadillac Escalade SUV, and Lincoln
              Continental. Our thoroughly trained drivers provide the highest
              level of service for even the most discriminating clientele. As a
              full-service transportation company, we have a wide range of
              vehicles available to accommodate any need.
            </span>
          </p>

          <p class="font-body text-sm text-brand font-semibold mt-2">
            Special requests are available for Specialty 6+ person vehicles that
            can take larger tour groups. Contact us to learn about the various
            options available from our limo service.
          </p>
        </div>
        <div class="col-span-2 p-6">
          <NuxtImg class="w-80" src="/icons/24-hours.svg" alt="24 hours icon" />
        </div>
      </BaseContainer>
    </BaseSection>
    <BaseSection>
      <BaseContainer
        class="flex flex-col mx-auto mb-8 max-w-4xl md:flex-none md:mb-4 md:grid md:grid-cols-2 md:grid-rows-1 md:items-stretch lg:max-w-7xl"
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
        class="flex flex-col mx-auto max-w-4xl gap-x-2 items-stretch md:flex-none md:grid md:grid-cols-2 lg:max-w-7xl"
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
      <NuxtImg
        alt="Toronto Skyline"
        class="object-cover object-center lg:mx-auto lg:max-w-6xl"
        src="/images/toronto-3.jpg"
        width="1364"
        height="459"
        format="webp"
        quality="80"
      />
    </BaseSection>
    <BaseSection class="pt-0 px-4 sm:px-6 lg:px-8">
      <BaseContainer class="bg-white pb-16 pt-32 -mt-16">
        <p class="text-center subheading">WHAT High Park Livery OFFERS YOU</p>
        <h2 class="text-center heading mt-4">We Offer</h2>
      </BaseContainer>
      <BaseContainer
        class="bg-white shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-4 @container -mt-8"
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
