<script setup lang="ts">
//scripts
</script>

<template>
  <div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <div>
        <h2 class="text-center pt-8 font-heading md:text-left">
          Cadillac Escalade<br />SUV
        </h2>
      </div>
      <div>
        <NuxtImg
          src="/images/cadillac-escalade-1.png"
          alt="Cadillac-Escalade"
          class="object-cover object-center w-full"
          width="1084"
          height="720"
          quality="80"
        />
      </div>
    </div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <BaseCard class="space-y-6">
        <h3 class="subheading">About The Vehicle</h3>
        <p>
          The Cadillac Escalade combines luxury, style, and comfort with
          high-tech features. The luxurious features include soft leather
          upholstery, a state-of-the-art entertainment system. The tech upgrades
          make this vehicle a perfect choice for a comfortable ride on your
          night out. The Escalade's powerful engine provides 6.2 litres of V8
          power that can take you to your destination in no time. You'll enjoy
          the comfortable leather seats with piping on the edges as well as
          electronic seat controls. Reserve this vehicle today!
        </p>
      </BaseCard>
      <div>
        <NuxtImg
          src="/images/cadillac-escalade-2.jpg"
          alt="Cadillac-Escalade"
          class="object-cover object-center w-full"
          width="828"
          height="591"
          quality="80"
        />
      </div>
    </div>
    <div class="mb-12 grid gap-4 grid-cols-1">
      <div class="col-span-1">
        <NuxtImg
          src="/images/cadillac-escalade-5.jpg"
          alt="Cadillac-Escalade"
          class="object-cover object-center w-full md:max-w-5xl"
          width="1624"
          height="1048"
        />
      </div>
    </div>
    <div class="w-full flex flex-row justify-end">
      <Luggage :peopleAmount="6" :luggageAmount="6" class="md:-mt-48" />
    </div>
  </div>
</template>
