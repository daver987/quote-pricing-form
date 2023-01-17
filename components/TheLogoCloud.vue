<template>
  <div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-background">
    <div class="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
      <div class="flex justify-center col-span-1 md:col-span-2 lg:col-span-1">
        <NuxtPicture
          alt="CFIB"
          src="/images/logo-cloud-1.png"
          width="1920"
          height="931"
          :img-attrs="{
            class:
              'object-contain w-full max-w-xs filter grayscale hover:grayscale-0',
          }"
        />
      </div>
      <div class="flex justify-center col-span-1 md:col-span-2 lg:col-span-1">
        <NuxtPicture
          alt="JPL"
          src="/images/logo-cloud-5.png"
          width="400"
          height="152"
          :img-attrs="{
            class:
              'object-contain w-full max-w-xs filter grayscale hover:grayscale-0',
          }"
        />
      </div>
      <div class="flex justify-center col-span-1 md:col-span-2 lg:col-span-1">
        <NuxtPicture
          alt="NLA"
          class="object-contain w-full max-w-xs filter grayscale hover:grayscale-0"
          src="/images/logo-cloud-2.png"
          width="1464"
          height="816"
          :img-attrs="{
            class:
              'object-contain w-full max-w-xs filter grayscale hover:grayscale-0',
          }"
        />
      </div>
      <div class="flex justify-center col-span-1 md:col-span-3 lg:col-span-1">
        <NuxtPicture
          alt="Northbridge"
          src="/images/logo-cloud-3.png"
          width="370"
          height="133"
          :img-attrs="{
            class:
              'object-contain w-full max-w-xs filter grayscale hover:grayscale-0',
          }"
        />
      </div>
      <div
        class="flex justify-center object-center col-span-2 md:col-span-3 lg:col-span-1"
      >
        <NuxtPicture
          alt="OLOA"
          src="/images/logo-cloud-4.png"
          width="2579"
          height="903"
          :img-attrs="{
            class:
              'object-contain w-full max-w-xs filter grayscale hover:grayscale-0',
          }"
        />
      </div>
    </div>
  </div>
</template>
