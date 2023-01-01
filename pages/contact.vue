<script setup lang="ts">
useHead({
  title: 'High Park Livery | Contact Us',
})

const headerInfo = {
  aboveHeading: 'GET IN TOUCH',
  heading: 'CONTACT US',
  body: "Your chauffeur is just a phone call away! Don't hesitate to contact us or get an online quote for rates and availability.",
  image: 'background-image: url("/images/toronto-2.jpg")',
}

definePageMeta({
  title: 'Contact Us',
  layout: 'default',
  // pageTransition: {
  //   appear: true,
  //   enterFromClass: 'opacity-0',
  //   enterActiveClass: 'duration-[500ms]',
  //   leaveToClass: 'opacity-0',
  //   leaveActiveClass: 'duration-[500ms]',
  //   mode: 'out-in',
  // },
})

// const formClasses = {
//   outer: 'mb-2',
//   label: 'block text-sm font-body text-body sm:mt-px sm:pt-2',
//   inner: 'max-w-lg flex rounded-md shadow-sm',
//   input:
//     'flex-1 block w-full focus:ring-primary focus:border focus:border-primary min-w-0 rounded-none sm:text-sm border border-body p-2',
//   help: 'text-body',
//   message: 'text-red-600',
// }
// const phoneNumber = ref('')
// const results = ref('')
</script>

<template>
  <div>
    <AppHeader
      :aboveHeading="headerInfo.aboveHeading"
      :body="headerInfo.body"
      :heading="headerInfo.heading"
      :image="headerInfo.image"
    />
    <section class="bg-background -mt-8 px-6 pb-12 md:-mt-16 md:pb-16">
      <div class="container bg-white mx-auto shadow-xl z-10 relative">
        <div
          class="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12"
          id="contact_form_outer"
        >
          <h3 class="mb-4 subheading">Tell Us Something</h3>
          <ContactForm />
        </div>
      </div>
    </section>
    <section class="bg-background mt-16 px-6">
      <div
        class="container bg-white mx-auto space-y-10 shadow-xl mb-16 py-20 px-12"
      >
        <h3 class="text-center subheading">OR REACH US</h3>
        <h2 class="text-center heading">CONTACT INFORMATION</h2>
        <div
          class="flex flex-col justify-center items-center md:grid md:grid-cols-12 md:place-items-center"
        >
          <div
            class="mb-12 md:mb-0 md:col-span-5 md:col-start-2 md:row-start-1"
          >
            <a
              href="mailto:info@highparklivery.com"
              class="text-heading text-lg tracking-wide"
            >
              <div class="mx-auto text-body mb-8 text-9xl i-carbon-email" />
              info@highparklivery.com</a
            >
          </div>
          <div class="col-span-4 col-start-7 row-start-1">
            <a href="tel:6473609631" class="text-lg tracking-wide text-heading">
              <div
                class="mx-auto text-center text-body mb-6 text-9xl i-carbon-phone"
              />
              647.360.9631</a
            >
          </div>
        </div>
      </div>
    </section>
    <ContactAlert />
  </div>
</template>
