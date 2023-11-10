

<script setup>
import NavbarComponent from './components/NavBarComponent.vue';
</script>


<template>
  <NavbarComponent class="nav-bar"/>
  <router-view></router-view>
</template>

<style scoped>
.nav-bar{
  background-color: #000;
  color: #fff;
  padding: 10px;
}
</style>
