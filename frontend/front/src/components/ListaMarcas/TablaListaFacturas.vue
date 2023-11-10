<template>
  <div class="row h-75 bg-white p-5">
    <h2>Lista de facturas</h2>
    <div class="col-lg-12 offset-lg-2 m-0" style="max-height: 75vh; overflow-y: auto;">
      <div class="table-responsive">
        <DataTable :data="products" :columns="columns" class="table table-striped display nowrap"
          :options="dataTableOptions">
          <thead></thead>
          <tbody>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="d-flex"></td>
          </tbody>
        </DataTable>
      </div>
    </div>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DataTable from 'datatables.net-vue3';
import Buttons from 'datatables.net-buttons-bs5';
import ButtonsCol from 'datatables.net-buttons/js/buttons.colVis.mjs';
import ButtonHtml5 from 'datatables.net-buttons/js/buttons.html5.mjs';
import ButtonPrint from 'datatables.net-buttons/js/buttons.print.mjs';
import jszip from 'jszip';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const products = ref([]);

const handleDeleteButton = function (id) {
  console.log(id);
};

const columns = [
  { title: 'Numero de factura', data: 'id_factura.num_factura' },
  { title: 'Fecha Factura', data: 'id_factura.fecha' },
  { title: 'Id Cliente', data: 'id_factura.id_cliente.id_cliente' },
  { title: 'Nombre Cliente', data: 'id_factura.id_cliente.nombre' },
  { title: 'Apellido Cliente', data: 'id_factura.id_cliente.apellido' },
  { title: 'Producto nombre', data: 'id_producto.nombre' },
  { title: 'Producto', data: 'id_producto.stock' },
  { title: 'Producto precio', data: 'id_producto.precio' },
  {
    title: 'Eventos',
    data: function (row, type, val, meta) {
      return `
      <ul class="d-flex gap-2 list-unstyled">
        <li> 
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i class="fas fa-edit"></i>
            </button>
        </li>
        <li>
          <button class="btn btn-danger eliminar" data-eliminar="${row.id_factura._id}">
            <i class="fa-solid fa-trash"></i>
          </button>
          </li>
      </ul>
        
      `;
    },
  },
];

const getProducts = async () => {
  try {
    const url = 'http://localhost:3000/api/facturaproducto';
    const response = await fetch(url);
    const result = await response.json();
    console.log(result.data);
    products.value = result.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
onMounted(getProducts);

window.JSZip = jszip;
DataTable.use(Buttons, ButtonsCol, ButtonHtml5, ButtonPrint, pdfMake, jszip);

const fecha = new Date().toLocaleString('es-ES', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const dataTableOptions = {
  responsive: true,
  dom: 'Bfrtip',
  autoWidth: true,
  language: {
    url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json',
    zeroRecords: 'No hay registros para mostrar',
    infoEmpty: 'No hay registros para mostrar',
    infoFiltered: '(filtrado de _MAX_ registros totales)',
    search: 'Buscar:',
    paginate: {
      first: 'Primero',
      last: 'Último',
      next: 'Siguiente',
      previous: 'Anterior',
    },
  },
  drawCallback: function () {
    const buttons = document.querySelectorAll('.eliminar');
    buttons.forEach(button => {
      button.addEventListener('click', function () {
        const id = button.getAttribute('data-eliminar');
        handleDeleteButton(id);
      });
    });
  },
  buttons: [
    {
      title: `Reporte de Clientes ${fecha.replace(/\//g, '-').replace(',', '').replace(/:/g, '-').replace(/ /g, '_')}`,
      extend: 'excelHtml5',
      text: '<i class="fa-solid fa-file-excel"></i> Excel',
      className: 'btn btn-success',
    },
    {
      title: `Reporte de Clientes ${fecha.replace(/\//g, '-').replace(',', '').replace(/:/g, '-').replace(/ /g, '_')}`,
      extend: 'pdfHtml5',
      text: '<i class="fa-solid fa-file-pdf"></i> PDF',
      className: 'btn btn-danger',
    },
  ],
};
</script>

<style scoped>
@import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
@import 'datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css';
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';

@media print {
  body {
    margin: 0;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1em;
  }

  .table,
  .table th,
  .table td {
    border: 1px solid #dee2e6;
  }
}
</style>
