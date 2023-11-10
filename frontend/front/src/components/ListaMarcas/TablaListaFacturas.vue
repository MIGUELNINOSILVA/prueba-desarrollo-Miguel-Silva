<template>
  <div class="row h-75 bg-white p-5">
    <div class="col-lg-12 offset-lg-2 m-0" style="max-height: 75vh; overflow-y: auto;">
      <div class="table-responsive ">
        <DataTable :data="products" :columns="columns" class="table table-striped display nowrap" :options="{
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
          buttons: botones
        }">
          <thead>
            <tr>
              <th>ID Cliente</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Dirección</th>
              <th>Fecha Nacimiento</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Categoría</th>
              <th>Acciones</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product._id">
              <td>{{ product.id_cliente }}</td>
              <td>{{ product.nombre }}</td>
              <td>{{ product.apellido }}</td>
              <td>{{ product.direccion }}</td>
              <td>{{ product.fecha_nacimiento }}</td>
              <td>{{ product.telefono }}</td>
              <td>{{ product.email }}</td>
              <td>{{ product.categoria }}</td>
              <td class="d-flex">
                <button class="btn btn-primary" @click="handleEditButton(row.id_cliente)"><i
                    class="fas fa-edit"></i></button>
                <button class="btn btn-danger" @click="handleDeleteButton(row.id_cliente)"><i class="fa fa-trash"
                    aria-hidden="true"></i></button>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                  Launch demo modal
                </button>
              </td>
            </tr>
          </tbody>
        </DataTable>
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
const columns = [
  { title: 'ID Cliente', data: 'id_cliente' },
  { title: 'Nombre', data: 'nombre' },
  { title: 'Apellido', data: 'apellido' },
  { title: 'Dirección', data: 'direccion' },
  { title: 'Fecha Nacimiento', data: 'fecha_nacimiento' },
  { title: 'Teléfono', data: 'telefono' },
  { title: 'Email', data: 'email' },
  { title: 'Categoría', data: 'categoria' },
  {
    title: 'Acciones',
    data: null,
    searchable: false,
    orderable: false,
    render: function (data, type, row) {
      return `<button class="btn btn-primary" @click="handleEditButton(row.id_cliente)"><i class="fas fa-edit"></i></button>
      <button class="btn btn-danger" @click="handleDeleteButton(row.id_cliente)"><i class="fa fa-trash" aria-hidden="true"></i></button>`;

    }
  },
];


let fecha = new Date(
  Date.now()
).toLocaleString('es-ES', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

// Formatenado fecha;

const botones = [
  {
    title: `Reporte de Clientes ${fecha.replace(/\//g, '-').replace(',', '').replace(/:/g, '-').replace(/ /g, '_')}`,
    extend: "excelHtml5",
    text: '<i class="fa-solid fa-file-excel"></i> Excel',
    className: 'btn btn-success'
  },
  {
    title: `Reporte de Clientes ${fecha.replace(/\//g, '-').replace(',', '').replace(/:/g, '-').replace(/ /g, '_')}`,
    extend: "pdfHtml5",
    text: '<i class="fa-solid fa-file-pdf"></i> PDF',
    className: 'btn btn-danger'
  }
];



const getProducts = async () => {
  try {
    const url = 'http://localhost:3000/api/cliente';
    const response = await fetch(url);
    const result = await response.json();
    console.log(result.data);
    products.value = result.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const handleDeleteButton = (id) => {
  console.log("Has dado click en el botón 2", id);
}

onMounted(getProducts);

window.JSZip = jszip;
DataTable.use(Buttons, ButtonsCol, ButtonHtml5, ButtonPrint, pdfMake, jszip);
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
