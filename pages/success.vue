<script lang="ts" setup>
//scripts
</script>

<!--success page  -->
<template>
  <div class="min-h-screen bg-secondary">
    <div class="text-black p-6 text-center">
      <h1 class="mb-4 text-4xl text-center text-black font-serif italic">
        Thank You for Booking with <br />
        High Park Livery!
      </h1>
      <div class="bg-black rounded-md inline-block p-16">
        <div
          style="
            border-radius: 200px;
            height: 200px;
            width: 200px;
            background: #f8faf5;
            margin: 0 auto;
          "
        >
          <i class="checkmark">✓</i>
        </div>
        <h2>Success</h2>
        <p class="text-xs leading-8">
          We received your booking request<br />
          You will receive a confirmation shortly!
        </p>
      </div>
      <div class="space-y-2 mt-4">
        <p class="text-xs">
          We look forward to providing you with excellent service.
        </p>
        <p class="text-black text-lg">
          We appreciate your business! If you have any questions, please don't
          hesitate to contact us.<br />
          <span
            >Email:
            <a
              class="underline mr-2 text-primary"
              href="mailto:reservations@highparklivery.com"
              >reservations@highparklivery.com</a
            ></span
          >
          <span
            >Phone:
            <a class="underline" href="tel:6473609631">647.360.9631</a></span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  text-align: center;
  padding: 40px 0;
  background: #ebf0f5;
}

p {
  color: #a57c52;
  font-family: 'Nunito Sans', 'Helvetica Neue', sans-serif;
  font-size: 20px;
  margin: 0;
}

i {
  color: #a57c52;
  font-size: 100px;
  line-height: 200px;
  margin-left: -15px;
}
</style>
