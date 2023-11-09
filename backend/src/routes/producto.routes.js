import { Router } from "express";
import { getAllProductos } from "../controllers/producto.controller.js";

const router = Router();

router.get("/", getAllProductos);

export default router;