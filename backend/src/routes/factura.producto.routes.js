import { Router } from "express";
import { buyProducts, getAllFacturaProductos } from "../controllers/factura.producto.controller.js";

const router = Router();

router.get("/",getAllFacturaProductos);
router.post("/", buyProducts);

export default router;