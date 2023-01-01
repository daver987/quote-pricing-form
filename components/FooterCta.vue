<template>
  <div
    class="container relative z-10 mx-auto -mb-28 flex max-w-7xl flex-col px-8 py-10 shadow-xl bg-background-light space-y-4 lg:space-y-0 lg:-mb-12 lg:flex-row lg:justify-between"
  >
    <div class="lg:self-center">
      <h2 class="text-center heading lg:text-4xl">
        interested in our services?
      </h2>
    </div>
    <div class="self-center">
      <BaseButton
        kind="btn-dark"
        label="Reserve Now"
        to="/reservations"
        :nuxtLink="true"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'FooterCta',
}
</script>
