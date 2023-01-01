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
          <NuxtLink to="/" class="max-w-[125px] block">
            <NuxtImg
              :alt="companyName"
              :src="companyLogo"
              class="object-contain w-full object-center"
            />
          </NuxtLink>

          <div class="flex flex-row justify-items-center">
            <Icon class="mr-8 text-3xl text-primary" name="zmdi:phone" />
            <a
              :href="`tel:${companyPhone}`"
              class="cursor-pointer text-base tracking-wider text-white font-body hover:text-primary"
              >{{ companyPhone }}
            </a>
          </div>
          <div class="flex flex-row justify-items-center">
            <Icon class="mr-8 text-4xl text-primary" name="ic:outline-mail" />
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
              <NuxtLink
                :to="myNavigation.href"
                active-class="text-brand hover:text-brand-600"
              >
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
          <div class="mx-auto flex flex-row gap-8 justify-center max-w-40">
            <Icon class="text-3xl text-primary" name="zmdi:facebook" />
            <Icon class="text-3xl text-primary" name="zmdi:twitter" />
            <Icon class="text-3xl text-primary" name="zmdi:instagram" />
          </div>
        </div>
      </div>
    </div>
    <SubFooter />
  </footer>
</template>

<script setup lang="ts">
import { navigation, NavigationItem } from '~/data/navigation'

const companyName = 'High Park Livery'
const companyEmail = 'info@highparklivery.com'
const companyPhone = '647.360.9631'
const companyLogo = '/images/hpl-logo-3.png'

const nav = navigation as NavigationItem[]
</script>
