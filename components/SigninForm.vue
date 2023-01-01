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
        Sign in to your account
      </h2>
      <p class="mt-2 text-sm font-sans dark:text-gray-200 text-gray-600">
        Or
        {{ ' ' }}
        <NuxtLink
          to="/signup"
          class="font-medium text-brand-600 hover:text-brand"
          >Create Account</NuxtLink
        >
      </p>
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
        Sign in to your account
      </h2>
      <p class="mt-2 text-sm font-sans dark:text-gray-200 text-gray-600">
        Or
        {{ ' ' }}
        <NuxtLink
          to="/signup"
          class="font-medium text-brand-600 hover:text-brand"
          >Create Account</NuxtLink
        >
      </p>
    </div>

    <div class="mt-8">
      <div class="mt-6">
        <form action="#" method="POST" class="space-y-6">
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >Email address</label
            >
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required=""
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-brand focus:outline-none focus:ring-brand sm:text-sm"
              />
            </div>
          </div>

          <div class="space-y-1">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >Password</label
            >
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required=""
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-brand focus:outline-none focus:ring-brand sm:text-sm"
              />
            </div>
          </div>

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
                to="#"
                class="font-medium text-brand-600 hover:text-brand"
                >Forgot your password?</NuxtLink
              >
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md border border-transparent bg-brand-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
