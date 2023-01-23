<script setup lang="ts">
import { Database } from '~/types/supabase'
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import 'ag-grid-enterprise'
import { AgGridVue } from 'ag-grid-vue3'
import PillButton from '~/components/PillButton.vue'
import Badge from '~/components/Badge.vue'

definePageMeta({
  name: 'Quotes',
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
    {
      headerName: 'Quote',
      field: 'quote_number',
      filter: 'agNumberColumnFilter',
      sort: 'desc',
    },
    {
      headerName: 'Full Name',
      field: 'firstName',
      columnGroupShow: 'closed',
      cellRenderer: (params: any) =>
        params.value.toLowerCase().charAt(0).toUpperCase() +
        params.value.toLowerCase().slice(1) +
        ' ' +
        params.data.lastName.toLowerCase().charAt(0).toUpperCase() +
        params.data.lastName.toLowerCase().slice(1),
    },
    {
      headerName: 'Email Address',
      field: 'userEmail',
    },
    {
      headerName: 'Phone Number',
      field: 'phone_number',
    },
    {
      headerName: 'Service Type',
      field: 'serviceTypeLabel',
    },
    { headerName: 'Vehicle Type', field: 'vehicleTypeLabel' },

    {
      headerName: 'Date',
      field: 'pickupDate',
    },
    { headerName: 'Time', field: 'pickupTime' },
    {
      headerName: 'Pickup',
      field: 'originName',
    },
    { headerName: 'Drop-Off', field: 'destinationName' },
    {
      headerName: 'Price',
      field: 'roundTripTotal',
      cellRenderer: (params: any) => '$' + params.value.toFixed(2),
    },

    {
      headerName: 'Status',
      field: 'isBooked',
      cellRenderer: Badge,
      cellRendererParams: {
        isBooked: (params: any) => params.value,
      },
    },
    {
      headerName: 'Book',
      cellRenderer: PillButton,
      cellRendererParams: {
        text: 'Book',
      },
    },
  ],
})

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,

  resizable: true,
}

const cellWasClicked = (event: any) => {
  // Example of consuming Grid Event
  console.log('cell was clicked', event)
}
const deselectRows = () => {
  gridApi?.value.deselectAll()
}
const gridOptions = {
  autoSizeColumns: true,
  // pagination: true,
  // paginationAutoPageSize: true,
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
      @cell-clicked="bookOrder($event.data)"
      @grid-ready="onGridReady"
      :grid-options="gridOptions"
    />
  </div>
</template>

<style scoped></style>
