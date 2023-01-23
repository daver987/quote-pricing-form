<script setup lang="ts">
import { Database } from '~/types/supabase'
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import 'ag-grid-enterprise'
import { AgGridVue } from 'ag-grid-vue3'

definePageMeta({
  name: 'Contacts',
  layout: 'default',
  middleware: ['auth'],
})

const supabase = useSupabaseClient<Database>()
const quoteData = ref({})

const { data: rowData, pending } = useFetch('/api/get-quotes')

const refresh = () => refreshNuxtData('quotes')

const bookingPending = ref(false)
const bookOrder = async (quoteInfo: any) => {
  console.log(quoteInfo)
  const { data, pending } = await useFetch('/api/book-order', {
    method: 'POST',
    body: quoteInfo,
  })
  await console.log(data.value)
  bookingPending.value = pending.value
  await refresh()
}

console.log('Quote Data: ', quoteData.value)
// console.log('Quotes: ', quotes.value)

const gridApi = ref(null) // Optional - for accessing Grid's API

// Obtain API from grid's onGridReady event
const onGridReady = (params: { api: null }) => {
  gridApi.value = params.api
}

// Each Column Definition results in one Column.
const columnDefs = reactive({
  value: [
    { headerName: 'Quote Number', field: 'quote_number' },
    { headerName: 'Email Address', field: 'userEmail' },
    { headerName: 'Phone Number', field: 'phone_number' },
    { headerName: 'Pickup', field: 'originName' },
    { headerName: 'Drop-Off', field: 'destinationName' },
    { headerName: 'Price', field: 'roundTripTotal' },
  ],
})

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
}

const cellWasClicked = (event: any) => {
  // Example of consuming Grid Event
  console.log('cell was clicked', event)
}
const deselectRows = () => {
  gridApi?.value.deselectAll()
}
const gridOptions = {
  pagination: true,
  paginationPageSize: 15,
}
</script>

<template>
  <div class="min-h-full">
    <AgGridVue
      class="ag-theme-alpine-dark"
      style="height: 92vh"
      :columnDefs="columnDefs.value"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      rowSelection="multiple"
      animateRows="true"
      @cell-clicked="cellWasClicked"
      @grid-ready="onGridReady"
      :grid-options="gridOptions"
      :enableRangeSelection="true"
      :enableCharts="true"
      :enableRowGroup="true"
    />
  </div>
</template>

<style scoped></style>
