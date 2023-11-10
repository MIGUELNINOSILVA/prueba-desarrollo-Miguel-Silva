<template>
  <div class="container-formulario">
    <form>
      <h2>Agregar nueva factura</h2>
      <div class="form-group mt-3">
        <label for="searchInput">Buscar cliente:</label>
        <input type="text" class="form-control" id="searchInput" v-model="searchQuery" @input="filterClientes">
      </div>
      <div class="form-group mt-3">
        <label for="exampleSelect mt-2">Selecciona el cliente:</label>
        <select class="form-select mt-2" id="exampleSelect" v-model="selectedCliente" required>
          <option value="seleccionar" selected>Seleccionar</option>
          <option v-for="cliente in filteredClientes" :key="cliente._id" :value="cliente._id">
            {{ cliente.nombre }} - {{ cliente.id_cliente }}
          </option>
        </select>
      </div>
      <div class="form-group mt-3">
        <label for="productSelect">Selecciona el producto:</label>
        <select class="form-select mt-2" id="productSelect" v-model="selectedProducto" required>
          <option value="seleccionar" selected>Seleccionar</option>
          <option v-for="producto in productos" :key="producto._id" :value="producto._id">
            {{ producto.nombre }} - ${{ producto.precio }} Stock: {{ producto.stock }}
          </option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary mt-3">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';

const clientes = ref([]);
const productos = ref([]);
const searchQuery = ref('');
const selectedCliente = ref('');
const filteredClientes = ref([]);

const getClientes = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/cliente');
    const data = await response.json();
    clientes.value = data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const getProductos = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/producto');
    const data = await response.json();
    console.log(data.data);
    productos.value = data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const filterClientes = () => {
  const query = searchQuery.value.toLowerCase();
  filteredClientes.value = clientes.value.filter(cliente =>
    cliente.nombre.toLowerCase().includes(query) || cliente.id_cliente.toString().includes(query)
  );
};

watchEffect(() => {
  filterClientes();
});

onMounted(() => {
  getClientes();
  getProductos();
});
</script>

<style scoped>
.container-formulario {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ecf0f5;
}

form {
  background-color: #fff;
  padding: 4rem;
  border-radius: 1rem;
}
</style>
