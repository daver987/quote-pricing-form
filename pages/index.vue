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
        <!--        <Popover>-->
        <!--          <nav-->
        <!--            class="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6"-->
        <!--            aria-label="Global"-->
        <!--          >-->
        <!--            <div class="flex flex-1 items-center">-->
        <!--              <div class="flex w-full items-center justify-between md:w-auto">-->
        <!--                <NuxtLink to="/">-->
        <!--                  <span class="sr-only">High Park Livery</span>-->
        <!--                  <img-->
        <!--                    class="h-12 w-auto sm:h-14"-->
        <!--                    src="/images/hpl-logo-3.png"-->
        <!--                    alt="High Park Livery Logo"-->
        <!--                  />-->
        <!--                </NuxtLink>-->
        <!--                <div class="-mr-2 flex items-center md:hidden">-->
        <!--                  <PopoverButton-->
        <!--                    class="focus-ring-inset inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-white"-->
        <!--                  >-->
        <!--                    <span class="sr-only">Open main menu</span>-->
        <!--                    <Bars3Icon class="h-8 w-8" aria-hidden="true" />-->
        <!--                  </PopoverButton>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--              <div class="hidden space-x-10 md:ml-10 md:flex">-->
        <!--                <NuxtLink-->
        <!--                  v-for="item in navigation"-->
        <!--                  :key="item.name"-->
        <!--                  :href="item.href"-->
        <!--                  class="font-base uppercase text-white hover:text-gray-300"-->
        <!--                  >{{ item.name }}-->
        <!--                </NuxtLink>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--            <div class="hidden md:flex">-->
        <!--              <NuxtLink-->
        <!--                to="/"-->
        <!--                class="inline-flex items-center rounded border border-transparent uppercase bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"-->
        <!--                >Log in-->
        <!--              </NuxtLink>-->
        <!--            </div>-->
        <!--          </nav>-->

        <!--          <transition-->
        <!--            enter-active-class="duration-150 ease-out"-->
        <!--            enter-from-class="opacity-0 scale-95"-->
        <!--            enter-to-class="opacity-100 scale-100"-->
        <!--            leave-active-class="duration-100 ease-in"-->
        <!--            leave-from-class="opacity-100 scale-100"-->
        <!--            leave-to-class="opacity-0 scale-95"-->
        <!--          >-->
        <!--            <PopoverPanel-->
        <!--              focus-->
        <!--              class="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"-->
        <!--            >-->
        <!--              <div-->
        <!--                class="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5"-->
        <!--              >-->
        <!--                <div class="flex items-center justify-between px-5 pt-4">-->
        <!--                  <div>-->
        <!--                    <img-->
        <!--                      class="h-12 w-auto"-->
        <!--                      src="/images/hpl-logo-2.png"-->
        <!--                      alt="High Park Livery Logo"-->
        <!--                    />-->
        <!--                  </div>-->
        <!--                  <div class="-mr-2">-->
        <!--                    <PopoverButton-->
        <!--                      class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-base"-->
        <!--                    >-->
        <!--                      <span class="sr-only">Close menu</span>-->
        <!--                      <XMarkIcon class="h-6 w-6" aria-hidden="true" />-->
        <!--                    </PopoverButton>-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--                <div class="space-y-1 px-2 pt-2 pb-3">-->
        <!--                  <NuxtLink-->
        <!--                    v-for="item in navigation"-->
        <!--                    :key="item.name"-->
        <!--                    :to="item.href"-->
        <!--                    class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"-->
        <!--                    >{{ item.name }}-->
        <!--                  </NuxtLink>-->
        <!--                </div>-->
        <!--                <NuxtLink-->
        <!--                  to="/"-->
        <!--                  class="block w-full bg-gray-50 px-5 py-3 text-center font-medium text-base-600 hover:bg-gray-100"-->
        <!--                  >Log in-->
        <!--                </NuxtLink>-->
        <!--              </div>-->
        <!--            </PopoverPanel>-->
        <!--          </transition>-->
        <!--        </Popover>-->

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
                  <img
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
          <nuxt-img
            class="w-80"
            src="/icons/24-hours.svg"
            alt="24 hours icon"
          />
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
        format="avif"
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
