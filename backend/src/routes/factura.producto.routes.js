import { Router } from "express";
import { getAllFacturaProductos } from "../controllers/factura.producto.controller.js";

const router = Router();

router.get("/",getAllFacturaProductos);

export default router;