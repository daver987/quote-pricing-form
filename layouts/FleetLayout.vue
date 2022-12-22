<script setup lang="ts">
const tabs = useFleetTabs()
const headerInfo = {
  aboveHeading: 'Discover Our Luxury Vehicles',
  heading: 'OUR FLEET',
  body: "Luxury Ride Service is here to help you get from place to place. It's our job to provide you with the means of transportation, and we won't stop until it's done right.",
  image: 'background-image: url("/images/City-View-Navigator-Interior.jpg")',
}
</script>

<template>
  <div class="bg-background">
    <TheNavbar />
    <TheHeader
      :aboveHeading="headerInfo.aboveHeading"
      :body="headerInfo.body"
      :heading="headerInfo.heading"
      :image="headerInfo.image"
    />
    <main class="container bg-background mx-auto px-6 -mt-20 md:px-0">
      <div
        class="mx-auto mb-12 grid z-10 gap-1 grid-cols-2 relative md:grid-cols-3 lg:grid-cols-6"
      >
        <template v-for="tab in tabs" :key="tab.id">
          <NuxtLink
            :to="tab.to"
            class="bg-white flex flex-col space-y-4 text-black w-full py-16 col-span-1 items-center justify-center hover:bg-primary"
          >
            <img :src="`/icons/${tab.icon}.svg`" alt="icon" class="w-16" />
            <span
              class="text-sm text-center text-body tracking-widest uppercase"
            >
              {{ tab.title }}
            </span>
          </NuxtLink>
        </template>
      </div>
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>
.router-link-active {
  background-color: #A57C52;
}
.router-link-active span {
  color: #fff;
}
.router-link-active span:hover {
  color: #fff;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
