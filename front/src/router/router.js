import { createRouter, createWebHistory } from "vue-router";

//Components
// import MyComponent from "../components/MyComponent.vue";
import NavBar from "../components/NavBarComponent.vue";
import ListaMarcas from "../views/ListaMarcas.vue";
import AgregarNuevaFactura from "../views/AgregarNuevaFactura.vue";

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
  {
    path: "/agregarFactura",
    name: "Agregar nueva factura",
    component: AgregarNuevaFactura,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
