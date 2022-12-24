import { ref } from 'vue'

export interface DateObject {
  date: string
  isOtherMonth?: boolean
  isCurrentMonth?: boolean
  isToday?: boolean
  isSelected?: boolean
}
function useDateGenerator(year: number, month: number) {
  // Get the first and last days of the month
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  // Get the day of the week for the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = firstDay.getDay()

  // Create an array of dates for the previous month, if necessary
  const previousMonthDates = ref<DateObject[]>([])
  if (firstDayOfWeek > 0) {
    const lastDayOfPreviousMonth = new Date(year, month, 0)
    const numDaysInPreviousMonth = lastDayOfPreviousMonth.getDate()
    for (
      let i = numDaysInPreviousMonth - firstDayOfWeek + 1;
      i <= numDaysInPreviousMonth;
      i++
    ) {
      previousMonthDates.value.push({
        date: `${year}-${month}-${i}`,
        isOtherMonth: true,
      })
    }
  }

  // Create an array of dates for the current month
  const currentMonthDates = ref<DateObject[]>([])
  for (let i = 1; i <= lastDay.getDate(); i++) {
    currentMonthDates.value.push({
      date: `${year}-${month + 1}-${i}`,
      isCurrentMonth: true,
    })
  }

  // Create an array of dates for the next month, if necessary
  const nextMonthDates = ref<DateObject[]>([])
  const numDaysInCurrentMonth = lastDay.getDate()
  if (numDaysInCurrentMonth + firstDayOfWeek < 35) {
    for (let i = 1; i <= 35 - numDaysInCurrentMonth - firstDayOfWeek; i++) {
      nextMonthDates.value.push({
        date: `${year}-${month + 2}-${i}`,
        isOtherMonth: true,
      })
    }
  }

  // Concatenate the arrays of dates for the previous, current, and next months
  const isToday = ref(false)
  const calendarDates = previousMonthDates.value.concat(
    currentMonthDates.value,
    nextMonthDates.value
  )

  // Mark the current date, if it falls within the current month
  const today = new Date()
  if (today.getFullYear() === year && today.getMonth() === month) {
    const todayIndex = today.getDate() + firstDayOfWeek - 1
    calendarDates[todayIndex].isToday = true
  }

  calendarDates.forEach((date) => {
    date.isSelected = false // Add the isSelected property to each date object and set it to false
  })

  return calendarDates
}

// function updateCalendar(
//   calendarDates: DateObject[],
//   currentYear: number,
//   currentMonth: number
// ) {
//   calendarDates = useDateGenerator(currentYear, currentMonth)
//   // Update the calendar component with the new calendarDates array
//   const monthValue = monthNames[currentMonth]
//   return { calendarDates, monthValue }
// }

// function onRightArrowClick(
//   calendarDates: DateObject[],
//   currentYear: number,
//   currentMonth: number
// ) {
//   currentMonth = currentMonth === 11 ? 0 : currentMonth + 1 // Increment the current month, resetting to 0 if necessary
//   if (currentMonth === 0) {
//     currentYear++ // Increment the current year if the month was reset to 0
//   }
//   return updateCalendar(calendarDates, currentYear, currentMonth)
// }
//
// function onLeftArrowClick(
//   calendarDates: DateObject[],
//   currentYear: number,
//   currentMonth: number
// ) {
//   currentMonth = currentMonth === 0 ? 11 : currentMonth - 1 // Decrement the current month, resetting to 11 if necessary
//   if (currentMonth === 11) {
//     currentYear-- // Decrement the current year if the month was reset to 11
//   }
//   return updateCalendar(calendarDates, currentYear, currentMonth)
// }

export { useDateGenerator, getCurrentMonth }
