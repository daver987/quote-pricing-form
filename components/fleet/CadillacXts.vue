<template>
  <div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <div><h2 class="text-center pt-8 heading">Cadillac XTS Sedan</h2></div>
      <div>
        <NuxtPicture
          src="/images/cadillac-xts-9.png"
          alt="XTS"
          width="1242"
          height="543"
          quality="80"
        />
      </div>
    </div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <BaseCard class="space-y-6">
        <h3 class="subheading">About The Vehicle</h3>
        <p class="text-gray-500 font-sans">
          If you're looking for a legend to take care of you regardless of
          whether your destination is Toronto or Montreal, the Cadillac XTS is
          it. Its sophisticated and sleek design comes with features that make
          you feel like royalty on wheels—from power seats with memory positions
          to genuine rosewood accents. With an infinite list of amenities
          (including in-car WiFi), there's no guessing what comfort features
          await inside this car for celebrities, business people, or travellers.
        </p>
      </BaseCard>
      <div>
        <NuxtPicture
          src="/images/cadillac-xts-2.jpg"
          alt="XTS"
          class="h-full object-cover object-center w-full"
          width="828"
          height="591"
          quality="80"
        />
      </div>
    </div>
    <div
      class="mb-12 auto-cols-auto grid grid-cols-1 place-items-center md:gap-4 md:grid-cols-12"
    >
      <div class="mb-6 col-span-2 md:mb-0 md:col-span-4">
        <NuxtPicture
          src="/images/cadillac-xts-5.jpg"
          alt="XTS"
          class="h-full object-cover object-center w-full"
          width="536"
          height="619"
          quality="80"
        />
      </div>
      <div class="col-span-6">
        <NuxtPicture
          src="/images/cadillac-xts-7.jpg"
          alt="XTS"
          class="h-full object-cover object-center w-full"
          width="828"
          height="619"
          quality="80"
        />
      </div>
    </div>
    <div class="w-full flex flex-row justify-end">
      <Luggage :peopleAmount="3" :luggageAmount="3" class="md:-mt-48" />
    </div>
  </div>
</template>
