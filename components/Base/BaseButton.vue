<template>
  <component
    :class="btnStyle"
    :is="btnType"
    :href="href"
    :to="to"
    @click="$emit('clicked')"
  >
    <span class="mx-auto">{{ label }}</span>
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
interface Props {
  kind?: string
  label?: string
  to?: string
  href?: string
  nuxtLink?: boolean
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (event: 'clicked'): void
}>()
emit('clicked')
const btnType = computed(() => {
  if (props.href) {
    return 'a'
  }
  if (props.nuxtLink) {
    return 'router-link'
  }
  return 'button'
})
const btnStyle = computed(() => {
  if (props.kind === 'btn-light') {
    return [
      'inline-flex items-center cursor-pointer border border-solid border-white text-white text-base py-2 px-5 tracking-[0.4em] uppercase hover:border-primary hover:text-primary hover:transform hover:transition hover:ease-in-out hover:scale-x-105 hover:-translate-y-1 hover:duration-300 active:bg-primary/20 focus:border-primary focus:ring focus:ring-primary',
    ]
  }
  if (props.kind === 'btn-primary') {
    return [
      'inline-flex items-center cursor-pointer border border-solid border-primary text-primary text-base py-2 px-5 tracking-[0.4em] uppercase hover:border-primary hover:text-primary hover:transform hover:transition hover:ease-in-out hover:scale-x-105 hover:-translate-y-1 hover:duration-300 active:bg-primary/20 focus:border-primary focus:ring focus:ring-primary',
    ]
  }

  if (props.kind === 'btn-dark') {
    return [
      'inline-flex items-center cursor-pointer border border-solid border-background-dark text-background-dark text-base py-2 px-5 tracking-[0.4em] uppercase hover:border-primary hover:text-primary hover:transform hover:transition hover:ease-in-out hover:scale-x-105 hover:-translate-y-1 hover:duration-300 active:bg-primary/20 focus:border-primary focus:ring focus:ring-primary',
    ]
  }
  if (props.kind === 'btn-flat') {
    return [
      'inline-flex items-center cursor-pointer border-0 text-primary font-sans text-base py-2 px-5 tracking-[0.4em] uppercase hover:border-primary hover:text-primary hover:transform hover:transition hover:ease-in-out hover:scale-x-105 hover:-translate-y-1 hover:duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary active:bg-primary/20 active:outline-none',
    ]
  }
  if (props.kind === 'btn-solid') {
    return [
      'inline-flex text-center cursor-pointer bg-primary border border-solid border-primary text-background-dark text-sm py-4 px-4 w-full tracking-[0.4em] uppercase hover:border-primary hover:text-background-dark hover:transform-none hover:transition-none active:bg-primary/50 focus:border-primary focus:ring focus:ring-primary',
    ]
  }
  return [
    'inline-flex items-center cursor-pointer border border-solid border-white text-white text-base py-2 px-5 tracking-[0.4em] uppercase hover:border-primary hover:text-primary hover:transform hover:transition hover:ease-in-out hover:scale-x-105 hover:-translate-y-1 hover:duration-300 active:bg-primary/20 focus:border-primary focus:ring focus:ring-primary',
  ]
})
</script>
