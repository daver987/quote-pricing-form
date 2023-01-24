<script setup lang="ts">
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import { AgGridVue } from 'ag-grid-vue3'
import PillButton from '~/components/PillButton.vue'
import Badge from '~/components/Badge.vue'
import Remove from '~/components/Remove.vue'
import PhoneLink from '~/components/PhoneLink.vue'
import EmailLink from '~/components/EmailLink.vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'

const open = ref(false)
const openBooking = ref(false)
const openDelete = ref(false)

definePageMeta({
  name: 'Quotes',
  layout: 'default',
  middleware: ['auth'],
})

const { data: rowData, refresh: refreshQuoteData } = useFetch('/api/get-quotes')

const gridApi = ref() // Optional - for accessing Grid's API
const onFirstDataRendered = (params: any) => {
  // params.api.sizeColumnsToFit()
  columnApi.autoSizeColumns()
}
const colResizeDefault = 'shift'
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
      maxWidth: 100,
      resizeable: false,
      cellStyle: { color: 'red', 'font-weight': 'bold' },
    },
    {
      headerName: 'Full Name',
      field: 'firstName',
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
      cellRenderer: EmailLink,
      cellRendererParams: {
        href: (params: any) => `${params.value}`,
      },
      minWidth: 250,
    },
    {
      headerName: 'Phone Number',
      field: 'phone_number',
      cellRenderer: PhoneLink,
      cellRendererParams: {
        href: (params: any) => `${params.value}`,
      },
    },
    {
      headerName: 'Service Type',
      field: 'serviceTypeLabel',
      maxWidth: 150,
    },
    { headerName: 'Vehicle Type', field: 'vehicleTypeLabel', maxWidth: 150 },

    {
      headerName: 'Date',
      field: 'pickupDate',
      maxWidth: 150,
    },
    { headerName: 'Time', field: 'pickupTime', maxWidth: 150 },
    {
      headerName: 'Pickup',
      field: 'originName',
      minWidth: 375,
    },
    { headerName: 'Drop-Off', field: 'destinationName', minWidth: 375 },
    {
      headerName: 'Price',
      resizeable: false,
      maxWidth: 100,
      field: 'roundTripTotal',
      cellRenderer: (params: any) => `$${params.value.toFixed(2)}`,
    },

    {
      headerName: 'Status',
      resizeable: false,
      maxWidth: 110,
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
      resizeable: false,
      maxWidth: 120,
      onCellClicked: async (event: CellClickedEvent) => {
        const { data } = await useFetch('/api/book-order', {
          method: 'POST',
          body: event.data,
        })
        openDelete.value = false
        setTimeout(() => {
          refreshQuoteData()
          openBooking.value = true
          open.value = true
          console.log('Cell Clicked', data.value)
        }, 1000)
      },
    },
    {
      cellRenderer: Remove,
      resizeable: false,
      maxWidth: 100,
      onCellClicked: async (event: CellClickedEvent) => {
        const { data } = await useFetch('/api/delete-quote', {
          method: 'POST',
          body: event.data,
        })
        openBooking.value = false
        setTimeout(() => {
          refreshQuoteData()
          openDelete.value = true
          open.value = true
          console.log('Cell Clicked', data.value)
        }, 1000)
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

const deselectRows = () => {
  gridApi.value.deselectAll()
}
const gridOptions = {
  // onCellClicked: (event: CellClickedEvent) =>
  //   console.log('Cell was clicked', event),
  // pagination: true,
  // paginationAutoPageSize: true,
}
</script>

<template>
  <div class="min-h-full">
    <AgGridVue
      class="ag-theme-alpine"
      style="height: 92vh"
      :columnDefs="columnDefs.value"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      rowSelection="multiple"
      animateRows="true"
      @grid-ready="onGridReady"
      :colResizeDefault="colResizeDefault"
      :grid-options="gridOptions"
    />
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
              >
                <div>
                  <div
                    class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
                  >
                    <CheckIcon
                      class="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle
                      v-if="openBooking"
                      as="h3"
                      class="text-lg font-medium leading-6 text-gray-900"
                      >Booking successful
                    </DialogTitle>
                    <DialogTitle
                      v-if="openDelete"
                      as="h3"
                      class="text-lg font-medium leading-6 text-gray-900"
                      >Successfully deleted
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500" v-if="openBooking">
                        You have successfully booked the order! Check Limo
                        Anywhere for the details
                      </p>
                      <p class="text-sm text-gray-500" v-if="openDelete">
                        You have successfully deleted the quote! This action is
                        permanent
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6">
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    @click="open = false"
                  >
                    Go back to dashboard
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<style>
.ag-theme-alpine {
  --ag-grid-size: 4px;
  --ag-list-item-height: 20px;
}
</style>
