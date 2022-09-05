<script setup lang="ts">
import { UAParser } from 'ua-parser-js'

const parser = ref(new UAParser())
console.log(parser.value, parser.value.getResult())
</script>

<template>
  <QLayout view="hHh lpR fFf">
    <QPageContainer>
      <NuxtPage />
    </QPageContainer>
    <QFooter hidden></QFooter>
  </QLayout>
</template>
