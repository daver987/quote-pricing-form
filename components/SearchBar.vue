<script>
export default {
  name: 'SearchBar',
}
</script>

<template>
  <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
    <form class="flex flex-1" action="#" method="GET">
      <label for="search-field" class="sr-only">Search</label>
      <div class="relative w-full">
        <Icon
          name="heroicons:magnifying-glass"
          class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
          aria-hidden="true"
        />
        <input
          id="search-field"
          class="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
          placeholder="Search..."
          type="search"
          name="search"
        />
      </div>
    </form>
  </div>
</template>
