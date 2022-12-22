<template>
  <BaseSection
    class="min-h-screen bg-center bg-no-repeat bg-cover pt-8"
    style="background-image: url('/icons/gradient-background.svg')"
  >
    <TheNavbar />
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="col-span-1 items-center"></div>
      <div class="col-span-1">
        <ClientOnly>
          <QuasarForm />
        </ClientOnly>
      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
//scripts
</script>
