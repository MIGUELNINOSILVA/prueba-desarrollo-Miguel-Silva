<template>
  <div class="row h-75 bg-white p-5">
    <h2>Lista de facturas</h2>
    <div class="col-lg-12 offset-lg-2 m-0" style="max-height: 75vh; overflow-y: auto;">
      <div class="table-responsive">
        <DataTable :data="products" :columns="columns" class="table table-striped display nowrap"
          :options="dataTableOptions">
          <thead></thead>
          <tbody></tbody>
        </DataTable>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="editar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modalMostrar">
      <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content modal-dialog-centered">
          <div class="modal-header col-10">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Factura</h1>
            <button type="button" class="btn-close col-md-4 .ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body col-10">
            <form>
              <h2>Editar factura</h2>
              <div class="form-group mt-3">
                <label for="searchInput">Buscar cliente:</label>
                <input type="text" value="">
                <!-- <input type="text" class="form-control" id="searchInput" v-model="searchQuery" @input="filterClientes"> -->
              </div>
              <div class="form-group mt-3">
                <label for="exampleSelect mt-2">Selecciona el cliente:</label>
                <select class="form-select mt-2" id="exampleSelect" v-model="selectedCliente" required>
                  <!-- <option v-for="cliente in filteredClientes" :key="cliente._id" :value="cliente._id"> -->
                    <!-- {{ cliente.nombre }} - {{ cliente.id_cliente }} -->
                  <!-- </option> -->
                </select>
              </div>
              <div class="form-group mt-3">
                <label for="productSelect">Selecciona el producto:</label>
                <select class="form-select mt-2" id="productSelect" v-model="selectedProducto" required>
                  <!-- <option value="seleccionar" selected>Seleccionar</option>
                  <option v-for="producto in productos" :key="producto._id" :value="producto._id">
                    {{ producto.nombre }} - ${{ producto.precio }} Stock: {{ producto.stock }}
                  </option> -->
                </select>
              </div>
              <div class="facturas-container d-flex gap-2">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar Cambios</button>
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
import { useRouter } from 'vue-router';

const router = useRouter();

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const products = ref([]);
const informacion = ref(null);
const modalMostrar = ref(null);

console.log("elemento modal");
console.log(modalMostrar.value);


const handleDeleteButton = async (id) => {
  console.log(id);
  const facturasDetalles = await getFacturaDetalle(id);
  console.log(facturasDetalles[0]);
  if (confirm("¿Estás seguro de eliminar la factura?")) {
    await deleteFacturaDetalle(facturasDetalles[0]._id);
    await deleteFactura(facturasDetalles[0].id_factura._id);
    await getProducts();
  }

};

const columns = [
  { title: 'Numero de factura', data: 'id_factura.num_factura' },
  { title: 'Fecha Factura', data: 'id_factura.fecha' },
  { title: 'Id Cliente', data: 'id_factura.id_cliente.id_cliente' },
  { title: 'Nombre Cliente', data: 'id_factura.id_cliente.nombre' },
  { title: 'Apellido Cliente', data: 'id_factura.id_cliente.apellido' },
  { title: 'Producto nombre', data: 'id_producto.nombre' },
  { title: 'Producto en Stock', data: 'id_producto.stock' },
  { title: 'Producto precio', data: 'id_producto.precio' },
  {
    title: 'Eventos',
    data: function (row, type, val, meta) {
      return `
      <ul class="d-flex gap-2 list-unstyled">
        <li> 
          <button type="button" class="btn btn-primary editar" data-bs-toggle="modal" data-bs-target="#editar" data-id="${row._id}" >
            <i class="fas fa-edit"></i>
            </button>
        </li>
        <li>
          <button class="btn btn-danger eliminar" data-eliminar="${row._id}">
            <i class="fa-solid fa-trash"></i>
          </button>
          </li>
      </ul>
        
      `;
    },
  },
];

const deleteFactura = async (dataFactura) => {
  try {
    const url = `http://localhost:3000/api/factura/clientes/${dataFactura}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const getFacturaDetalle = async (datoIdFactura) => {
  try {
    const url = `http://localhost:3000/api/facturaproducto/detalle/${datoIdFactura}`;
    const response = await fetch(url);
    const result = await response.json();
    console.log(result.data);
    return result.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const deleteFacturaDetalle = async (datoIdFacturaDetalle) => {
  try {
    const url = `http://localhost:3000/api/facturaproducto/${datoIdFacturaDetalle}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

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
  dom:
    "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
    "<'row'<'col-sm-12'B>>" +
    "<'row'<'col-sm-12'tr>>" +
    "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-8'p>>",
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
    const buttonModal = document.querySelectorAll('.editar');
    buttons.forEach(button => {
      button.addEventListener('click', function () {
        const id = button.getAttribute('data-eliminar');
        handleDeleteButton(id);
      });
    });
    buttonModal.forEach(button => {
      button.addEventListener('click', function () {
        const id = button.getAttribute('data-id');
        console.log(id);
        // handleDeleteButton(id);
      });
    });
  },
  buttons: [
    {
      title: `Reporte de Clientes ${fecha.replace(/\//g, '-').replace(',', '').replace(/:/g, '-').replace(/ /g, '_')}`,
      extend: 'excelHtml5',
      text: '<i class="fa-solid fa-file-excel"></i> Excel',
      className: 'btn btn-success mr-5',
    },
    {
      title: `Reporte de Clientes ${fecha.replace(/\//g, '-').replace(',', '').replace(/:/g, '-').replace(/ /g, '_')}`,
      extend: 'pdfHtml5',
      text: '<i class="fa-solid fa-file-pdf"></i> PDF',
      className: 'btn btn-danger mx-2',
    },
    {
      title: `Agregar Nueva factura`,
      text: '<i class="fa-solid fa-file-circle-plus"></i> Agregar nueva Factura',
      className: 'btn btn-danger mx-2',
      action: () => {
        // Add the logic to redirect to the desired route
        router.push('/agregarfactura');
      },
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
