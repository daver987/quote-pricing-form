<template>
  <div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <div>
        <h2 class="text-center md:text-left pt-8 font-heading">
          Lincoln Continental Sedan
        </h2>
      </div>
      <div>
        <NuxtImg
          src="/images/lincoln-continental-1.png"
          alt="Lincoln Continental Sedan"
          width="1011"
          height="506"
          class="h-full object-cover object-center w-full"
          quality="80"
        />
      </div>
    </div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <BaseCard class="space-y-6">
        <h3 class="subheading">About The Vehicle</h3>
        <p>
          The Lincoln Continental is the industry's sleekest, most sophisticated
          limousine available. It features leather seating and fine wood
          accents. Its four chrome-accented headlights are sure to turn heads
          wherever you go. Elegant, luxurious, and spacious. Handles like a
          dream with an amazing ride. This is a perfect choice for a night on
          the town with friends or family. Our Lincoln Continental is designed
          for stylish comfort and spacious luxury. If you are looking for an
          elegant way to travel then our Lincoln Continental is just what you
          need!
        </p>
      </BaseCard>
      <div>
        <NuxtImg
          src="/images/lincoln-continental-2.jpg"
          alt="Lincoln Continental Interior"
          class="h-full object-cover object-center w-full"
          width="828"
          height="591"
          quality="80"
        />
      </div>
    </div>
    <div class="mb-12 grid gap-4 grid-cols-1">
      <div class="col-span-1">
        <img
          src="/images/lincoln-continental-6.jpg"
          alt="Lincoln Continental Interior"
          class="object-cover object-center w-full md:max-w-5xl"
          width="1380"
          height="619"
        />
      </div>
    </div>
    <div class="w-full flex flex-row justify-end">
      <Luggage :peopleAmount="3" :luggageAmount="3" class="md:-mt-48" />
    </div>
  </div>
</template>
