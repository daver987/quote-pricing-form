<template>
  <footer>
    <div class="px-6 lg:px-10">
      <FooterCta />
    </div>
    <div
      class="w-full px-6 pt-24 pb-8 bg-background-dark lg:px-10 lg:pt-16 lg:pb-4"
    >
      <div
        class="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        <div class="my-8 space-y-10">
          <NuxtLink to="/" class="max-w-[200px] block">
            <img
              :alt="companyName"
              :src="companyLogo"
              width="1944"
              height="544"
              class="object-cover object-center"
            />
          </NuxtLink>

          <div class="flex flex-row justify-items-center">
            <div class="mr-8 text-3xl text-primary i-zmdi-phone" />
            <a
              :href="`tel:${companyPhone}`"
              class="cursor-pointer text-base tracking-wider text-white font-body hover:text-primary"
              >{{ companyPhone }}
            </a>
          </div>
          <div class="flex flex-row justify-items-center">
            <div class="mr-8 text-4xl text-primary i-ic-outline-mail" />
            <a
              :href="`mailto:${companyEmail}`"
              class="cursor-pointer text-base tracking-wider text-white font-body hover:text-primary"
              >{{ companyEmail }}
            </a>
          </div>
        </div>
        <div class="my-8 space-y-4">
          <h3
            class="text-xl uppercase tracking-widest font-subheading text-primary"
          >
            Quick Links
          </h3>
          <ul
            class="flex flex-col font-bold uppercase leading-relaxed tracking-wider font-body text-body-light"
          >
            <li v-for="myNavigation in nav" :key="myNavigation.id">
              <NuxtLink :to="myNavigation.href">
                {{ myNavigation.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="my-8 space-y-6 lg:space-y-4">
          <h3
            class="text-xl uppercase tracking-widest font-subheading text-primary"
          >
            Sign Up
          </h3>
          <EmailInput />
          <BaseButton kind="btn-solid" label="Subscribe" />
          <p
            class="text-center text-base uppercase tracking-wider font-body text-body-light"
          >
            Socialize With {{ companyName }}
          </p>
          <div class="mx-auto flex flex-row justify-between max-w-40">
            <div class="text-3xl text-primary i-zmdi-facebook" />
            <div class="text-3xl text-primary i-zmdi-twitter" />
            <div class="text-3xl text-primary i-zmdi-instagram" />
          </div>
        </div>
      </div>
    </div>
    <SubFooter />
  </footer>
</template>

<script setup lang="ts">
defineProps({
  companyName: { type: String, default: 'Luxury Ride Service' },
  companyEmail: { type: String, default: 'info@luxuryrideservice.com' },
  companyPhone: { type: String, default: '289.640.1876' },
  companyLogo: {
    type: String,
    default: '/images/Luxury-Ride-Service-Logo.png',
  },
})
const nav = useNavigation()
</script>
