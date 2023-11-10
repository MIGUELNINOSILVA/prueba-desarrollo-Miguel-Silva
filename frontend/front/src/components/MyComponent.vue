<script setup>
import { ref } from 'vue';

const name = "Vue dinamico";
const arrayFrutas = [
  {
    name: "Manzana",
    price: "$1.00",
    description: "Una manzana",
    stock: 0,
  },
  {
    name: "Pera",
    price: "$2.00",
    description: "Una pera",
    stock: 10,
  },
  {
    name: "Naranja",
    price: "$3.00",
    description: "Una naranja",
    stock: 20,
  },
];

const handleClick = () => {
  console.log("Has dado click");
}

const counter = ref(0);
const arrayFavoritos = ref([]);

const handlePlus = () => {
  counter.value++;
  console.log(counter);
}

const hanldeRestar = () => {
  counter.value--;
  console.log(counter);
}

const hanldeResetear = () => {
  counter.value = 0;
  console.log(counter);
}

const add = () => {
  arrayFavoritos.value.push(counter.value);
}

const eliminarFavoritos = (position) => {
  arrayFavoritos.value.splice(position, 1);
}

</script>

<template>
  <div class="my-component">
    <h1>{{ name }}</h1>
    <h2>Redidreccionamiento</h2>
    <router-link to="/nav">Go to Navbar</router-link>

    <ul>
      <template v-for="(fruta, index) in arrayFrutas" :key="fruta.name">
        <li v-if="fruta.stock > 1">
          {{ fruta.name }}
        </li>

      </template>
    </ul>
    <button @click="handleClick">Activame</button>
    <h2 :style="`color: ${counter > 0 ? 'green' : 'red'}`">{{ counter }}</h2>
    <button @click="handlePlus">Sumar</button>
    <button @click="hanldeRestar">Restar</button>
    <button @click="hanldeResetear">Resetear Boton</button>
    <button @click="add">Add</button>

    <ul>
      <template v-if="arrayFavoritos.length > 0">
        <li v-for="(favorito, index) in arrayFavoritos" :key="index">
          {{ favorito }} <button @click="eliminarFavoritos(index)">Eliminar</button>
        </li>
      </template>
    </ul>
  </div>
</template>