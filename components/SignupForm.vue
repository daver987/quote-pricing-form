<script lang="ts" setup>
const colorMode = useColorMode()
const color = colorMode.value
console.log(color)
</script>

<template>
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <div v-if="color === 'dark'">
      <NuxtLink to="/">
        <NuxtImg
          class="h-16 w-auto"
          src="/images/hpl-logo-3.png"
          alt="Your Company"
        />
      </NuxtLink>
      <h2
        class="mt-6 text-3xl font-bold tracking-tight dark:text-gray-200 text-gray-900"
      >
        Create account
      </h2>
    </div>

    <div v-if="color !== 'dark'">
      <NuxtLink to="/">
        <NuxtImg
          class="h-16 w-auto"
          src="/images/hpl-logo-2.png"
          alt="High Park Livery"
        />
      </NuxtLink>
      <h2
        class="mt-6 text-3xl font-bold tracking-tight dark:text-gray-200 text-gray-900"
      >
        Sign up for an account
      </h2>
    </div>

    <div class="mt-8">
      <div class="mt-6">
        <form action="#" method="POST" class="space-y-6">
          <InputText
            type="text"
            label="First Name"
            placeholder="Enter First Name"
            name="firstName"
          />
          <InputText
            type="text"
            label="Last Name"
            placeholder="Enter Last Name"
            name="lastName"
          />
          <InputText
            type="email"
            label="Email"
            placeholder="Enter Email"
            name="email"
          />
          <InputText
            type="tel"
            label="Phone Number"
            placeholder="Enter Phone Number"
            name="phoneNumber"
          />
          <InputText
            type="password"
            label="Password"
            placeholder="Enter Password"
            name="password"
            autocomplete="new-password"
            required=""
          />
          <InputText
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            name="confirm-password"
            autocomplete="new-password"
            required=""
          />

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand"
              />
              <label
                for="remember-me"
                class="ml-2 block text-sm dark:text-gray-200 text-gray-900"
                >Remember me</label
              >
            </div>

            <div class="text-sm">
              <NuxtLink
                to="/signin"
                class="font-medium text-brand-600 hover:text-brand"
                >Back To Sign In</NuxtLink
              >
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md border border-transparent bg-brand-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
