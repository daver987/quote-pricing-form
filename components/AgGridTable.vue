<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3' // the AG Grid Vue Component

import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS

const gridApi = ref(null) // Optional - for accessing Grid's API

// Obtain API from grid's onGridReady event
const onGridReady = (params: { api: null }) => {
  gridApi.value = params.api
}

const rowData = reactive({}) // Set rowData to Array of Objects, one Object per Row

// Each Column Definition results in one Column.
const columnDefs = reactive({
  value: [{ field: 'make' }, { field: 'model' }, { field: 'price' }],
})

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
}

// Example load data from sever
onMounted(() => {
  fetch('https://www.ag-grid.com/example-assets/row-data.json')
    .then((result) => result.json())
    .then((remoteRowData) => (rowData.value = remoteRowData))
})

const cellWasClicked = (event) => {
  // Example of consuming Grid Event
  console.log('cell was clicked', event)
}
const deselectRows = () => {
  gridApi?.value.deselectAll()
}
</script>

<template>
  <BaseButton @click="deselectRows">deselect rows</BaseButton>
  <ag-grid-vue
    class="ag-theme-alpine-dark"
    style="height: 100vh"
    :columnDefs="columnDefs.value"
    :rowData="rowData.value"
    :defaultColDef="defaultColDef"
    rowSelection="multiple"
    animateRows="true"
    @cell-clicked="cellWasClicked"
    @grid-ready="onGridReady"
    :enableRangeSelection="true"
    :enableCharts="true"
    rowGroupPanelShow="always"
    :sideBar="true"
  >
  </ag-grid-vue>
</template>

<style lang="scss"></style>
