import { createRouter, createWebHistory } from "vue-router";

//Components
import MyComponent from "../components/MyComponent.vue";
import NavBar from "../components/NavBarComponent.vue";

const routes = [
  {
    path: "/",
    name: "Pagina Principal",
    component: MyComponent,
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
