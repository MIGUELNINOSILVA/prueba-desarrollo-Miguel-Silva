import { createRouter, createWebHistory } from "vue-router";

//Components
// import MyComponent from "../components/MyComponent.vue";
import NavBar from "../components/NavBarComponent.vue";
import ListaMarcas from "../views/ListaMarcas.vue";

const routes = [
  {
    path: "/",
    name: "Pagina Lista de marcas",
    component: ListaMarcas,
  },
  {
    path: "/nav",
    name: "Pagina NavBar",
    component: NavBar,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
