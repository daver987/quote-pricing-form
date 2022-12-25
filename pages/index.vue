<template>
  <div>
    <BaseSection
      class="min-h-screen bg-center bg-no-repeat bg-cover pt-0"
      style="background-image: url('/icons/gradient-background.svg')"
      ><TheNavbar />
      <BaseContainer class="grid grid-cols-1 md:grid-cols-2 place-items-center">
        <div class="col-span-1 p-0 md:p-2">
          <div class="space-y-2">
            <h1 class="text-5xl text-gray-50 font-heading">
              Experience Luxury Rides & Tours
            </h1>
            <p class="text-brand text-xl uppercase font-medium tracking-wider">
              In Toronto
            </p>
          </div>
          <nuxt-img
            src="/images/lincoln-continental-1.png"
            alt="Lincoln Continental"
            class="max-w-lg"
            format="avif"
            quality="80"
            width="1011"
            height="506"
          />
        </div>
        <div class="col-span-1 p-0">
          <QuasarForm />
        </div>
      </BaseContainer>
    </BaseSection>
    <!--    <BaseSection>-->
    <!--      <BaseContainer>-->
    <!--        <InputDate label="Date Component" placeholder="Pick A Date" />-->
    <!--      </BaseContainer>-->
    <!--    </BaseSection>-->
    <BaseSection class="pt-0">
      <BaseContainer
        class="grid grid-cols-1 md:grid-cols-2 lg:max-w-7xl lg:grid-cols-4 gap-3 @container -mt-8"
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
            to="/fleet/cadillac-xts"
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

          <p class="font-body text-sm text-brand font-semibold">
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
    <section
      aria-labelledby="policies-heading"
      class="mt-24 border-t border-gray-200 bg-gray-50"
    >
      <h2 id="policies-heading" class="sr-only">Our policies</h2>

      <div class="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
        <div
          class="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0"
        >
          <div
            v-for="policy in policies"
            :key="policy.name"
            class="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
          >
            <div class="md:flex-shrink-0">
              <div class="flow-root">
                <img
                  class="-my-1 mx-auto h-24 w-auto"
                  :src="policy.imageSrc"
                  alt=""
                />
              </div>
            </div>
            <div class="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
              <h3 class="text-base font-medium text-gray-900">
                {{ policy.name }}
              </h3>
              <p class="mt-3 text-sm text-gray-500">{{ policy.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <BaseSection class="">
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
      <nuxt-img
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
        <h2 class="text-center heading">We Offer</h2>
      </BaseContainer>
      <BaseContainer
        class="bg-white shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-4 @container -mt-8"
      >
        <IconBlockAbout
          v-for="service in services"
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
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { services } from '~/data/services'
import { features } from '~/data/features'
// import {
//   Dialog,
//   DialogPanel,
//   TransitionChild,
//   TransitionRoot,
// } from '@headlessui/vue'
import { CalendarIcon } from '@heroicons/vue/20/solid'

const open = ref(false)
const toggleCalendar = () => {
  open.value = !open.value
}
const fleetImage = 'background-image: url("/images/cadillac-xts-8.jpg")'
const policies = [
  {
    name: 'All Inclusive Pricing',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg',
    description:
      'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.',
  },
  {
    name: 'Online Booking',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
    description:
      'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.',
  },
  {
    name: 'All year discount',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
    description:
      'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
  },
  {
    name: 'For the planet',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
    description:
      'We’ve pledged 1% of sales to the preservation and restoration of the natural environment.',
  },
]
</script>
