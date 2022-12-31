<script setup lang="ts">
//scripts
</script>

<template>
  <div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <div>
        <h2 class="md:text-left text-center pt-8 heading">
          Lincoln Navigator SUV
        </h2>
      </div>
      <div>
        <NuxtImg
          src="/images/lincoln-navigator-6.png"
          alt="Lincoln Navigator"
          class="object-cover object-center w-full"
          width="1048"
          height="696"
        />
      </div>
    </div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <BaseCard class="space-y-6">
        <h3 class="subheading">About The Vehicle</h3>
        <p>
          The Lincoln Navigator is one of the best vehicles to use for your
          night on the town. It comfortably fits six people, has plenty of
          amenities, and delivers luxury. The three-tonne colossus can easily
          fit through most Toronto streets while being sure to arrive in style
          with its surround sound stereo system, leather seats, seat warmers and
          more. With so many features that come standard you can't go wrong
          using this vehicle for your big night out.
        </p>
      </BaseCard>
      <div>
        <NuxtImg
          src="/images/lincoln-navigator-5.jpg"
          alt="Lincoln Navigator"
          class="object-cover object-center w-full"
          width="828"
          height="591"
        />
      </div>
    </div>
    <div
      class="mb-12 auto-cols-auto grid grid-cols-1 place-items-center md:gap-4 md:grid-cols-12"
    >
      <div class="mb-6 col-span-1 md:mb-0 md:col-span-4">
        <NuxtImg
          src="/images/lincoln-navigator-3.jpg"
          alt="Lincoln Navigator"
          class="h-full object-cover object-center w-full"
          width="536"
          height="619"
        />
      </div>
      <div class="col-span-6">
        <NuxtImg
          src="/images/lincoln-navigator-2.jpg"
          alt="Lincoln Navigator"
          class="h-full object-cover object-center w-full"
          width="828"
          height="619"
        />
      </div>
    </div>
    <div class="w-full flex flex-row justify-end">
      <Luggage :peopleAmount="6" :luggageAmount="6" class="md:-mt-48" />
    </div>
  </div>
</template>
