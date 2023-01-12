<script setup lang="ts">
import { qualities } from '~/data/qualities'
useHead({
  title: 'High Park Livery | About Us',
})
const headerInfo = {
  aboveHeading: 'DISCOVER High Park Livery',
  heading: 'ABOUT US',
  body: "High Park Livery is here to help you get from place to place. It's our job to provide you with the means of transportation, and we won't stop until it's done right.",
  image: 'background-image: url("/images/chauffeur-4.jpg")',
}

const quality = qualities
definePageMeta({
  title: 'About Us',
  layout: 'default',
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
    <section class="bg-background mb-8 px-4 sm:px-6">
      <div class="container mx-auto md:grid md:grid-cols-2">
        <div
          class="bg-white shadow-xl -mt-8 py-6 z-10 relative overflow-hidden md:-mt-16"
        >
          <div class="py-5">
            <p class="text-center subheading">Behind The Wheel</p>
            <h2 class="mt-6 text-center heading">The Driver</h2>
          </div>
          <div class="py-5 px-4 sm:p-6">
            <p>
              Our team of chauffeurs is some of the most experienced in the
              industry. All of our professional chauffeurs are safe, courteous,
              and fully certified drivers by the city of Toronto. We ensure that
              our clients arrive at their destination on time and always provide
              a safe and comfortable ride.<br />Your chauffeur is just a phone
              call away! Luxury Ride Service will get you to your destination on
              time and in style. When you require something exceptional, don't
              hesitate to contact us or get an online quote for rates and
              availability.
            </p>
          </div>
          <div class="flex py-4 px-4 justify-center sm:px-6">
            <BaseButton
              kind="btn-primary"
              class="self-center"
              label="Reserve Now"
              to="/reservations"
              :nuxtLink="true"
            />
          </div>
        </div>
        <div class="md:self-center">
          <NuxtImg
            alt="Chauffeur Service"
            class="object-center object-cover h-64 w-full md:object-left md:min-h-[18rem]"
            src="/images/chauffeur-3.jpg"
            width="919"
            height="429"
            quality="80"
          />
        </div>
      </div>
    </section>
    <section class="bg-background mb-8 px-4 sm:px-6">
      <div class="container place-items-center md:grid md:grid-cols-2">
        <div class="flex">
          <NuxtImg
            alt="Tesla-S-Back-Seat"
            class="object-center object-cover w-full min-h-[18rem] self-center md:object-left"
            src="/images/tesla-s-4.jpg"
            width="814"
            height="973"
            quality="80"
          />
        </div>
        <div class="bg-white shadow-xl">
          <IconBlockServices
            v-for="qualities in quality"
            :key="qualities.title"
            :altText="qualities.altText"
            :body="qualities.body"
            :image="qualities.image"
            :title="qualities.title"
          />
        </div>
      </div>
    </section>
    <section class="mb-8 background-bg">
      <div>
        <NuxtImg
          alt="Toronto-evening-skyline"
          class="object-cover object-center w-full min-h-[16rem]"
          src="/images/toronto-6.jpeg"
          width="6000"
          height="1890"
          quality="50"
        />
      </div>
      <div class="px-6">
        <div
          class="container bg-white mx-auto shadow-xl max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div class="bg-white py-6 overflow-hidden md:px-2 lg:px-4">
            <div class="py-5 px-4 sm:px-6">
              <p class="text-center uppercase subheading md:text-left">
                High Park Livery?
              </p>
              <h2 class="mt-6 text-center text-heading heading md:text-left">
                WHO WE ARE
              </h2>
            </div>
            <div class="py-4 px-3 sm:p-6">
              <p>
                High Park Livery is a Toronto-based car service company. We
                provide luxury transportation to clients in the Greater Toronto
                and southern Ontario area. In addition to offering a variety of
                car models and levels of service. Luxury Ride Service caters to
                corporate and non-corporate clients with highly personalized
                services that aim to exceed all expectations.
              </p>
              <p>
                When you choose to work with Luxury Ride Service, you'll work
                with highly trained professionals who know about the industry.
                We are committed to customer satisfaction and punctuality in all
                that we do. We offer suggestions on routes as well as excellent
                amenities like refreshments and WiFi while en route. We aim to
                create an atmosphere that ensures passengers feel comfortable
                and relaxed throughout their journey.
              </p>
              <p>
                At High Park Livery, we don't cut corners or skimp on your
                comfort to offer you a low price. We believe that all of our
                luxury cars should be maintained to the highest industry
                standards, ensuring a safe and unforgettable experience.
              </p>
              <p>
                Whether it's a night out on the town or a business meeting
                across downtown Toronto, High Park Livery can provide a
                luxurious ride that fits perfectly within your schedule and
                budget.
              </p>
            </div>
            <div class="py-4 px-4 sm:px-6">
              <BaseButton
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
  </div>
</template>
