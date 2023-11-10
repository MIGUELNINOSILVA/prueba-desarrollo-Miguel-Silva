<template>
  <div class="container-formulario">
    <form>
      <h2>Agregar nueva factura</h2>
      <div class="form-group">
        <label for="searchInput">Buscar cliente:</label>
        <input type="text" class="form-control" id="searchInput" v-model="searchQuery" @input="filterClientes">
      </div>
      <div class="form-group">
        <label for="exampleSelect">Selecciona el cliente:</label>
        <select class="form-select" id="exampleSelect" v-model="selectedCliente">
          <option value="seleccionar" selected>Seleccionar</option>
          <option v-for="cliente in filteredClientes" :key="cliente._id" :value="cliente._id">
            {{ cliente.nombre }} - {{ cliente.id_cliente }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1">
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const clientes = ref([]);
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

const filterClientes = () => {
  const query = searchQuery.value.toLowerCase();
  filteredClientes.value = clientes.value.filter(cliente =>
    cliente.nombre.toLowerCase().includes(query) || cliente.id_cliente.toString().includes(query)
  );
};


watchEffect(() => {
  filterClientes();
});

getClientes();
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