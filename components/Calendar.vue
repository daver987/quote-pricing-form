<template>
  <div class="text-center max-w-xs rounded-md border-1 border-black">
    <div class="flex items-center text-gray-900">
      <button
        @click="onLeftArrowClick"
        type="button"
        class="-m-1.5 flex flex-none items-center cursor-pointer justify-center p-1.5 text-gray-900 hover:text-gray-50 hover:bg-brand-600 rounded-full bg-brand-400"
      >
        <span class="sr-only">Previous month</span>
        <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
      </button>
      <div class="flex-auto text-lg uppercase font-semibold">
        {{ currentMonthString }}
      </div>
      <button
        @click="onRightArrowClick"
        type="button"
        class="-m-1.5 flex cursor-pointer flex-none items-center justify-center p-1.5 text-gray-900 hover:text-gray-50 hover:bg-brand-600 rounded-full bg-brand-400"
      >
        <span class="sr-only">Next month</span>
        <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
    <div class="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
      <div>M</div>
      <div>T</div>
      <div>W</div>
      <div>T</div>
      <div>F</div>
      <div>S</div>
      <div>S</div>
    </div>
    <div
      class="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200"
    >
      <button
        v-for="(day, dayIdx) in calendarDates"
        :key="day.date"
        type="button"
        ref="component"
        @click="onDayClick(day)"
        :class="[
          'py-1.5 hover:bg-gray-100 focus:z-10',
          day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
          (day.isSelected || day.isToday) && 'font-semibold',
          day.isSelected && 'text-white',
          !day.isSelected &&
            day.isCurrentMonth &&
            !day.isToday &&
            'text-gray-900',
          !day.isSelected &&
            !day.isCurrentMonth &&
            !day.isToday &&
            'text-gray-400',
          day.isToday &&
            !day.isSelected &&
            'text-brand bg-gray-100 hover:bg-gray-300 hover:text-brand-700',
          dayIdx === 0 && 'rounded-tl-lg',
          dayIdx === 6 && 'rounded-tr-lg',
          dayIdx === calendarDates.length - 7 && 'rounded-bl-lg',
          dayIdx === calendarDates.length - 1 && 'rounded-br-lg',
        ]"
      >
        <time
          :datetime="day.date"
          :class="[
            'mx-auto flex h-7 w-7 items-center justify-center rounded-full date',
            day.isSelected && day.isToday && 'bg-brand',
            day.isSelected && !day.isToday && 'bg-brand-600',
          ]"
          >{{ day.date.split('-')[0].replace(/^0/, '') }}
        </time>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { useDateGenerator, DateObject } from '~/composables/useDateGenerator'

const dayValue = ref<string | null>(null)
const calendarDates = ref<DateObject[]>([])
const currentDate = new Date()
const currentYear = ref<number>(0)
const currentMonth = ref<number>(0)
currentYear.value = currentDate.getFullYear()
currentMonth.value = currentDate.getMonth()
const month = computed(() => {
  return monthNames[currentMonth.value]
})

const currentMonthString = ref()

const updateCalendar = () => {
  calendarDates.value = useDateGenerator(
    currentYear.value,
    currentMonth.value
  ) as DateObject[]
  console.log(calendarDates.value)
  console.log('Current Month: ', currentMonth.value)
  console.log('Current Year: ', currentYear.value)
  currentMonthString.value = month.value
  return calendarDates.value
}

onMounted(() => {
  updateCalendar()
})
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

console.log(calendarDates.value)

function onLeftArrowClick() {
  currentMonth.value = currentMonth.value === 0 ? 11 : currentMonth.value - 1
  // Decrement the current month, resetting to 11 if necessary
  if (currentMonth.value === 11) {
    currentYear.value--
    // Decrement the current year if the month was reset to 11
  }
  updateCalendar()
}

function onRightArrowClick() {
  currentMonth.value = currentMonth.value === 11 ? 0 : currentMonth.value + 1
  // Increment the current month, resetting to 0 if necessary
  if (currentMonth.value === 0) {
    currentYear.value++
    // Increment the current year if the month was reset to 0
  }
  updateCalendar()
}

const component = ref(null)
const onDayClick = (day: DateObject) => {
  dayValue.value = day.date
  console.log(dayValue.value)
  emitDate()
  calendarDates.value.forEach((day) => {
    day.isSelected = false
  })
  day.isSelected = true
}
const isOpen = ref(false)
const emit = defineEmits(['date'])
const emitDate = () => {
  emit('date', dayValue.value, isOpen.value)
}
</script>
