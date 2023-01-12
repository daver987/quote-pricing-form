<template>
  <div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <div><h2 class="md:text-left text-center pt-8 heading">Tesla S</h2></div>
      <div>
        <img
          src="/images/tesla-s-1.png"
          alt="Tesla S"
          class="object-cover object-center w-full"
          width="1083"
          height="555"
        />
      </div>
    </div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <BaseCard class="space-y-6">
        <h3 class="subheading">About The Vehicle</h3>
        <p>
          The Tesla Model S luxury electric car is a fantastic choice for riders
          wanting an environmentally conscious and luxurious ride. The Tesla
          Model S has become the standard in eco-friendly limousines. The Model
          S is fast, quiet and comfortable, giving it a significant advantage
          over its competition. With no engine or transmission to worry about,
          this ultimate green machine requires little maintenance to continue
          providing its eco-friendly service for years to come.
        </p>
      </BaseCard>
      <div>
        <NuxtImg
          src="/images/tesla-s-3.jpg"
          alt="Tesla S"
          class="object-cover object-center w-full"
          width="828"
          height="591"
        />
      </div>
    </div>
    <div class="mb-12 grid gap-4 grid-cols-1">
      <div class="col-span-1">
        <NuxtImg
          src="/images/tesla-s-2.jpg"
          alt="Tesla S"
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
